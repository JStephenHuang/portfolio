import { projects } from "@/src/models/Projects";

import ProjectCard from "@/app/_components/ProjectCard";

export default function Home() {
  return (
    <div className="px-[5rem] flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-[2rem] font-bold py-[5rem]">
        Stephen&apos;s pile of stuff
      </h1>
      <div className="grid grid-cols-3 gap-[1rem]">
        {projects.map((project, key) => (
          <ProjectCard key={key} project={project} />
        ))}
      </div>
      <p className="mt-[5rem]">More to come!</p>
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
    </div>
  );
}
