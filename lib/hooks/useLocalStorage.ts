import { type Dispatch, type SetStateAction, useCallback, useMemo, useSyncExternalStore } from "react";

const notify = (key: string) => window.dispatchEvent(new StorageEvent("storage", { key }));

export const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("storage", onStoreChange);
    return () => window.removeEventListener("storage", onStoreChange);
  }, []);

  const getSnapshot = useCallback(() => window.localStorage.getItem(key), [key]);
  const getServerSnapshot = () => null;

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<T>(() => {
    if (raw === null) return initialValue;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initialValue;
    }
  }, [raw, initialValue]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      const resolved = next instanceof Function ? next(value) : next;
      window.localStorage.setItem(key, JSON.stringify(resolved));
      notify(key);
    },
    [key, value],
  );

  return [value, setValue];
};
