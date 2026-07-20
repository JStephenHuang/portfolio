"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentType, useEffect, useRef, useState } from "react";
import { useGallery } from "../GalleryProvider";
import type { ExpandedViewConfiguration, GalleryItemId, VideoExpandedView } from "../model/types";

interface ExpandedRendererProps {
  fileId: GalleryItemId;
  view: ExpandedViewConfiguration;
  isDragging: boolean;
  dragHandleRef: (element: Element | null) => void;
}

interface VideoRendererProps extends Omit<ExpandedRendererProps, "view"> {
  view: VideoExpandedView;
}

function VideoExpandedRenderer({ fileId, view, isDragging, dragHandleRef }: VideoRendererProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const { activeVideoId, setActiveVideoId } = useGallery();

  useEffect(() => {
    const element = mediaRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (view.src && !shouldReduceMotion && activeVideoId === null && isVisible && !isDragging) {
      setActiveVideoId(fileId);
    }
  }, [
    activeVideoId,
    fileId,
    isDragging,
    isVisible,
    setActiveVideoId,
    shouldReduceMotion,
    view.src,
  ]);

  useEffect(() => {
    if (!isVisible && activeVideoId === fileId) {
      setActiveVideoId(null);
    }
  }, [activeVideoId, fileId, isVisible, setActiveVideoId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldPlay = activeVideoId === fileId && isVisible && !isDragging && !shouldReduceMotion;

    if (shouldPlay) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [activeVideoId, fileId, isDragging, isVisible, shouldReduceMotion]);

  return (
    <div
      ref={(element) => {
        mediaRef.current = element;
        dragHandleRef(element);
      }}
      className="expanded-file__media"
      onPointerEnter={() => view.src && !shouldReduceMotion && setActiveVideoId(fileId)}
    >
      <AnimatePresence mode="wait">
        {view.src && !shouldReduceMotion ? (
          <motion.video
            key="video"
            ref={videoRef}
            src={view.src}
            poster={view.poster}
            muted
            loop
            playsInline
            preload="none"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.div
            key="poster"
            className="expanded-file__poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src={view.poster}
              alt=""
              width={640}
              height={400}
              draggable={false}
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ExpandedRenderer = ComponentType<ExpandedRendererProps>;

export const expandedViewRenderers: Record<ExpandedViewConfiguration["kind"], ExpandedRenderer> = {
  video: VideoExpandedRenderer as ExpandedRenderer,
};

export function ExpandedViewRenderer(props: ExpandedRendererProps) {
  const Renderer = expandedViewRenderers[props.view.kind];
  return <Renderer {...props} />;
}
