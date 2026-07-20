"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useGallery } from "../GalleryProvider";
import type {
  FileDefinition,
  GalleryItemDefinition,
  GalleryItemId,
  GalleryThumbnail,
} from "../model/types";
import { ExpandedViewRenderer } from "./ExpandedViewRenderer";

interface ThumbnailProps {
  itemId: GalleryItemId;
  media: GalleryThumbnail;
  alt: string;
  className?: string;
}

export function GalleryThumbnailView({ itemId, media, alt, className }: ThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [canPreview, setCanPreview] = useState(false);
  const { activeVideoId, setActiveVideoId } = useGallery();

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    setCanPreview(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !connection?.saveData &&
        !shouldReduceMotion,
    );
  }, [shouldReduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeVideoId === itemId && canPreview) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [activeVideoId, canPreview, itemId]);

  if (media.kind === "video" && media.src) {
    return (
      <span
        className={className}
        onPointerEnter={() => canPreview && setActiveVideoId(itemId)}
        onPointerLeave={() => setActiveVideoId(activeVideoId === itemId ? null : activeVideoId)}
        onFocus={() => canPreview && setActiveVideoId(itemId)}
        onBlur={() => setActiveVideoId(activeVideoId === itemId ? null : activeVideoId)}
      >
        <video
          ref={videoRef}
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt}
          draggable={false}
        />
      </span>
    );
  }

  const src = media.kind === "video" ? media.poster : media.src;
  return (
    <span className={className}>
      <Image src={src} alt={alt} width={56} height={42} draggable={false} unoptimized />
    </span>
  );
}

interface CollapsedItemRowProps {
  item: GalleryItemDefinition;
  onActivate?: () => void;
  dragHandleRef?: (element: Element | null) => void;
  isDragging?: boolean;
  isDropTarget?: boolean;
  expanded?: boolean;
  nested?: boolean;
}

export function CollapsedItemRow({
  item,
  onActivate,
  dragHandleRef,
  isDragging = false,
  isDropTarget = false,
  expanded,
  nested = false,
}: CollapsedItemRowProps) {
  return (
    <motion.button
      ref={dragHandleRef as React.Ref<HTMLButtonElement>}
      type="button"
      layout
      className="gallery-row"
      data-dragging={isDragging || undefined}
      data-drop-target={isDropTarget || undefined}
      data-nested={nested || undefined}
      aria-expanded={item.type === "folder" && !nested ? expanded : undefined}
      aria-label={
        item.type === "folder"
          ? nested
            ? `${item.title}, drag to the canvas to open`
            : `${expanded ? "Minimize" : "Expand"} ${item.title}`
          : item.title
      }
      onClick={onActivate}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 520, damping: 38 }}
    >
      <GalleryThumbnailView
        itemId={item.id}
        media={item.thumbnail}
        alt=""
        className="gallery-row__thumbnail"
      />
      <span className="gallery-row__title">{item.title}</span>
      {item.type === "folder" && !nested ? (
        <span className="gallery-row__disclosure" aria-hidden="true">
          {expanded ? "−" : "+"}
        </span>
      ) : null}
    </motion.button>
  );
}

interface ExpandedFileDisplayProps {
  file: FileDefinition;
  dragHandleRef: (element: Element | null) => void;
  isDragging: boolean;
  onMinimize: () => void;
}

export function ExpandedFileDisplay({
  file,
  dragHandleRef,
  isDragging,
  onMinimize,
}: ExpandedFileDisplayProps) {
  const view =
    file.expandedView ??
    ({
      kind: "video",
      poster: file.thumbnail.kind === "video" ? file.thumbnail.poster : file.thumbnail.src,
    } as const);
  const poster =
    view?.poster ?? (file.thumbnail.kind === "video" ? file.thumbnail.poster : file.thumbnail.src);

  const title =
    file.action.kind === "route" ? (
      <Link href={file.action.href} className="expanded-file__title">
        {file.title}
      </Link>
    ) : file.action.kind === "external" ? (
      <a href={file.action.href} className="expanded-file__title">
        {file.title}
      </a>
    ) : (
      <span className="expanded-file__title">{file.title}</span>
    );

  return (
    <motion.article
      layout
      className="expanded-file"
      data-dragging={isDragging || undefined}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 36 }}
    >
      <button
        type="button"
        className="expanded-file__minimize"
        aria-label={`Minimize ${file.title}`}
        onClick={onMinimize}
      >
        <Cross2Icon />
      </button>
      <ExpandedViewRenderer
        fileId={file.id}
        view={{ ...view, poster }}
        isDragging={isDragging}
        dragHandleRef={dragHandleRef}
      />
      {title}
    </motion.article>
  );
}
