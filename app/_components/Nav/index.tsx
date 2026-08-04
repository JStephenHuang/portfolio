"use client";

import { useMounted } from "@mantine/hooks";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { motion } from "motion/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";

import { useSettings } from "../contexts/SettingsContext";
import styles from "./styles.module.scss";

const getNextPhysicsValue = (value: number, direction: 1 | -1 = 1) => {
  return ((Math.round(value * 10) + direction + 11) % 11) / 10;
};

type PhysicsToggleProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const PhysicsToggle: React.FC<PhysicsToggleProps> = ({ label, value, onChange }) => {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => onChange(getNextPhysicsValue(value))}
      onWheel={(event) => {
        event.preventDefault();
        onChange(getNextPhysicsValue(value, event.deltaY < 0 ? 1 : -1));
      }}
    >
      {label} {value.toFixed(1)}
    </button>
  );
};

const ThemeToggle: React.FC = () => {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  if (!mounted) return <span>loading...</span>;
  const isDark = resolvedTheme === "dark";

  return (
    <button type="button" className={styles.toggle} onClick={() => setTheme(isDark ? "light" : "dark")}>
      {mounted && (isDark ? "light" : "dark")}
    </button>
  );
};

const LayoutToggle: React.FC = () => {
  const { isLoading, layout, setLayout } = useSettings();
  const isLocked = layout === "lock";

  if (isLoading) return <span>loading...</span>;

  return (
    <button type="button" className={styles.toggle} onClick={() => setLayout(isLocked ? "free" : "lock")}>
      {isLocked ? "free" : "lock"}
    </button>
  );
};

const Nav: React.FC = () => {
  const { isLoading, isSettingsOpen, friction, bounce, layout, setIsSettingsOpen, setBounce, setFriction } =
    useSettings();
  const isLocked = layout === "lock";

  return (
    <div>
      <nav className={styles.topNav}>
        <Link className={styles.link} href={"/"}>
          jsh
        </Link>
        <div className={classNames(styles.settings, isSettingsOpen && styles.settingsOpen)}>
          <button
            type="button"
            className={classNames(styles.settingsToggle, isSettingsOpen && styles.toggleOpen)}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            settings
          </button>
          <motion.div
            className={styles.settingsDisclosure}
            initial={false}
            animate={isSettingsOpen ? { height: "auto", opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className={styles.settingsControls}>
              <ThemeToggle />
              <LayoutToggle />
              {!isLoading && !isLocked && (
                <>
                  <PhysicsToggle label="friction" value={friction} onChange={setFriction} />
                  <PhysicsToggle label="bounce" value={bounce} onChange={setBounce} />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </nav>
      <nav className={styles.botNav}>
        <Link className={styles.link} href="tel:5148368531">
          514 836 8531
        </Link>
        <Link className={styles.link} href={"mailto:jstephhuang@gmail.com"}>
          <EnvelopeClosedIcon className={styles.icon} />
        </Link>
        <Link className={styles.link} href="https://linkedin.com/in/jstephenhuang">
          <LinkedInLogoIcon className={styles.icon} />
        </Link>
        <Link className={styles.link} href="https://github.com/jstephenhuang">
          <GitHubLogoIcon className={styles.icon} />
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
