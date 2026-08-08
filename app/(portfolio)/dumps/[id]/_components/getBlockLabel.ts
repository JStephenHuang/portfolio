export const getBlockLabel = (src: string): string => src.split("?")[0].split("/").at(-1) || src;
