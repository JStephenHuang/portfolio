"use client";

import { Project } from "@/src/models/Projects";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

const ProjectCard = ({ project }: { project: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="flex flex-col w-full border border-black overflow-hidden hover:bg-slate-100 transition"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video object-fit"
        loop
        muted
        src={project.mainVideoPath}
      />

      <div className="p-[1rem] flex flex-col">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[1.25rem]">{project.name}</p>
          <p className="text-[0.75rem]">{project.date}</p>
        </div>
        <p className="font-bold">{project.subname}</p>
        <div className="flex items-center gap-2">
          {project.skills.map((skill, key) => (
            <>
              <p className="italic text-[0.75rem]" key={key}>
                {skill}
              </p>
              {key !== project.skills.length - 1 && <span>|</span>}
            </>
          ))}
        </div>
        <a className="flex items-center gap-1 w-fit hover:text-red-500" href={project.link}>
          Visit <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
};
export default ProjectCard;
