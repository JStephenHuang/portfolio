"use client";

import { Portal, Tooltip as TooltipPrimitive } from "@ark-ui/react";
import classNames from "classnames";
import type React from "react";

import styles from "./styles.module.scss";

const Root = TooltipPrimitive.Root;
const Trigger = TooltipPrimitive.Trigger;

const Content: React.FC<React.ComponentProps<typeof TooltipPrimitive.Content>> = ({
  children,
  className,
  ...props
}) => (
  <Portal>
    <TooltipPrimitive.Positioner>
      <TooltipPrimitive.Content className={classNames(styles.content, className)} {...props}>
        {children}
        <TooltipPrimitive.Arrow className={styles.arrow}>
          <TooltipPrimitive.ArrowTip />
        </TooltipPrimitive.Arrow>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Positioner>
  </Portal>
);

export { Content, Root, Trigger };
