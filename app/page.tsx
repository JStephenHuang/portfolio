import { Project, projects } from "@/src/models/Projects";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col w-full border border-black overflow-hidden">
      {project.src.split(".")[1] === "mov" && (
        <video
          className="w-full aspect-video object-fit"
          loop
          autoPlay
          muted
          src={project.src}
        />
      )}

      <div className="p-[1rem] flex flex-col">
        <p className="font-bold text-[1.25rem]">{project.name}</p>
        <p className="font-bold text-gray-600">{project.role}</p>
        <p className="text-[0.75rem]">{project.date}</p>
        <a className="w-fit underline hover:text-red-500" href={project.link}>
          {project.linkName}
        </a>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="px-[3rem] flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-[2rem] font-bold py-[5rem]">
        Stephen&apos;s pile of stuff
      </h1>
      <div className="grid grid-cols-3 gap-[1rem]">
        {projects.map((project, key) => (
          <ProjectCard key={key} project={project} />
        ))}
      </div>
      <div className="py-[5rem] font-bold flex items-center gap-[1rem]">
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
        |
      </div>
    </div>
  );
}
