"use client";

import Image from "next/image";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { Cross2Icon } from "@radix-ui/react-icons";

interface GalleryMediaDialogProps {
  src: string | null;
  title: string;
  onClose: () => void;
}

export function GalleryMediaDialog({ src, title, onClose }: GalleryMediaDialogProps) {
  const isPdf = src?.split(".").pop()?.toLowerCase() === "pdf";

  return (
    <Dialog.Root open={Boolean(src)} onOpenChange={(event) => !event.open && onClose()}>
      <Portal>
        <Dialog.Backdrop className="gallery-media-dialog__backdrop" />
        <Dialog.Positioner className="gallery-media-dialog__positioner">
          <Dialog.Content className="gallery-media-dialog__content">
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Dialog.CloseTrigger className="gallery-media-dialog__close">
              <Cross2Icon />
            </Dialog.CloseTrigger>
            <Dialog.Description asChild>
              <div className="gallery-media-dialog__viewport">
                {src && isPdf ? (
                  <iframe src={src} title={title} className="gallery-media-dialog__pdf" />
                ) : src ? (
                  <Image
                    src={src}
                    alt={title}
                    width={1920}
                    height={1080}
                    className="gallery-media-dialog__image"
                    unoptimized
                  />
                ) : null}
              </div>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
