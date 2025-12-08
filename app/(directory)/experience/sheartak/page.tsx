import Link from "next/link";

export default function SheartakPage() {
  return (
    <main className="w-screen min-h-screen relative flex flex-col items-center justify-center text-center">
      <Link href="https://www.sheartak.com" className="text-blue-600 hover:underline">
        https://sheartak.com
      </Link>
    </main>
  );
}
