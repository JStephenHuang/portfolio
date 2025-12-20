"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { Cross2Icon } from "@radix-ui/react-icons";
import CanvasIcon from "@/components/custom/CanvasIcon";
import { getMediaType } from "@/lib/utils/media";

interface DocumentLinkProps {
  title: string;
  icon?: string;
  href: string;
  initialX?: number;
  initialY?: number;
}

const DocumentLink = ({
  title,
  icon,
  href,
  initialX,
  initialY,
}: DocumentLinkProps) => {
  const router = useRouter();

  return (
    <CanvasIcon
      title={title}
      icon={icon}
      onClick={() => router.push(href)}
      initialX={initialX}
      initialY={initialY}
    />
  );
};

interface DocumentModalProps {
  title: string;
  icon?: string;
  content: React.ReactNode;
  initialX?: number;
  initialY?: number;
}

const DocumentModal = ({
  title,
  icon,
  content,
  initialX,
  initialY,
}: DocumentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CanvasIcon
        title={title}
        icon={icon}
        onClick={() => setIsOpen(true)}
        initialX={initialX}
        initialY={initialY}
      />

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-[var(--modal-backdrop)] backdrop-blur-sm z-50" />
          <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content className="bg-[var(--bg)] rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
                <Dialog.CloseTrigger className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                  <Cross2Icon className="w-4 h-4" />
                </Dialog.CloseTrigger>
              </div>

              <Dialog.Description className="p-6 overflow-y-auto max-h-[60vh]">
                {content}
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

interface DocumentMediaProps {
  title: string;
  icon?: string;
  src: string;
  initialX?: number;
  initialY?: number;
}

const DocumentMedia = ({
  title,
  icon,
  src,
  initialX,
  initialY,
}: DocumentMediaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const mediaType = getMediaType(src);

  return (
    <>
      <CanvasIcon
        title={title}
        icon={icon}
        onClick={() => setIsOpen(true)}
        initialX={initialX}
        initialY={initialY}
      />

      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-[var(--modal-backdrop)] backdrop-blur-sm z-50" />
          <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content className="relative max-w-[90vw] max-h-[90vh]">
              <Dialog.Title className="sr-only">{title}</Dialog.Title>
              <Dialog.Description asChild>
                <div className="overflow-auto max-w-[90vw] max-h-[90vh]">
                  {mediaType === "pdf" ? (
                    <iframe
                      src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={title}
                      className="w-[80vw] h-[85vh] rounded-lg bg-white"
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={title}
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

// Compound component pattern
const Document = {
  Link: DocumentLink,
  Modal: DocumentModal,
  Media: DocumentMedia,
};

export default Document;
