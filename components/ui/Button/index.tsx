import classNames from "classnames";
import type React from "react";

import { Spinner } from "../Spinner";
import styles from "./styles.module.scss";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  isLoading?: boolean;
  align?: "left" | "center" | "right";
}

const ButtonBase = ({
  children,
  type = "button",
  isLoading,
  disabled,
  className,
  align = "center",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    className={classNames(className, isLoading && styles["loading-root"])}
    {...props}
  >
    <span
      className={classNames(
        styles["label-slot"],
        styles[`label-slot--align-${align}`],
        isLoading && styles["label-slot--hidden"]
      )}
    >
      {children}
    </span>
    {isLoading && (
      <span className={styles["loading-overlay"]} aria-hidden>
        <Spinner size={16} />
      </span>
    )}
  </button>
);

const PrimaryButton = ({ children, className, ...props }: ButtonProps) => (
  <ButtonBase {...props} className={classNames(styles.primary, className)}>
    {children}
  </ButtonBase>
);

const SecondaryButton = ({ children, className, ...props }: ButtonProps) => (
  <ButtonBase {...props} className={classNames(styles.secondary, className)}>
    {children}
  </ButtonBase>
);

const LinkButton = ({ children, className, align = "left", ...props }: ButtonProps) => (
  <ButtonBase {...props} align={align} className={classNames(styles.link, className)}>
    {children}
  </ButtonBase>
);

export { PrimaryButton as Primary, SecondaryButton as Secondary, LinkButton as Link };
