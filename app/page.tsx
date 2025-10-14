import ContactLink from "@/components/ContactLink";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/src/models/project";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const leftProjects = projects.filter((_, index) => index % 2 === 0);
  const rightProjects = projects.filter((_, index) => index % 2 !== 0);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
                Stephen Huang
              </h1>
              <div className="w-12 h-px bg-black mb-6" />
              <p className="text-base leading-relaxed mb-6 text-gray-700">
                Computer Engineering student at the University of Waterloo. I build software that
                solves real problems and explore the intersection of systems design and user
                experience.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="tel:514-836-8531"
                  className="text-sm hover:underline decoration-1 underline-offset-2 transition-colors"
                >
                  514-836-8531
                </a>
                <div className="flex items-center gap-3">
                  <ContactLink
                    url="mailto:jstephen.huang@uwaterloo.ca"
                    icon={<Mail className="w-4 h-4" />}
                  />
                  <ContactLink
                    url="https://www.linkedin.com/in/jstephenhuang/"
                    icon={<LinkedInLogoIcon className="w-4 h-4" />}
                  />
                  <ContactLink
                    url="https://github.com/JStephenHuang"
                    icon={<GitHubLogoIcon className="w-4 h-4" />}
                  />
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/media/h1.png"
                alt="Stephen Huang"
                width={200}
                height={200}
                className="w-48 h-48 rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          <div className="w-12 h-px bg-black mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {leftProjects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
            <div className="space-y-8">
              {rightProjects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm">
            <a
              href="tel:514-836-8531"
              className="hover:underline decoration-1 underline-offset-2 transition-colors"
            >
              514-836-8531
            </a>
            <div className="flex items-center gap-3">
              <ContactLink
                url="mailto:jstephen.huang@uwaterloo.ca"
                icon={<Mail className="w-4 h-4" />}
              />
              <ContactLink
                url="https://www.linkedin.com/in/jstephenhuang/"
                icon={<LinkedInLogoIcon className="w-4 h-4" />}
              />
              <ContactLink
                url="https://github.com/JStephenHuang"
                icon={<GitHubLogoIcon className="w-4 h-4" />}
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
