export type Project = {
  name: string;
  role: string;
  date: string;
  link: string;
  linkName: string;
  src: string;
};

const capshun: Project = {
  name: "Capshun",
  role: "Co-Founder & Software Engineer",
  date: "Jun. 2024 - Present",
  link: "https://capshun.ca",
  linkName: "www.capshun.ca",
  src: "/capshun.mov",
};

const honeyice: Project = {
  name: "HONEYÏCE",
  role: "Freelance Software Developer",
  date: "Jan. 2024 - Jul. 2024",
  link: "https://honeyice.world",
  linkName: "www.honeyice.world",
  src: "/honeyice.mov",
};
const matrnaud: Project = {
  name: "Matrnaud",
  role: "Freelance Web Developer",
  date: "Mar. 2023 - May 2023",
  link: "https://matrnaud.com",
  linkName: "www.matrnaud.com",
  src: "/matrnaud.mov",
};
const marihacks: Project = {
  name: "Marihacks",
  role: "Website Lead Organizer",
  date: "Aug. 2023 - Apr. 2024",
  link: "https://marihacks.com",
  linkName: "www.marihacks.com",
  src: "/marihacks.mov",
};

const asiantype: Project = {
  name: "asiantype",
  role: "Personal project",
  date: "Aug. 2023 - Apr. 2024",
  link: "https://typingtest-wine-six.vercel.app/",
  linkName: "https://typingtest-wine-six.vercel.app/",
  src: "/asiantype.mov",
};

export const projects: Project[] = [
  capshun,
  honeyice,
  matrnaud,
  marihacks,
  asiantype,
];
