"use client";

import { Dialog } from "@/components/primitives";
import { Button, Image } from "@/components/ui";
import type { StagedImage } from "@/lib/cms/draft";

import styles from "./styles.module.scss";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  markdownDiff: string;
  metadataDiff: string;
  images: StagedImage[];
  message: string;
  onMessageChange: (message: string) => void;
  onPublish: () => void;
  pending: boolean;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onOpenChange, markdownDiff, metadataDiff, images, message, onMessageChange, onPublish, pending }) => (
  <Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)}>
    <Dialog.Content className={styles.dialog}>
      <Dialog.Title>Review commit</Dialog.Title>
      <Dialog.Description>Review the server-validated files that will be committed to GitHub.</Dialog.Description>
      <section><h2>body.md</h2><pre className={styles.diff}>{markdownDiff}</pre></section>
      <section><h2>metadata.json</h2><pre className={styles.diff}>{metadataDiff}</pre></section>
      {images.length > 0 && <section><h2>New images</h2><div className={styles.images}>{images.map((image) => <figure key={image.id}><Image src={URL.createObjectURL(image.blob)} alt={image.alt} unoptimized /><figcaption>{image.path}<br />{image.type} · {(image.size / 1024).toFixed(1)} KB</figcaption></figure>)}</div></section>}
      <label className={styles.field}>Commit message<input value={message} maxLength={200} onChange={(event) => onMessageChange(event.target.value)} /></label>
      <div className={styles.actions}><Dialog.Close asChild><Button.Secondary>Back</Button.Secondary></Dialog.Close><Button.Primary onClick={onPublish} isLoading={pending}>Commit and open PR</Button.Primary></div>
    </Dialog.Content>
  </Dialog.Root>
);

export default ReviewDialog;
