import ContactLink from "@/components/ContactLink";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/src/models/project";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { LucideMail } from "lucide-react";

export default function Home() {
  const leftProjects = projects.filter((_, index) => index % 2 === 0);
  const rightProjects = projects.filter((_, index) => index % 2 !== 0);

  return (
    <div className="flex flex-col items-center gap-8 py-[5rem]">
      <div className="w-[90%] lg:w-2/3 flex flex-col items-center gap-10">
        <section className="section w-[55%] items-center">
          <h2 className="text-4xl tracking-tight">Stephen Huang&apos;s Portfolio</h2>
          <hr className="w-[10%] border-red-500 " />

          <p className="text-center">
            I&apos;m a <strong>Computer Engineering</strong> student at the{" "}
            <strong>University of Waterloo</strong> who enjoys learning complex concepts and
            applying that knowledge to create meaningful impact for others and the world.
          </p>
        </section>

        <section className="section w-[55%] items-center">
          <h2 className="text-4xl tracking-tight">Projects</h2>
          <hr className="w-[10%] border-red-500 " />

          <p className="text-center">
            These are some of the projects which thaught me valuable lessons and driving my growth
            and ambition as a developer.
          </p>
        </section>
        <section className="section ">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full flex flex-col gap-8">
              {leftProjects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
            <div className="w-full flex flex-col gap-8">
              {rightProjects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
          </div>
        </section>
        <section className="section items-center">
          <hr className="w-full" />
          <div className="flex items-center gap-[1rem]">
            <div className="flex items-center gap-1">
              <span className="text-sm">514-836-8531</span>
            </div>

            <ContactLink
              url={"mailto:jstephen.huang@uwaterloo.ca"}
              icon={<LucideMail className="w-full h-full" />}
            />
            <ContactLink
              url={"https://www.linkedin.com/in/jstephenhuang/"}
              icon={<LinkedInLogoIcon className="w-full h-full" />}
            />
            <ContactLink
              url={"https://github.com/JStephenHuang"}
              icon={<GitHubLogoIcon className="w-full h-full" />}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
