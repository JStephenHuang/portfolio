"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { galleryItemMap, galleryItems } from "@/content/gallery";
import { createDefaultGalleryState, getTopZIndex, moveItem } from "./model/layout";
import type {
  GalleryItemId,
  GalleryParentId,
  GalleryPosition,
  GalleryProfile,
  GalleryProfileState,
  PersistedGalleryState,
} from "./model/types";
import {
  clearGalleryState,
  getProfileForViewport,
  loadGalleryState,
  saveGalleryState,
} from "./storage";

interface GalleryContextValue {
  state: PersistedGalleryState;
  profile: GalleryProfile;
  layout: GalleryProfileState;
  isReady: boolean;
  activeVideoId: GalleryItemId | null;
  setActiveVideoId: (id: GalleryItemId | null) => void;
  setExpanded: (id: GalleryItemId, expanded: boolean) => void;
  toggleExpanded: (id: GalleryItemId) => void;
  bringToFront: (id: GalleryItemId) => void;
  moveItemTo: (
    id: GalleryItemId,
    parentId: GalleryParentId,
    options?: { index?: number; position?: GalleryPosition },
  ) => void;
  setRootPosition: (id: GalleryItemId, position: GalleryPosition) => void;
  clampRootPositions: (positions: Record<GalleryItemId, GalleryPosition>) => void;
  resetGallery: () => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedGalleryState>(() =>
    createDefaultGalleryState(galleryItems),
  );
  const [profile, setProfile] = useState<GalleryProfile>("desktop");
  const [isReady, setIsReady] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<GalleryItemId | null>(null);

  useEffect(() => {
    setProfile(getProfileForViewport());
    setState(loadGalleryState(galleryItems));
    setIsReady(true);

    const media = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setProfile(media.matches ? "mobile" : "desktop");
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isReady) saveGalleryState(state);
  }, [isReady, state]);

  const updateProfile = useCallback(
    (updater: (current: GalleryProfileState) => GalleryProfileState) => {
      setState((current) => ({
        ...current,
        profiles: {
          ...current.profiles,
          [profile]: updater(current.profiles[profile]),
        },
      }));
    },
    [profile],
  );

  const setExpanded = useCallback(
    (id: GalleryItemId, expanded: boolean) => {
      const item = galleryItemMap.get(id);
      if (!item) return;
      if (item.type === "file" && item.expandable === false) return;

      updateProfile((current) => {
        const entry = current.entries[id];
        if (!entry || entry.parentId !== "root") return current;

        return {
          ...current,
          entries: {
            ...current.entries,
            [id]: {
              ...entry,
              displayMode: expanded ? "expanded" : "collapsed",
              z: expanded ? getTopZIndex(current) + 1 : entry.z,
            },
          },
        };
      });

      if (!expanded) {
        setActiveVideoId((current) => (current === id ? null : current));
      }
    },
    [updateProfile],
  );

  const toggleExpanded = useCallback(
    (id: GalleryItemId) => {
      const entry = state.profiles[profile].entries[id];
      if (entry) setExpanded(id, entry.displayMode !== "expanded");
    },
    [profile, setExpanded, state.profiles],
  );

  const bringToFront = useCallback(
    (id: GalleryItemId) => {
      updateProfile((current) => {
        const entry = current.entries[id];
        if (!entry || entry.parentId !== "root") return current;
        const nextZ = getTopZIndex(current) + 1;
        if (entry.z === nextZ) return current;

        return {
          ...current,
          entries: {
            ...current.entries,
            [id]: { ...entry, z: nextZ },
          },
        };
      });
    },
    [updateProfile],
  );

  const moveItemTo = useCallback(
    (
      id: GalleryItemId,
      parentId: GalleryParentId,
      options: { index?: number; position?: GalleryPosition } = {},
    ) => {
      updateProfile((current) => {
        const moved = moveItem(current, id, parentId, options);
        if (moved === current || parentId !== "root") return moved;

        return {
          ...moved,
          entries: {
            ...moved.entries,
            [id]: {
              ...moved.entries[id],
              z: getTopZIndex(current) + 1,
            },
          },
        };
      });

      if (parentId !== "root") {
        setActiveVideoId((current) => (current === id ? null : current));
      }
    },
    [updateProfile],
  );

  const setRootPosition = useCallback(
    (id: GalleryItemId, position: GalleryPosition) => {
      updateProfile((current) => {
        const entry = current.entries[id];
        if (!entry || entry.parentId !== "root") return current;

        return {
          ...current,
          entries: {
            ...current.entries,
            [id]: { ...entry, ...position },
          },
        };
      });
    },
    [updateProfile],
  );

  const clampRootPositions = useCallback(
    (positions: Record<GalleryItemId, GalleryPosition>) => {
      updateProfile((current) => {
        let changed = false;
        const entries = { ...current.entries };

        for (const [id, position] of Object.entries(positions)) {
          const entry = entries[id];
          if (entry?.parentId === "root" && (entry.x !== position.x || entry.y !== position.y)) {
            entries[id] = { ...entry, ...position };
            changed = true;
          }
        }

        return changed ? { ...current, entries } : current;
      });
    },
    [updateProfile],
  );

  const resetGallery = useCallback(() => {
    clearGalleryState();
    setState(createDefaultGalleryState(galleryItems));
    setActiveVideoId(null);
  }, []);

  const value = useMemo<GalleryContextValue>(
    () => ({
      state,
      profile,
      layout: state.profiles[profile],
      isReady,
      activeVideoId,
      setActiveVideoId,
      setExpanded,
      toggleExpanded,
      bringToFront,
      moveItemTo,
      setRootPosition,
      clampRootPositions,
      resetGallery,
    }),
    [
      activeVideoId,
      bringToFront,
      clampRootPositions,
      isReady,
      moveItemTo,
      profile,
      resetGallery,
      setExpanded,
      setRootPosition,
      state,
      toggleExpanded,
    ],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error("useGallery must be used within GalleryProvider");
  return context;
}
