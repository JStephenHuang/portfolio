import Image from "next/image";
import Link from "next/link";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Tooltip from "@/components/custom/Tooltip";

export default function GarmentSystemPage() {
  return (
    <main className="w-screen min-h-screen relative flex flex-col items-center py-[5rem] px-4">
      <div className="max-w-2xl w-full flex flex-col gap-8">
        <header className="flex items-center gap-4">
          <Image
            src="/gs/logo.png"
            alt="Garment System"
            width={100}
            height={100}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-title">Garment System</h1>
            <p>Software Engineer</p>
            <p className="text-[var(--fg-muted)]">Feb 2025 — Present</p>
          </div>
        </header>

        <section>
          <h2 className="text-subtitle flex items-center gap-2">
            Overview
            <Tooltip content="* = what i worked on" position="right">
              <InfoCircledIcon className="w-4 h-4 cursor-help" />
            </Tooltip>
          </h2>
          Digital garment suite:
          <ul className="list-disc list-inside">
            <li>Marketing website</li>
            <li>Manufacturer dashboard *</li>
            <li>Blanks store *</li>
          </ul>
        </section>

        <section>
          <h2 className="text-subtitle">Work</h2>
          TODO
        </section>
        <section>
          <h2 className="text-subtitle">Links</h2>
          <div className="flex gap-4">
            <Link href="https://garmentsystem.com" className="text-link">
              garmentsystem.com
            </Link>
            <Link href="https://blanks.garmentsystem.com" className="text-link">
              blanks.garmentsystem.com
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
