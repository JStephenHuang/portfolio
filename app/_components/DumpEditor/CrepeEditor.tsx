"use client";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

import { Crepe, CrepeFeature } from "@milkdown/crepe";
import { useEffect, useRef } from "react";

interface CrepeEditorProps {
  initialMarkdown: string;
  onChange: (markdown: string) => void;
  onImage: (file: File) => Promise<string>;
  resolveImage: (url: string) => string;
}

const CrepeEditor: React.FC<CrepeEditorProps> = ({ initialMarkdown, onChange, onImage, resolveImage }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  const onImageRef = useRef(onImage);
  const resolveImageRef = useRef(resolveImage);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { onImageRef.current = onImage; }, [onImage]);
  useEffect(() => { resolveImageRef.current = resolveImage; }, [resolveImage]);

  useEffect(() => {
    if (!rootRef.current) return;
    const crepe = new Crepe({
      root: rootRef.current,
      defaultValue: initialMarkdown,
      features: { [CrepeFeature.AI]: false, [CrepeFeature.Latex]: false, [CrepeFeature.TopBar]: false },
      featureConfigs: {
        [CrepeFeature.ImageBlock]: {
          onUpload: (file) => onImageRef.current(file),
          inlineOnUpload: (file) => onImageRef.current(file),
          blockOnUpload: (file) => onImageRef.current(file),
          proxyDomURL: (url) => resolveImageRef.current(url),
        },
      },
    });
    crepe.on((listener) => listener.markdownUpdated((_context, markdown) => onChangeRef.current(markdown)));
    void crepe.create();
    return () => { void crepe.destroy(); };
  }, [initialMarkdown]);

  return <div ref={rootRef} />;
};

export default CrepeEditor;
