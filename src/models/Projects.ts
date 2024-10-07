export type Project = {
  name: string;
  subname: string;
  date: string;
  slug: string;
  link: string;
  skills: string[];
  description: string;
  mainVideoPath: string;
};

const capshun: Project = {
  name: "Capshun",
  subname: "Co-Founder & Software Engineer",
  date: "Jun. 2024 - Present",
  link: "https://capshun.ca",
  mainVideoPath: "/capshun.mov",
  slug: "capshun",
  skills: ["Next.js", "Firebase", "Stripe"],
  description:
    "• Spearheaded the development of an Next.js web application that enables content creators to obtain insightful transcriptions with 99% accuracy for their content using AI.\n" +
    "• Implemented intuitive designs in the frontend for uploading videos, viewing & editing transcriptions, managing project, and a dashboard for general analytics with React and Tailwind CSS, boosting usability and accessibility.\n" +
    "• Integrated Firebase and Stripe for user authentication, data storage and secure payment processing.",
};

const honeyice: Project = {
  name: "HONEYÏCE",
  subname: "Freelance Software Developer",
  date: "Jan. 2024 - Jul. 2024",
  link: "https://honeyice.world",
  mainVideoPath: "/honeyice.mov",
  slug: "honeyice",
  skills: ["Next.js", "Firebase", "JWT"],
  description: "",
};
const matrnaud: Project = {
  name: "Matrnaud",
  subname: "Freelance Web Developer",
  date: "Mar. 2023 - May 2023",
  link: "https://matrnaud.com",
  mainVideoPath: "/matrnaud.mov",
  slug: "matrnaud",
  skills: ["React", "Firebase", "Sendgrid"],
  description: "",
};
const marihacks: Project = {
  name: "Marihacks",
  subname: "Website Lead Organizer",
  date: "Aug. 2023 - Apr. 2024",
  link: "https://marihacks.com",
  mainVideoPath: "/marihacks.mov",
  slug: "marihacks",
  skills: ["React", "Framer Motion", "TailwindCSS"],
  description: "",
};

const budgetbuddy: Project = {
  name: "Budget Buddy",
  subname: "Personal project",
  date: " Mar 16, 2024",
  link: "https://budget-buddy-v1-tawny.vercel.app/",
  mainVideoPath: "/budgetbuddy.mov",
  slug: "budgetbuddy",
  skills: ["Next.js", "Tesseract OCR", "REST APIs"],
  description: "",
};

const asiantype: Project = {
  name: "asiantype",
  subname: "Personal project",
  date: " Mar 25, 2022 - Apr 2, 2022",
  link: "https://typingtest-wine-six.vercel.app",
  mainVideoPath: "/asiantype.mov",
  slug: "asiantype",
  skills: ["React", "TailwindCSS", "Typescript"],
  description: "",
};

export const projects: Project[] = [
  capshun,
  honeyice,
  matrnaud,
  marihacks,
  asiantype,
  budgetbuddy,
];
