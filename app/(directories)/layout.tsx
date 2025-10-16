import { Nav } from "@/components/Nav/index";

export default function DirectoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
