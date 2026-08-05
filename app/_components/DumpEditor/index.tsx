"use client";

import { del, get, set } from "idb-keyval";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button, Image } from "@/components/ui";
import { ALLOWED_IMAGE_TYPES, MAX_COMMIT_IMAGE_SIZE, MAX_IMAGE_SIZE } from "@/lib/cms/constants";
import { createDumpDiffs } from "@/lib/cms/diff";
import { draftKey, type DumpDraft, type StagedImage } from "@/lib/cms/draft";
import { editableMetadataSchema, type Dump, type Item } from "@/lib/data";
import { isErr, tryCatch } from "@/lib/error";

import ReviewDialog from "./ReviewDialog";
import styles from "./styles.module.scss";

const CrepeEditor = dynamic(() => import("./CrepeEditor"), { ssr: false, loading: () => <p>Loading editor…</p> });

interface DumpEditorProps { mode: "edit" | "create"; source: Dump }

const DumpEditor: React.FC<DumpEditorProps> = ({ mode, source }) => {
  const router = useRouter();
  const original = useRef(source);
  const [metadata, setMetadata] = useState(source.metadata);
  const [markdown, setMarkdown] = useState(source.markdown);
  const [editorInitial, setEditorInitial] = useState(source.markdown);
  const [images, setImages] = useState<StagedImage[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [restored, setRestored] = useState(false);
  const [saveState, setSaveState] = useState<"saved" | "saving">("saved");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ prUrl: string; prNumber: number } | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [message, setMessage] = useState(`content(dumps): ${mode === "create" ? "add" : "update"} ${source.metadata.id}`);
  const objectUrls = useRef(new Map<string, string>());
  const id = metadata.id;
  const key = draftKey(mode, source.metadata.id);

  useEffect(() => {
    void get<DumpDraft>(key).then((draft) => {
      if (draft && window.confirm("Restore your local draft?")) {
        setMetadata(draft.metadata); setMarkdown(draft.markdown); setEditorInitial(draft.markdown); setImages(draft.images);
        const restoredUrls = Object.fromEntries(draft.images.map((image) => {
          const url = URL.createObjectURL(image.blob);
          objectUrls.current.set(image.path, url);
          return [image.path, url];
        }));
        setImageUrls(restoredUrls);
      }
      setRestored(true);
    });
  }, [key]);

  useEffect(() => {
    if (!restored) return;
    const timeout = window.setTimeout(() => {
      const draft: DumpDraft = { mode, id, metadata, markdown, images, originalMetadata: original.current.metadata, originalMarkdown: original.current.markdown, expectedSha: source.sha ?? "", branch: source.branch, prNumber: source.prNumber, prUrl: source.prUrl, updatedAt: Date.now() };
      void set(key, draft).then(() => setSaveState("saved"));
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [id, images, key, markdown, metadata, mode, restored, source.branch, source.prNumber, source.prUrl, source.sha]);

  useEffect(() => () => { objectUrls.current.forEach((url) => URL.revokeObjectURL(url)); }, []);

  const stageImage = useCallback(async (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) throw new Error("Use PNG, JPEG, WebP, GIF, or AVIF images");
    if (file.size > MAX_IMAGE_SIZE) throw new Error("Images must be 10 MB or smaller");
    const alt = window.prompt("Describe this image for screen readers:")?.trim();
    if (!alt) throw new Error("Alt text is required");
    const extension = file.name.split(".").pop()?.toLowerCase().replace("jpeg", "jpg") || "png";
    const filename = `${crypto.randomUUID()}.${extension}`;
    const path = `/dumps/${id}/${filename}`;
    const image: StagedImage = { id: crypto.randomUUID(), name: filename, path, type: file.type, size: file.size, alt, blob: file };
    setSaveState("saving");
    setImages((current) => [...current, image]);
    const objectUrl = URL.createObjectURL(file);
    objectUrls.current.set(path, objectUrl);
    setImageUrls((current) => ({ ...current, [path]: objectUrl }));
    return path;
  }, [id]);

  const resolveImage = useCallback((url: string) => imageUrls[url] ?? url, [imageUrls]);
  const updateMetadata = <K extends keyof Item>(field: K, value: Item[K]) => { setSaveState("saving"); setMetadata((current) => ({ ...current, [field]: value })); };
  const updateTitle = (title: string) => {
    const generatedId = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-dump";
    setSaveState("saving");
    setMetadata((current) => ({
      ...current,
      title,
      id: mode === "create" && !slugTouched ? generatedId : current.id,
    }));
    if (mode === "create" && !slugTouched) setMessage(`content(dumps): add ${generatedId}`);
  };
  const diffs = useMemo(() => createDumpDiffs(source.markdown, markdown, source.metadata, metadata), [markdown, metadata, source]);
  const dirty = markdown !== source.markdown || JSON.stringify(metadata) !== JSON.stringify(source.metadata) || images.length > 0;

  const openReview = () => {
    setError("");
    const parsed = editableMetadataSchema.safeParse(metadata);
    if (!parsed.success || metadata.id !== id) { setError(parsed.error?.issues[0]?.message ?? "Invalid metadata"); return; }
    if (images.reduce((total, image) => total + image.size, 0) > MAX_COMMIT_IMAGE_SIZE) { setError("New images exceed the 25 MB commit limit"); return; }
    setReviewOpen(true);
  };

  const publish = async () => {
    setPending(true); setError("");
    const formData = new FormData();
    formData.set("mode", mode); formData.set("id", id); formData.set("metadata", JSON.stringify(metadata)); formData.set("markdown", markdown); formData.set("commitMessage", message); formData.set("expectedSha", source.sha ?? "");
    images.forEach((image) => formData.append("images", image.blob, image.name));
    const result = await tryCatch(fetch("/api/admin/publish", { method: "POST", body: formData }));
    if (isErr(result)) { setError("Unable to reach the publishing endpoint"); setPending(false); return; }
    const body = await result.data.json();
    if (!result.data.ok) { setError(body.error ?? "Unable to publish"); setPending(false); setReviewOpen(false); return; }
    await del(key); setPending(false); setSuccess(body); setReviewOpen(false);
  };

  if (success) return <main className={styles.page}><section className={styles.success}><h1>Committed</h1><p>PR #{success.prNumber} is ready for review.</p><a href={success.prUrl} target="_blank" rel="noreferrer">Open on GitHub</a><Button.Secondary onClick={() => router.push("/")}>Done</Button.Secondary></section></main>;

  return (
    <main className={styles.page}>
      <header className={styles.top}><div><Link href={mode === "edit" ? `/dumps/${source.metadata.id}` : "/"}>← cancel</Link><h1>{mode === "edit" ? `Edit ${source.metadata.title}` : "New dump"}</h1></div><span>{saveState === "saving" ? "Saving draft…" : dirty ? "Draft saved locally" : "No changes"}</span></header>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.layout}>
        <section className={styles.form}>
          {mode === "create" && <label className={styles.field}>Slug<input value={metadata.id} disabled={images.length > 0} onChange={(event) => { const nextId = event.target.value; setSlugTouched(true); setSaveState("saving"); setMetadata((current) => ({ ...current, id: nextId })); setMessage(`content(dumps): add ${nextId}`); }} /></label>}
          <label className={styles.field}>Title<input value={metadata.title} onChange={(event) => updateTitle(event.target.value)} /></label>
          <label className={styles.field}>Description<textarea value={metadata.description} onChange={(event) => updateMetadata("description", event.target.value)} /></label>
          <label className={styles.field}>Cover path<input value={metadata.image} onChange={(event) => updateMetadata("image", event.target.value)} /></label>
          <label className={styles.field}>Upload cover<input type="file" accept={ALLOWED_IMAGE_TYPES.join(",")} onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; const staged = await tryCatch(stageImage(file)); if (isErr(staged)) setError(staged.error.message); else updateMetadata("image", staged.data); }} /></label>
          <div className={styles.row}><label className={styles.field}>Width<input type="number" value={metadata.width} onChange={(event) => updateMetadata("width", Number(event.target.value))} /></label><label className={styles.field}>X position<input type="number" min="0" max="1" step="0.01" value={metadata.defaultPosition.x} onChange={(event) => updateMetadata("defaultPosition", { ...metadata.defaultPosition, x: Number(event.target.value) })} /></label><label className={styles.field}>Y position<input type="number" min="0" max="1" step="0.01" value={metadata.defaultPosition.y} onChange={(event) => updateMetadata("defaultPosition", { ...metadata.defaultPosition, y: Number(event.target.value) })} /></label></div>
          <label className={styles.field}>GitHub URL<input value={metadata.links.github ?? ""} onChange={(event) => updateMetadata("links", { ...metadata.links, github: event.target.value || undefined })} /></label>
          <label className={styles.field}>YouTube URL<input value={metadata.links.youtube ?? ""} onChange={(event) => updateMetadata("links", { ...metadata.links, youtube: event.target.value || undefined })} /></label>
          <fieldset><legend>General links</legend>{metadata.links.general.map((link, index) => <div className={styles.row} key={index}><input aria-label="Link label" placeholder="Label" value={link.label ?? ""} onChange={(event) => updateMetadata("links", { ...metadata.links, general: metadata.links.general.map((candidate, i) => i === index ? { ...candidate, label: event.target.value } : candidate) })} /><input aria-label="Link URL" placeholder="https://…" value={link.href} onChange={(event) => updateMetadata("links", { ...metadata.links, general: metadata.links.general.map((candidate, i) => i === index ? { ...candidate, href: event.target.value } : candidate) })} /><Button.Link onClick={() => updateMetadata("links", { ...metadata.links, general: metadata.links.general.filter((_, i) => i !== index) })}>remove</Button.Link></div>)}<Button.Secondary onClick={() => updateMetadata("links", { ...metadata.links, general: [...metadata.links.general, { label: "", href: "" }] })}>Add link</Button.Secondary></fieldset>
        </section>
        <aside className={styles.preview}><h2>Card preview</h2><Image src={resolveImage(metadata.image)} alt={metadata.title} style={{ width: metadata.width }} unoptimized /><strong>{metadata.title || "Untitled"}</strong><p>{metadata.description}</p></aside>
      </div>
      <section className={styles.editor}><h2>Body</h2>{restored && <CrepeEditor initialMarkdown={editorInitial} onChange={(value) => { setSaveState("saving"); setMarkdown(value); }} onImage={stageImage} resolveImage={resolveImage} />}</section>
      {dirty && <Button.Primary className={styles.commit} onClick={openReview}>Commit</Button.Primary>}
      <ReviewDialog open={reviewOpen} onOpenChange={setReviewOpen} markdownDiff={diffs.markdown} metadataDiff={diffs.metadata} images={images} message={message} onMessageChange={setMessage} onPublish={publish} pending={pending} />
    </main>
  );
};

export default DumpEditor;
