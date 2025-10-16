import Link from "next/link";

const ButtonLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="text-secondary">
      {children}
    </Link>
  );
};

export default ButtonLink;
