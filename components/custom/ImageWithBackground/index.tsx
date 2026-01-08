"use client";

import Image, { ImageProps } from "next/image";
import clsx from "clsx";
import { ColorBackground } from "@/lib/types/bg";

interface ImageWithBackgroundProps extends ImageProps {
  bg?: ColorBackground;
}

const bgs: Record<ColorBackground, string> = {
  transparent: "bg-transparent",
  white: "bg-white",
  black: "bg-black",
};

const ImageWithBackground = ({
  bg = "transparent",
  alt = "woah you don't see anything",
  width = 500,
  height = 500,
  unoptimized = false,
  ...props
}: ImageWithBackgroundProps) => {
  return (
    <div className={clsx(bgs[bg])}>
      <Image alt={alt} width={width} height={height} unoptimized={unoptimized} {...props} />
    </div>
  );
};

export default ImageWithBackground;
