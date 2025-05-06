"use client";

import { Project } from "@/src/models/project";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const ProjectCard = ({ name, position, url, video, skills, description, date }: Project) => {
  const [hovered, setHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    setCardHeight((cardRef.current.offsetWidth * 9) / 16);
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col hover:border-red-500 items-center rounded-xl border border-gray-200 p-6 transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          {date && <p className="text-xs text-gray-400 mt-1">{date}</p>}
        </div>

        <p className="text-sm text-gray-600">{position}</p>

        {url && (
          <Link
            href={url}
            className="flex items-center gap-1 w-fit text-red-500 hover:text-red-700 transition"
            target="_blank"
          >
            Visit <ExternalLinkIcon />
          </Link>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="border border-gray-300 text-sm px-3 py-1 rounded-md text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Preview with Video and Description */}
      {hovered && (
        <div
          className={`z-10 absolute w-full aspect-video rounded-lg bg-white overflow-hidden animate-fade-in border border-gray-200 overflow-y-auto`}
          style={{
            top: -cardHeight - 5, // dynamically position above card
          }}
        >
          <video src={video} className="w-full h-auto" autoPlay muted loop playsInline />
          {description && (
            <div className="p-4 bg-white text-xs text-gray-700 max-h-[6rem]">
              {/* {description.split("\n").map((line, i) => (
                <p key={i} className="mb-1">
                  {line}
                </p>
              ))} */}
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ProjectCard;
