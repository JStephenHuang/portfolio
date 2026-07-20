import { z } from "zod";
import type {
  GalleryItemDefinition,
  GalleryProfile,
  GalleryProfileState,
  PersistedGalleryState,
} from "./model/types";
import { createDefaultGalleryState, isFolderDescendant } from "./model/layout";

const STORAGE_KEY = "portfolio.gallery.v1";

const entrySchema = z.object({
  parentId: z.string(),
  x: z.number().finite(),
  y: z.number().finite(),
  z: z.number().finite(),
  displayMode: z.enum(["collapsed", "expanded"]),
});

const profileSchema = z.object({
  entries: z.record(entrySchema),
  folderOrder: z.record(z.array(z.string())),
});

const galleryStateSchema = z.object({
  version: z.literal(1),
  profiles: z.object({
    desktop: profileSchema,
    mobile: profileSchema,
  }),
});

function mergeProfile(
  saved: GalleryProfileState,
  defaults: GalleryProfileState,
  items: readonly GalleryItemDefinition[],
): GalleryProfileState {
  const itemIds = new Set(items.map((item) => item.id));
  const folderIds = new Set(items.filter((item) => item.type === "folder").map((item) => item.id));
  const entries = Object.fromEntries(
    items.map((item) => {
      const candidate = saved.entries[item.id];
      const parentIsValid =
        candidate?.parentId === "root" || (candidate && folderIds.has(candidate.parentId));

      return [
        item.id,
        candidate && parentIsValid
          ? {
              ...candidate,
              displayMode:
                candidate.parentId === "root" ? candidate.displayMode : ("collapsed" as const),
            }
          : defaults.entries[item.id],
      ];
    }),
  );

  const draft: GalleryProfileState = {
    entries,
    folderOrder: Object.fromEntries(Array.from(folderIds, (id) => [id, []])),
  };

  for (const item of items) {
    const parentId = draft.entries[item.id].parentId;
    if (
      parentId !== "root" &&
      (parentId === item.id || isFolderDescendant(draft, parentId, item.id))
    ) {
      draft.entries[item.id] = defaults.entries[item.id];
    }
  }

  for (const folderId of Array.from(folderIds)) {
    const savedOrder = saved.folderOrder[folderId] ?? [];
    const validSavedChildren = savedOrder.filter(
      (id, index) =>
        itemIds.has(id) &&
        savedOrder.indexOf(id) === index &&
        draft.entries[id]?.parentId === folderId,
    );
    const missingChildren = items
      .filter(
        (item) =>
          draft.entries[item.id].parentId === folderId && !validSavedChildren.includes(item.id),
      )
      .sort((a, b) => a.defaultOrder - b.defaultOrder)
      .map((item) => item.id);

    draft.folderOrder[folderId] = [...validSavedChildren, ...missingChildren];
  }

  return draft;
}

export function loadGalleryState(items: readonly GalleryItemDefinition[]): PersistedGalleryState {
  const defaults = createDefaultGalleryState(items);

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = galleryStateSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return defaults;

    return {
      version: 1,
      profiles: {
        desktop: mergeProfile(parsed.data.profiles.desktop, defaults.profiles.desktop, items),
        mobile: mergeProfile(parsed.data.profiles.mobile, defaults.profiles.mobile, items),
      },
    };
  } catch {
    return defaults;
  }
}

export function saveGalleryState(state: PersistedGalleryState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearGalleryState(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getProfileForViewport(): GalleryProfile {
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}
