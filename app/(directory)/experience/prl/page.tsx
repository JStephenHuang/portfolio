import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@/components/custom/Tooltip";

export default function ParametricResearchLabsPage() {
  return (
    <main className="w-screen min-h-screen relative flex flex-col items-center py-[5rem] px-4">
      <div className="max-w-2xl w-full flex flex-col gap-8">
        <header className="flex items-center gap-4">
          <Image
            src="/prl/logo.png"
            alt="Parametric Research Labs"
            width={100}
            height={100}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-title">Parametric Research Labs</h1>
            <p>Software Engineer</p>
            <p className="text-[var(--fg-muted)]">Sep 2025 — Dec 2025</p>
          </div>
        </header>

        <section>
          <h2 className="text-subtitle flex items-center gap-2">
            Overview
            <Tooltip content="* = what i worked on" position="right">
              <InfoCircledIcon className="w-4 h-4 cursor-help" />
            </Tooltip>
          </h2>
          AI agents for high volume clinics:
          <ul className="list-disc list-inside">
            <li>Outbound/Inbound voice agent *</li>
            <li>Outbound/Inbound messaging agent *</li>
            <li>Testing suite for Voice/SMS agents *</li>
          </ul>
        </section>

        <section>
          <h2 className="text-subtitle">Work</h2>
          TODO
        </section>

        <section>
          <h2 className="text-subtitle">Links</h2>
          <div className="flex gap-4">
            <Link href="https://www.helloblair.com" className="text-link">
              https://www.helloblair.com
            </Link>
            <Link href="https://parametricresearchlabs.com" className="text-link">
              https://parametricresearchlabs.com
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
