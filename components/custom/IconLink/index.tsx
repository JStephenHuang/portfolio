import classNames from "classnames";
import Link from "next/link";
import type React from "react";

import styles from "./styles.module.scss";

interface IconLinkProps extends React.ComponentProps<typeof Link> {
  newWindow?: boolean;
}

export const IconLink: React.FC<IconLinkProps> = ({
  children,
  className,
  newWindow,
  target,
  rel,
  ...props
}) => (
  <Link
    {...props}
    className={classNames(styles.link, styles.iconLink, className)}
    target={newWindow ? "_blank" : target}
    rel={newWindow ? "noreferrer" : rel}
  >
    {children}
  </Link>
);

export default IconLink;
