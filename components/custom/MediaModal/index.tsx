"use client";

import { useState } from "react";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";

type MediaType = "image" | "pdf";

interface MediaModalProps {
  src: string;
  alt?: string;
  trigger?: React.ReactNode;
}

function getMediaType(src: string): MediaType {
  const ext = src.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf") return "pdf";
  return "image";
}

const MediaModal = ({ src, alt = "Media", trigger }: MediaModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const mediaType = getMediaType(src);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-link text-ui">
        {trigger ?? alt}
      </button>

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-[var(--modal-backdrop)] backdrop-blur-sm z-50" />
          <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content className="relative max-w-[90vw] max-h-[90vh]">
              <Dialog.CloseTrigger className="absolute -top-3 -right-3 p-1.5 rounded-full bg-[var(--bg)] border border-[var(--border)] shadow-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--fg-muted)] hover:text-[var(--fg)] z-10">
                <Cross2Icon className="w-4 h-4" />
              </Dialog.CloseTrigger>

              <Dialog.Title className="sr-only">{alt}</Dialog.Title>
              <Dialog.Description asChild>
                <div className="overflow-auto max-w-[90vw] max-h-[90vh]">
                  {mediaType === "pdf" ? (
                    <iframe
                      src={src}
                      title={alt}
                      className="w-[80vw] h-[85vh] rounded-lg"
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={alt}
                      width={1920}
                      height={1080}
                      className="w-auto h-auto max-w-[90vw] max-h-[90vh] rounded-lg object-contain"
                      unoptimized
                    />
                  )}
                </div>
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default MediaModal;
