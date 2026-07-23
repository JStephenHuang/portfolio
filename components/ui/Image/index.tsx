import classNames from "classnames";
import NextImage, { type ImageProps } from "next/image";

import styles from "./styles.module.scss";

export const Image: React.FC<ImageProps> = ({ className, alt, ...props }) => {
  return <NextImage className={classNames(styles.image, className)} alt={alt} {...props} />;
};
