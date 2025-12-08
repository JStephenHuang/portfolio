import Link from "next/link";

export default function GarmentSystemPage() {
  return (
    <main className="w-screen min-h-screen relative flex flex-col items-center justify-center text-center">
      <Link href="https://garmentsystem.com" className="text-blue-600 hover:underline">
        https://garmentsystem.com
      </Link>
      <Link href="https://blanks.garmentsystem.com" className="text-blue-600 hover:underline">
        https://blanks.garmentsystem.com
      </Link>
    </main>
  );
}
