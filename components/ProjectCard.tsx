"use client";

import { Project } from "@/src/models/project";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const ProjectCard = ({ name, position, url, media, skills, description, date }: Project) => {
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
          className="z-10 absolute w-full aspect-video rounded-xl bg-red-50 overflow-hidden animate-fade-in overflow-y-auto"
          style={{ top: -cardHeight }}
        >
          {media && (
            <div className="w-full aspect-video flex flex-col">
              {media.map((src, i) => {
                // YouTube URL?
                const ytMatch = src.match(
                  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
                );
                if (ytMatch) {
                  const id = ytMatch[1];
                  return (
                    <iframe
                      key={i}
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${id}`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  );
                }
                // Otherwise assume it's an image
                return (
                  <Image
                    key={i}
                    className="w-full h-auto object-cover"
                    src={src}
                    width={500}
                    height={500}
                    alt={`Media ${i + 1}`}
                  />
                );
              })}
            </div>
          )}

          {description && <div className="p-4 text-xs text-gray-700">{description}</div>}
        </div>
      )}
    </div>
  );
};
export default ProjectCard;
