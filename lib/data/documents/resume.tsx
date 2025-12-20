import Document from "@/components/custom/Document";

interface Props {
  x?: number;
  y?: number;
}

const Resume = ({ x, y }: Props) => (
  <Document.Media
    title="resume.pdf"
    src="/resume/resume.pdf"
    icon="/resume/icon.png"
    initialX={x}
    initialY={y}
  />
);

export default Resume;
