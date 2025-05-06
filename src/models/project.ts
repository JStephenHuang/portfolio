import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string(),
  position: z.string(),
  date: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  media: z.array(z.string()).optional(),
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
  media: [
    "https://www.youtube.com/watch?v=Y1IZLzXHj7Q",
    "/media/wm2.png",
    "/media/wm1.png",
    "https://www.youtube.com/watch?v=bFomUyp9co4",
    "/media/wm3.png",
  ],
  skills: ["C++", "ROS2", "Foxglove", "CARLA", "Docker", "SLURM"],
  description:
    "Spearheaded the development of C++ world modeling modules that enhance traffic awareness in AVs, improving downstream planning and perception. Validated integration via ROS2, CARLA, and Foxglove. Leveraged Docker and SLURM across a GPU cluster to optimize runtime performance.",
};

const rbb: Project = {
  name: "RBB Manufacturing",
  slug: "rbb-manufacturing",
  position: "Full Stack Software Developer",
  date: "Feb. 2025 - Present",
  url: "https://www.rbbmanufacturing.com",
  media: ["/media/rbb2.png"],
  skills: ["Next.js", "SASS", "Prisma", "Notion API", "Typescript"],
  description:
    "Built a full-stack form system with Next.js, SASS, and Prisma for batch requests across 70+ clients, speeding fulfillment by 50%. Resolved 10+ operational bugs and integrated Notion API to enhance ticket resolution productivity by 40%.",
};

const sheartak: Project = {
  name: "Sheartak Tools",
  slug: "sheartak",
  position: "Mechanical Engineer Associate",
  date: "Jan. 2025 - Apr. 2025",
  url: "https://www.sheartak.com",
  skills: ["SolidWorks", "Technical Writing"],
  description:
    "Designed 50+ 3D models and 2D drawings for production using SolidWorks. Authored manuals for 20+ products, empowering customers to self-install and cutting support requests by 90%.",
};

const ros2TurtleSim: Project = {
  name: "ROS2 TurtleSim",
  slug: "ros2-turtlesim",
  position: "ROS2 Workshop Project",
  date: "Nov. 2024",
  url: "https://docs.ros.org/en/foxy/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html",
  media: [
    "https://www.youtube.com/watch?v=X753Z43CDF0",
    "https://www.youtube.com/watch?v=4LbO1DBZxbk",
  ], // optional placeholder
  skills: ["C++", "ROS2", "Linux"],
  description:
    "Completed a hands-on workshop building a follower robot using the ROS2 TurtleSim framework.\n" +
    "Implemented ROS2 publishers/subscribers in C++ to control a turtle that tracked and followed another turtle.",
};

const legoPidCar: Project = {
  name: "LEGO Robot PID Control",
  slug: "lego-pid-robot",
  position: "Team-Based PID Workshop",
  date: "Nov. 2024",
  url: "", // add GitHub or demo link if available
  skills: ["Python", "PID Control"],
  media: [
    "https://www.youtube.com/watch?v=UNVkTI0KZa4",
    "https://www.youtube.com/watch?v=4QL1SsGaUaM",
  ],
  description:
    "Worked on a LEGO-based autonomous robot car programmed in Python to maintain a straight path.\n" +
    "Developed a PID controller that corrected the robot's trajectory whenever it was nudged off-course.\n" +
    "Integrated sensor feedback to fine-tune motion stability and responsiveness in real-time.",
};

const honeyice: Project = {
  name: "Honeyice",
  slug: "honeyice",
  position: "Freelance Software Developer",
  date: "Jan. 2024 - Jul. 2024",
  url: "https://honeyice.world",
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
  skills: ["React", "TailwindCSS", "Typescript"],
  description:
    "Created a typing speed test app tailored for Asian character inputs, featuring minimalistic design and real-time feedback.",
};

export const projects: Project[] = [
  wato,
  rbb,
  ros2TurtleSim,
  legoPidCar,
  budgetbuddy,
  marihacks,
  asiantype,
  sheartak,
  honeyice,
  capshun,
];
