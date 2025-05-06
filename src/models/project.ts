import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string(),
  position: z.string(),
  date: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  video: z.string().optional(),
  url: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export type Project = z.infer<typeof projectSchema>;

const wato: Project = {
  name: "WATonomous",
  slug: "watonomous",
  position: "Autonomous Driving World Modeling Developer",
  date: "Sept. 2024 - Present",
  url: "https://www.watonomous.ca/",
  video: "./videos/wato.mp4",
  skills: ["C++", "ROS2", "Foxglove", "CARLA", "Docker", "SLURM"],
  description:
    "Spearheaded the development of C++ world modeling modules that enhance traffic awareness in AVs, improving downstream planning and perception. Validated integration via ROS2, CARLA, and Foxglove. Leveraged Docker and SLURM across a GPU cluster to optimize runtime performance.",
};

const rbb: Project = {
  name: "RBB Manufacturing",
  slug: "rbb-manufacturing",
  position: "Full Stack Software Developer",
  date: "Feb. 2025 - Present",
  url: "",
  video: "./videos/rbb.mp4",
  skills: ["Next.js", "SASS", "Prisma", "Notion API"],
  description:
    "Built a full-stack form system with Next.js, SASS, and Prisma for batch requests across 70+ clients, speeding fulfillment by 50%. Resolved 10+ operational bugs and integrated Notion API to enhance ticket resolution productivity by 40%.",
};

const sheartak: Project = {
  name: "Sheartak Tools",
  slug: "sheartak",
  position: "Mechanical Engineer Associate",
  date: "Jan. 2025 - Apr. 2025",
  url: "https://www.sheartak.com",
  video: "./videos/sheartak.mp4",
  skills: ["SolidWorks", "Technical Writing", "Illustrator"],
  description:
    "Designed 50+ 3D models and 2D drawings for production using SolidWorks. Authored manuals for 20+ products, empowering customers to self-install and cutting support requests by 90%.",
};

const honeyice: Project = {
  name: "Honeyice",
  slug: "honeyice",
  position: "Freelance Software Developer",
  date: "Jan. 2024 - Jul. 2024",
  url: "https://honeyice.world",
  video: "./videos/honeyice.mp4",
  skills: ["Next.js", "Firebase", "JWT", "SendGrid"],
  description:
    "Developed marketing site and admin dashboard for a design brand using Next.js and Firebase. Secured content editing with JWT auth. Integrated SendGrid for email workflows, increasing sales and outreach by 40%.",
};

const capshun: Project = {
  name: "Capshun",
  slug: "capshun",
  position: "Co-Founder & Software Engineer",
  date: "Jun. 2024 - Aug. 2024",
  url: "https://capshun.ca",
  video: "./videos/capshun.mov",
  skills: ["Next.js", "Firebase", "Stripe"],
  description:
    "Built a web app offering 99% accurate AI-generated transcriptions. Integrated Firebase for auth and data storage, and Stripe for secure payments. Designed accessible UX for upload, edit, and analytics.",
};

const marihacks: Project = {
  name: "MariHacks",
  slug: "marihacks",
  position: "Website Lead Organizer",
  date: "Aug. 2023 - Apr. 2024",
  url: "https://marihacks.com",
  video: "./videos/marihacks.mp4",
  skills: ["React", "Framer Motion", "TailwindCSS"],
  description:
    "Revamped MariHacks site with animations and interactive UI, doubling event participation. Led and taught React workshops to increase outreach and branding appeal.",
};

const budgetbuddy: Project = {
  name: "Budget Buddy",
  slug: "budgetbuddy",
  position: "Hackathon Winner",
  date: "Mar. 16, 2024",
  url: "https://budget-buddy-v1-tawny.vercel.app/",
  video: "./videos/budgetbuddy.mp4",
  skills: ["Next.js", "Tesseract OCR", "REST APIs"],
  description:
    "Built a receipt-tracking app using OCR and Next.js. Provided financial insights and recommendations. Won 1st place in advanced category at a university hackathon.",
};

const asiantype: Project = {
  name: "Asiantype",
  slug: "asiantype",
  position: "Personal Project",
  date: "Mar. 25, 2022 - Apr. 2, 2022",
  url: "https://typingtest-wine-six.vercel.app",
  video: "./videos/asiantype.mp4",
  skills: ["React", "TailwindCSS", "Typescript"],
  description:
    "Created a typing speed test app tailored for Asian character inputs, featuring minimalistic design and real-time feedback.",
};

export const projects: Project[] = [
  wato,
  rbb,
  sheartak,
  honeyice,
  capshun,
  marihacks,
  budgetbuddy,
  asiantype,
];
