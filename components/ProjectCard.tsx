"use client";
import { Project } from "@/src/models/project";
import Link from "next/link";
import { useState } from "react";
import { ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const ProjectCard = ({ name, position, url, media, date }: Project) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const nextMedia = () => {
    if (media && media.length > 0) {
      setCurrentMediaIndex((prev) => (prev + 1) % media.length);
    }
  };

  const prevMedia = () => {
    if (media && media.length > 0) {
      setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    }
  };

  return (
    <div className="relative flex flex-col rounded-xl border border-gray-200 p-6 transition-all">
      <div className="w-full flex flex-col gap-4">
        {/* Media section displayed below content */}
        {media && media.length > 0 && (
          <div className="w-full relative">
            <div className="w-full aspect-video rounded-lg overflow-hidden relative bg-gray-100">
              {media.map((src, i) => {
                // YouTube URL?
                const ytMatch = src.match(
                  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
                );

                if (ytMatch) {
                  const id = ytMatch[1];
                  return (
                    <div
                      key={i}
                      className={`w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${
                        i === currentMediaIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${id}`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    </div>
                  );
                }

                // Otherwise assume it's an image
                return (
                  <div
                    key={i}
                    className={`w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${
                      i === currentMediaIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      className="w-full h-full object-cover"
                      src={src}
                      width={500}
                      height={500}
                      alt={`${name} preview ${i + 1}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Media navigation controls - only visible when there are multiple media items */}
            {media.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                <button
                  onClick={prevMedia}
                  className="bg-white/40 hover:bg-white transition-all rounded-full p-1 shadow-md pointer-events-auto"
                  aria-label="Previous media"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextMedia}
                  className="bg-white/40 hover:bg-white transition-all rounded-full p-1 shadow-md pointer-events-auto"
                  aria-label="Next media"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            )}

            {/* Media count indicator */}
            {media.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-0.5 rounded-full text-xs">
                {currentMediaIndex + 1} / {media.length}
              </div>
            )}
          </div>
        )}
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
      </div>
    </div>
  );
};

export default ProjectCard;
