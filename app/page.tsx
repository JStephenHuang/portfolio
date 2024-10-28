import { projects } from "@/src/models/Projects";

import ProjectCard from "@/app/_components/ProjectCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-[5rem] flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-3 gap-[1rem]">
        {projects.map((project, key) => (
          <ProjectCard key={key} project={project} />
        ))}
      </div>
      <p className="mt-[5rem]">...</p>
      <div className="py-[5rem] flex items-center gap-[1rem]">
        <p>514-836-8531</p>|
        <a
          className="hover:underline"
          href="mailto:jstephen.huang@uwaterloo.ca"
        >
          jstephen.huang@uwaterloo.ca
        </a>
        |
        <a
          className="hover:underline"
          href="https://www.linkedin.com/in/jstephenhuang/"
        >
          Linkedin
        </a>
        |
        <a className="hover:underline" href="https://github.com/JStephenHuang">
          Github
        </a>
      </div>
      <nav className="w-full flex items-start p-4">
        <Link href={"/sheartak-ltd"}>sheartak ltd</Link>
      </nav>
    </div>
  );
}
