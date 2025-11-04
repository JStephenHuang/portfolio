"use client";

import Canvas from "@/components/Canvas";
import Directory from "@/components/custom/Directory";
import Document from "@/components/custom/Document";
import { projectDirectories } from "@/lib/data/directories/projects";

export default function ProjectsPage() {
  const directories = projectDirectories.map((dir, index) => (
    <Directory
      key={`dir-${index}`}
      title={dir.name}
      href={dir.href}
      image={dir.image}
      initialX={(index + 1) * 150}
      initialY={(index + 1) * 150}
    />
  ));

  // Mock Document Modals
  const documents = [
    {
      title: "README.md",
      content: (
        <div className="prose">
          <h2 className="text-2xl font-bold mb-4">Project Documentation</h2>
          <p className="mb-4">
            Welcome to my portfolio projects! This README contains important information
            about the projects I've worked on.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">Technologies</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Next.js 14</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>React</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-3">Getting Started</h3>
          <pre className="bg-gray-100 p-3 rounded">
            <code>npm install{'\n'}npm run dev</code>
          </pre>
        </div>
      ),
      initialX: 100,
      initialY: 100,
    },
    {
      title: "notes.txt",
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">Project Notes</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Sprint 1 Notes:</h3>
              <p className="text-gray-600">
                - Completed initial UI design<br/>
                - Set up component architecture<br/>
                - Implemented drag and drop functionality
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Sprint 2 Notes:</h3>
              <p className="text-gray-600">
                - Added modal system<br/>
                - Improved navigation<br/>
                - Performance optimizations
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Todo:</h3>
              <p className="text-gray-600">
                - Add more animations<br/>
                - Implement search functionality<br/>
                - Add dark mode support
              </p>
            </div>
          </div>
        </div>
      ),
      initialX: 250,
      initialY: 120,
    },
    {
      title: "skills.md",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Frontend</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded">React</span>
              <span className="bg-gray-100 px-3 py-1 rounded">TypeScript</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Next.js</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Vue.js</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-600">Backend</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded">Node.js</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Python</span>
              <span className="bg-gray-100 px-3 py-1 rounded">PostgreSQL</span>
              <span className="bg-gray-100 px-3 py-1 rounded">MongoDB</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded">Git</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Docker</span>
              <span className="bg-gray-100 px-3 py-1 rounded">AWS</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Figma</span>
            </div>
          </div>
        </div>
      ),
      initialX: 400,
      initialY: 200,
    }
  ];

  return (
    <main className="w-screen h-screen bg-white relative">
      <Canvas.Root>
        {directories}
        {documents.map((doc, index) => (
          <Document.Modal
            key={`doc-${index}`}
            title={doc.title}
            content={doc.content}
            initialX={doc.initialX}
            initialY={doc.initialY}
          />
        ))}
      </Canvas.Root>
    </main>
  );
}
