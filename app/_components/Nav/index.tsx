"use client";

import { useMounted } from "@mantine/hooks";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { Button, Link } from "@/components/ui";

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
    <Button.Link
      className={styles.settingsControl}
      onClick={() => onChange(getNextPhysicsValue(value))}
      onWheel={(event) => {
        event.preventDefault();
        onChange(getNextPhysicsValue(value, event.deltaY < 0 ? 1 : -1));
      }}
    >
      {label} {value.toFixed(1)}
    </Button.Link>
  );
};

const ThemeToggle: React.FC = () => {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) return <span>loading...</span>;

  const isDark = resolvedTheme === "dark";

  return (
    // <div className={styles.toggles}>
    //   <Button.Toggle active={!isDark} onClick={() => setTheme("light")}>
    //     light
    //   </Button.Toggle>
    //   <Button.Toggle active={isDark} onClick={() => setTheme("dark")}>
    //     dark
    //   </Button.Toggle>
    // </div>
    <Button.Link onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? "light" : "dark"}</Button.Link>
  );
};

const LayoutToggle: React.FC = () => {
  const { isLoading, layout, setLayout } = useSettings();
  const isLocked = layout === "lock";

  if (isLoading) return <span>loading...</span>;

  return <Button.Link onClick={() => setLayout(isLocked ? "free" : "lock")}>{isLocked ? "free" : "lock"}</Button.Link>;
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
        <div className={classNames(styles.settings)}>
          <Button.Toggle active={isSettingsOpen} onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            settings
          </Button.Toggle>
          <motion.div
            className={classNames(styles.settingsContent)}
            initial={false}
            animate={isSettingsOpen ? { height: "auto", opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ThemeToggle />
            <LayoutToggle />
            {!isLoading && !isLocked && (
              <>
                <PhysicsToggle label="friction" value={friction} onChange={setFriction} />
                <PhysicsToggle label="bounce" value={bounce} onChange={setBounce} />
              </>
            )}
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
