"use client";

import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type React from "react";

import { IconLink, useSetting } from "@/components/custom";
import { Tooltip } from "@/components/primitives";

import styles from "./styles.module.scss";

const SETTING_STEP = 0.1;
const SETTING_PRECISION = 1;

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className={styles.link}
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? "dark" : "light"}
    </button>
  );
};

interface WheelSettingProps {
  disabled?: boolean;
  label: string;
  onChange: (value: number) => void;
  value: number;
}

const WheelSetting: React.FC<WheelSettingProps> = ({ disabled, label, onChange, value }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const updateValue = useCallback(
    (direction: number) => {
      const nextValue = value + direction * SETTING_STEP;
      const wrappedValue = nextValue > 1 ? 0 : nextValue < 0 ? 1 : nextValue;

      onChange(Number(wrappedValue.toFixed(SETTING_PRECISION)));
    },
    [onChange, value],
  );

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger || disabled) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;

      event.preventDefault();
      updateValue(event.deltaY < 0 ? 1 : -1);
    };

    trigger.addEventListener("wheel", handleWheel, { passive: false });

    return () => trigger.removeEventListener("wheel", handleWheel);
  }, [disabled, updateValue]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (disabled) return;

    if (["ArrowUp", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      updateValue(1);
    }

    if (["ArrowDown", "ArrowLeft"].includes(event.key)) {
      event.preventDefault();
      updateValue(-1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      onChange(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      onChange(1);
    }
  };

  return (
    <Tooltip.Root
      disabled={disabled}
      openDelay={300}
      positioning={{ placement: "left", gutter: 12 }}
    >
      <Tooltip.Trigger
        ref={triggerRef}
        className={styles.settingControl}
        type="button"
        aria-disabled={disabled}
        role="spinbutton"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={value}
        tabIndex={disabled ? -1 : undefined}
        onClick={() => !disabled && updateValue(1)}
        onKeyDown={handleKeyDown}
      >
        <span>{label}</span>
        <output>{value.toFixed(SETTING_PRECISION)}</output>
      </Tooltip.Trigger>
      <Tooltip.Content>Scroll to adjust, or tap to increase</Tooltip.Content>
    </Tooltip.Root>
  );
};

export const Nav = () => {
  const { bounce, friction, layout, isLoading, setBounce, setFriction, setLayout } = useSetting();
  const isFreeLayout = layout === "freed";

  const toggleLayout = () => {
    setLayout(layout === "fixed" ? "freed" : "fixed");
  };

  return (
    <nav className={styles.container}>
      <div className={styles.nav}>
        <Link className={styles.link} href="/">
          j. stephen huang
        </Link>
        {!isLoading ? <div className={styles.settings} role="group" aria-label="Canvas settings">
          <ThemeToggle />
          <button
            className={styles.link}
            type="button"
            onClick={toggleLayout}
          >
            {layout}
          </button>
          {isFreeLayout && (
            <Fragment>
              <WheelSetting
                label="Friction"
                value={friction}
                onChange={setFriction}
              />
              <WheelSetting
                label="Bounce"
                value={bounce}
                onChange={setBounce}
              />
            </Fragment>
          )}
        </div> : <div>loading...</div>}
      </div>
      <div className={styles.footer}>
        <Link className={styles.link} href="tel:5148368531">
          514 836 8531
        </Link>
        <IconLink href="mailto:jstephhuang@gmail.com" aria-label="Email Stephen Huang" title="Email">
          <EnvelopeClosedIcon className={styles.icon} aria-hidden="true" />
        </IconLink>
        <IconLink
          href="https://linkedin.com/in/jstephenhuang"
          title="LinkedIn"
          newWindow
        >
          <LinkedInLogoIcon className={styles.icon} aria-hidden="true" />
        </IconLink>
        <IconLink
          href="https://github.com/jstephenhuang"
          title="GitHub"
          newWindow
        >
          <GitHubLogoIcon className={styles.icon} aria-hidden="true" />
        </IconLink>
      </div>
    </nav>
  );
};
