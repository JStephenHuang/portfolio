import { useState, useEffect } from "react";

interface UseFileContentResult {
  content: string | null;
  isLoading: boolean;
  error: boolean;
}

export function useFileContent(src: string, enabled: boolean = true): UseFileContentResult {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled || content !== null) return;

    const loadFile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("Failed to load");
        const text = await res.text();
        setContent(text);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadFile();
  }, [src, enabled, content]);

  return { content, isLoading, error };
}
