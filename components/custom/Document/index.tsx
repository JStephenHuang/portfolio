"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Canvas from "@/components/Canvas";
import Image from "next/image";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";

import { Cross2Icon } from "@radix-ui/react-icons";

interface DocumentLinkProps {
  title: string;
  image?: string;
  href: string;
  initialX?: number;
  initialY?: number;
}

const DocumentLink = ({
  title,
  image = "/graphics/wave-1.png",
  href,
  initialX = 100,
  initialY = 100,
}: DocumentLinkProps) => {
  const router = useRouter();

  return (
    <Canvas.Item initialX={initialX} initialY={initialY} onClick={() => router.push(href)}>
      <div className="flex flex-col items-center gap-1">
        <div className="w-16 h-16">
          {/* Folder icon */}
          <Image
            src={image}
            alt="Document Icon"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <span>{title}</span>
      </div>
    </Canvas.Item>
  );
};

interface DocumentModalProps {
  title: string;
  image?: string;
  content: React.ReactNode;
  initialX?: number;
  initialY?: number;
}

const DocumentModal = ({
  title,
  image = "/graphics/wave-1.png",
  content,
  initialX = 100,
  initialY = 100,
}: DocumentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Draggable Item */}
      <Canvas.Item initialX={initialX} initialY={initialY} onClick={handleOpen}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16">
            {/* Folder icon */}
            <Image
              src={image}
              alt="Document Icon"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <span className="max-w-20 break-words">{title}</span>
        </div>
      </Canvas.Item>

      {/* Modal */}
      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
                <Dialog.CloseTrigger className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cross2Icon className="w-4 h-4" />
                </Dialog.CloseTrigger>
              </div>

              {/* Modal Content */}
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

// Compound component pattern
const Document = {
  Link: DocumentLink,
  Modal: DocumentModal,
};

export default Document;
