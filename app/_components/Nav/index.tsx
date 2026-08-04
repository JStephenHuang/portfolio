"use client";

import { useMounted } from "@mantine/hooks";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTheme } from "next-themes";

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
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted && (isDark ? "light" : "dark")}
    </button>
  );
};

const LayoutToggle: React.FC = () => {
  const { isLoading, layout, setLayout } = useSettings();
  const isLocked = layout === "lock";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setLayout(isLocked ? "free" : "lock")}
    >
      {!isLoading && (isLocked ? "free" : "lock")}
    </button>
  );
};

const Nav: React.FC = () => {
  const { isLoading, friction, bounce, layout, setBounce, setFriction } = useSettings();
  const isLocked = layout === "lock";

  return (
    <div>
      <nav className={styles.topNav}>
        <Link className={styles.link} href={"/"}>
          jsh
        </Link>
        <div className={styles.settings}>
          <ThemeToggle />
          <LayoutToggle />
          {!isLoading && isLocked && (
            <>
              <PhysicsToggle label="friction" value={friction} onChange={setFriction} />
              <PhysicsToggle label="bounce" value={bounce} onChange={setBounce} />
            </>
          )}
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
