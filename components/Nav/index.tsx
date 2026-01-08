"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSettings } from "@/lib/hooks/useSettings";

import "./styles.css";

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, layout, toggleTheme, toggleLayout } = useSettings();

  return (
    <div className="nav-container">
      <div className="nav">
        <button onClick={() => pathname !== "/" && router.back()} className="navlink">
          {pathname}
        </button>
        <Link className="navlink place-self-center" href="/">
          j. stephen huang
        </Link>
        <div className="place-self-end flex items-center gap-3">
          <Link className="navlink" href="/about">
            about
          </Link>
          <button onClick={toggleLayout} className="navlink" disabled={!layout}>
            [{layout ?? "..."}]
          </button>
          <button onClick={toggleTheme} className="navlink" disabled={!theme}>
            [{theme ?? "..."}]
          </button>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed left-8 bottom-8 right-8 z-50 flex justify-center gap-2 pointer-events-none">
        <Link className="navlink" href="tel:5148368531">
          514 836 8531
        </Link>
        <span>/</span>
        <Link className="navlink" href="mailto:jstephhuang@gmail.com">
          jstephhuang@gmail.com
        </Link>
        <span>/</span>
        <Link className="navlink" href="https://linkedin.com/in/jstephenhuang">
          linkedin
        </Link>
        <span>/</span>
        <Link className="navlink" href="https://github.com/jstephenhuang">
          github
        </Link>
      </div>
    </div>
  );
};
