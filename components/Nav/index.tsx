"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import "./styles.css";

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="nav-container">
      <div className="nav">
        <button onClick={() => pathname !== "/" && router.back()} className="navlink">
          {pathname}
        </button>
        <Link className="navlink place-self-center" href="/">
          j. stephen huang
        </Link>
        <Link className="navlink place-self-end" href="/">
          about
        </Link>
      </div>
      {/* Footer */}
      <div className="fixed left-8 bottom-8 right-8 z-50 flex justify-center gap-2">
        <Link className="navlink" href="tel:5148368531">
          514 836 8531
        </Link>
        <span>/</span>
        <Link className="navlink" href="mailto:js3huang@uwaterloo.ca">
          js3huang@uwaterloo
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
