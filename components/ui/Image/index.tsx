import classNames from "classnames";
import NextImage, { type ImageProps } from "next/image";

import styles from "./styles.module.scss";

const QUALITY = 1000

export const Image: React.FC<ImageProps> = ({ className, alt, ...props }) => {
  return <NextImage className={classNames(styles.image, className)} alt={alt} width={QUALITY} height={QUALITY} {...props} />;
};
