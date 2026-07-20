"use client";

import {
  DragDropProvider,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryItemMap, galleryItems } from "@/content/gallery";
import { useSettings } from "@/lib/hooks/useSettings";
import { GalleryProvider, useGallery } from "../GalleryProvider";
import { getFolderChildren, getRootItems } from "../model/layout";
import type {
  FileDefinition,
  GalleryDragData,
  GalleryItemDefinition,
  GalleryItemId,
  GalleryPosition,
} from "../model/types";
import { CollapsedItemRow, ExpandedFileDisplay, GalleryThumbnailView } from "./GalleryItemView";
import { GalleryMediaDialog } from "./GalleryMediaDialog";
import "../styles.css";

interface DragOrigin {
  itemId: GalleryItemId;
  offset: GalleryPosition;
  width: number;
  height: number;
}

function getDragData(value: unknown): GalleryDragData | null {
  if (!value || typeof value !== "object" || !("kind" in value)) return null;
  return value as GalleryDragData;
}

export default function Gallery() {
  return (
    <GalleryProvider>
      <MotionConfig reducedMotion="user">
        <GalleryExperience />
      </MotionConfig>
    </GalleryProvider>
  );
}

function GalleryExperience() {
  const router = useRouter();
  const { layout: layoutMode } = useSettings();
  const {
    layout,
    isReady,
    bringToFront,
    moveItemTo,
    clampRootPositions,
    resetGallery,
    setActiveVideoId,
    setExpanded,
  } = useGallery();
  const canvasRef = useRef<HTMLElement | null>(null);
  const dragOrigin = useRef<DragOrigin | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredFolderId = useRef<GalleryItemId | null>(null);
  const [activeItemId, setActiveItemId] = useState<GalleryItemId | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ src: string; title: string } | null>(null);

  const rootItems = useMemo(() => getRootItems(layout), [layout]);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    hoveredFolderId.current = null;
  }, []);

  const openFile = useCallback(
    (file: FileDefinition) => {
      if (file.action.kind === "route") {
        router.push(file.action.href);
      } else if (file.action.kind === "external") {
        window.open(file.action.href, "_blank", "noopener,noreferrer");
      } else {
        setActiveMedia({ src: file.action.src, title: file.title });
      }
    },
    [router],
  );

  const clampPosition = useCallback(
    (position: GalleryPosition, width: number, height: number): GalleryPosition => {
      const canvas = canvasRef.current;
      if (!canvas) return position;
      const sidePadding = 16;
      const topPadding = 80;
      const bottomPadding = 72;

      return {
        x: Math.max(sidePadding, Math.min(position.x, canvas.clientWidth - width - sidePadding)),
        y: Math.max(topPadding, Math.min(position.y, canvas.clientHeight - height - bottomPadding)),
      };
    },
    [],
  );

  const clampRenderedItems = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const positions: Record<GalleryItemId, GalleryPosition> = {};

    for (const element of Array.from(
      canvas.querySelectorAll<HTMLElement>("[data-gallery-item-id]"),
    )) {
      const id = element.dataset.galleryItemId;
      const entry = id ? layout.entries[id] : undefined;
      if (!id || !entry || entry.parentId !== "root") continue;
      positions[id] = clampPosition(
        { x: entry.x, y: entry.y },
        element.offsetWidth,
        element.offsetHeight,
      );
    }

    clampRootPositions(positions);
  }, [clampPosition, clampRootPositions, layout.entries]);

  useEffect(() => {
    if (!isReady) return;
    const frame = requestAnimationFrame(clampRenderedItems);
    window.addEventListener("resize", clampRenderedItems);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", clampRenderedItems);
    };
  }, [clampRenderedItems, isReady]);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const source = event.operation.source;
      const data = getDragData(source?.data);
      if (!source || !data || data.kind !== "item") return;
      const rect = source.element?.getBoundingClientRect();
      if (!rect) return;

      dragOrigin.current = {
        itemId: data.itemId,
        offset: {
          x: event.operation.position.current.x - rect.left,
          y: event.operation.position.current.y - rect.top,
        },
        width: rect.width,
        height: rect.height,
      };
      setActiveItemId(data.itemId);
      setActiveVideoId(null);
      bringToFront(data.itemId);
    },
    [bringToFront, setActiveVideoId],
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const target = getDragData(event.operation.target?.data);
      const folderId =
        target?.kind === "folder"
          ? target.folderId
          : target?.kind === "row"
            ? target.parentId
            : null;

      if (!folderId) {
        clearHoverTimer();
        return;
      }
      if (hoveredFolderId.current === folderId) return;
      clearHoverTimer();

      const entry = layout.entries[folderId];
      if (entry?.parentId !== "root" || entry.displayMode === "expanded") return;

      hoveredFolderId.current = folderId;
      hoverTimer.current = setTimeout(() => {
        setExpanded(folderId, true);
        clearHoverTimer();
      }, 500);
    },
    [clearHoverTimer, layout.entries, setExpanded],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const sourceData = getDragData(event.operation.source?.data);
      const targetData = getDragData(event.operation.target?.data);
      const origin = dragOrigin.current;

      clearHoverTimer();
      setActiveItemId(null);
      dragOrigin.current = null;

      if (
        event.canceled ||
        !origin ||
        !sourceData ||
        sourceData.kind !== "item" ||
        sourceData.itemId !== origin.itemId
      ) {
        return;
      }

      if (targetData?.kind === "folder" && targetData.folderId !== origin.itemId) {
        moveItemTo(origin.itemId, targetData.folderId);
        return;
      }

      if (
        targetData?.kind === "item" &&
        targetData.parentId !== "root" &&
        targetData.itemId !== origin.itemId
      ) {
        const targetRect = event.operation.target?.element?.getBoundingClientRect();
        const afterTarget =
          targetRect && event.operation.position.current.y > targetRect.top + targetRect.height / 2;
        moveItemTo(origin.itemId, targetData.parentId, {
          index: (targetData.index ?? 0) + (afterTarget ? 1 : 0),
        });
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();
      const rawPosition = {
        x: event.operation.position.current.x - canvasRect.left - origin.offset.x,
        y: event.operation.position.current.y - canvasRect.top - origin.offset.y,
      };
      const snappedPosition =
        layoutMode === "snap"
          ? {
              x: Math.round(rawPosition.x / 24) * 24,
              y: Math.round(rawPosition.y / 24) * 24,
            }
          : rawPosition;

      moveItemTo(origin.itemId, "root", {
        position: clampPosition(snappedPosition, origin.width, origin.height),
      });
    },
    [clampPosition, clearHoverTimer, layoutMode, moveItemTo],
  );

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <GalleryCanvas canvasRef={canvasRef} ready={isReady}>
        <AnimatePresence initial={false}>
          {rootItems.map((itemId) => {
            const item = galleryItemMap.get(itemId);
            const entry = layout.entries[itemId];
            if (!item || !entry) return null;

            return (
              <RootGalleryItem
                key={item.id}
                item={item}
                activeItemId={activeItemId}
                openFile={openFile}
              />
            );
          })}
        </AnimatePresence>
        <button type="button" className="gallery-reset" onClick={resetGallery}>
          reset layout
        </button>
      </GalleryCanvas>

      <DragOverlay
        className="gallery-drag-overlay"
        dropAnimation={{ duration: 180, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {(source) => {
          const data = getDragData(source.data);
          if (!data || data.kind !== "item") return null;
          const item = galleryItemMap.get(data.itemId);
          return item ? <GalleryDragPreview item={item} /> : null;
        }}
      </DragOverlay>

      <GalleryMediaDialog
        src={activeMedia?.src ?? null}
        title={activeMedia?.title ?? "Media"}
        onClose={() => setActiveMedia(null)}
      />
    </DragDropProvider>
  );
}

const GalleryCanvas = function GalleryCanvas({
  canvasRef,
  ready,
  children,
}: {
  canvasRef: React.MutableRefObject<HTMLElement | null>;
  ready: boolean;
  children: React.ReactNode;
}) {
  const rootDrop = useDroppable<GalleryDragData>({
    id: "gallery-root",
    data: { kind: "root" },
    collisionPriority: -10,
  });

  return (
    <main
      ref={(element) => {
        canvasRef.current = element;
        rootDrop.ref(element);
      }}
      className="gallery-canvas"
      data-ready={ready || undefined}
      data-drop-target={rootDrop.isDropTarget || undefined}
    >
      {children}
    </main>
  );
};

interface RootGalleryItemProps {
  item: GalleryItemDefinition;
  activeItemId: GalleryItemId | null;
  openFile: (file: FileDefinition) => void;
}

function RootGalleryItem({ item, activeItemId, openFile }: RootGalleryItemProps) {
  const { layout, toggleExpanded, setExpanded, bringToFront } = useGallery();
  const entry = layout.entries[item.id];
  const draggable = useDraggable<GalleryDragData>({
    id: item.id,
    data: { kind: "item", itemId: item.id, parentId: "root" },
  });
  const folderDrop = useDroppable<GalleryDragData>({
    id: `folder:${item.id}`,
    data: { kind: "folder", folderId: item.id },
    disabled: item.type !== "folder",
    collisionPriority: 5,
  });
  const expanded = entry.displayMode === "expanded";

  const activate = () => {
    if (item.type === "folder") {
      toggleExpanded(item.id);
    } else if (item.expandable === false) {
      openFile(item);
    } else {
      setExpanded(item.id, true);
    }
  };

  return (
    <div
      ref={(element) => {
        draggable.ref(element);
        if (item.type === "folder") folderDrop.ref(element);
      }}
      className="gallery-root-item"
      data-gallery-item-id={item.id}
      data-dragging={draggable.isDragging || undefined}
      style={{ left: entry.x, top: entry.y, zIndex: entry.z }}
      onPointerDown={() => bringToFront(item.id)}
    >
      {item.type === "file" && expanded ? (
        <ExpandedFileDisplay
          file={item}
          dragHandleRef={draggable.handleRef}
          isDragging={draggable.isDragging || activeItemId === item.id}
          onMinimize={() => setExpanded(item.id, false)}
        />
      ) : item.type === "folder" && expanded ? (
        <ExpandedFolderDisplay
          folder={item}
          dragHandleRef={draggable.handleRef}
          isDragging={draggable.isDragging || activeItemId === item.id}
          isDropTarget={folderDrop.isDropTarget}
          onMinimize={() => setExpanded(item.id, false)}
          openFile={openFile}
        />
      ) : (
        <CollapsedItemRow
          item={item}
          dragHandleRef={draggable.handleRef}
          isDragging={draggable.isDragging}
          isDropTarget={folderDrop.isDropTarget}
          expanded={false}
          onActivate={activate}
        />
      )}
    </div>
  );
}

function ExpandedFolderDisplay({
  folder,
  dragHandleRef,
  isDragging,
  isDropTarget,
  onMinimize,
  openFile,
}: {
  folder: Extract<GalleryItemDefinition, { type: "folder" }>;
  dragHandleRef: (element: Element | null) => void;
  isDragging: boolean;
  isDropTarget: boolean;
  onMinimize: () => void;
  openFile: (file: FileDefinition) => void;
}) {
  return (
    <motion.section
      layout
      className="expanded-folder"
      data-dragging={isDragging || undefined}
      data-drop-target={isDropTarget || undefined}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
    >
      <CollapsedItemRow
        item={folder}
        dragHandleRef={dragHandleRef}
        isDragging={isDragging}
        isDropTarget={isDropTarget}
        expanded
        onActivate={onMinimize}
      />
      <FolderList folderId={folder.id} openFile={openFile} />
    </motion.section>
  );
}

function FolderList({
  folderId,
  openFile,
}: {
  folderId: GalleryItemId;
  openFile: (file: FileDefinition) => void;
}) {
  const { layout } = useGallery();
  const children = getFolderChildren(layout, folderId);
  const drop = useDroppable<GalleryDragData>({
    id: `folder-list:${folderId}`,
    data: { kind: "folder", folderId },
    collisionPriority: 1,
  });

  return (
    <motion.div
      ref={drop.ref as React.Ref<HTMLDivElement>}
      layout
      className="folder-list"
      data-drop-target={drop.isDropTarget || undefined}
    >
      <AnimatePresence initial={false}>
        {children.map((itemId, index) => {
          const item = galleryItemMap.get(itemId);
          return item ? (
            <FolderRow
              key={item.id}
              item={item}
              folderId={folderId}
              index={index}
              openFile={openFile}
            />
          ) : null;
        })}
      </AnimatePresence>
      {children.length === 0 ? <p className="folder-list__empty">drop items here</p> : null}
    </motion.div>
  );
}

function FolderRow({
  item,
  folderId,
  index,
  openFile,
}: {
  item: GalleryItemDefinition;
  folderId: GalleryItemId;
  index: number;
  openFile: (file: FileDefinition) => void;
}) {
  const sortable = useSortable<GalleryDragData>({
    id: item.id,
    index,
    group: folderId,
    data: { kind: "item", itemId: item.id, parentId: folderId, index },
    collisionPriority: 10,
    transition: { duration: 180, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  });
  const nestedFolderDrop = useDroppable<GalleryDragData>({
    id: `folder:${item.id}`,
    data: { kind: "folder", folderId: item.id },
    disabled: item.type !== "folder",
    collisionPriority: 12,
  });

  return (
    <div
      ref={(element) => {
        sortable.ref(element);
        if (item.type === "folder") nestedFolderDrop.ref(element);
      }}
      className="folder-row"
      data-dragging={sortable.isDragging || undefined}
    >
      <CollapsedItemRow
        item={item}
        dragHandleRef={sortable.handleRef}
        isDragging={sortable.isDragging}
        isDropTarget={sortable.isDropTarget || nestedFolderDrop.isDropTarget}
        nested
        onActivate={item.type === "file" ? () => openFile(item) : undefined}
      />
    </div>
  );
}

function GalleryDragPreview({ item }: { item: GalleryItemDefinition }) {
  return (
    <div className="gallery-drag-preview">
      <GalleryThumbnailView
        itemId={item.id}
        media={item.thumbnail}
        alt=""
        className="gallery-row__thumbnail"
      />
      <span className="gallery-row__title">{item.title}</span>
    </div>
  );
}
