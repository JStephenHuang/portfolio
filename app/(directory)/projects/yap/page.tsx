import Link from "next/link";

export default function YapPage() {
  return (
    <main className="w-screen min-h-screen relative flex flex-col items-center py-[5rem] px-4">
      <div className="max-w-2xl w-full flex flex-col gap-8">
        <header>
          <h1 className="text-title">YAP</h1>
          <p className="text-[var(--fg-muted)]">YouTube Automation Pipeline</p>
        </header>

        <section>
          <h2 className="text-subtitle">Overview</h2>
          <p>
            Python pipeline with open-source libraries to automate end-to-end narration video
            creation, eliminating the need to manually source content, record narration, edit and
            upload.
          </p>
        </section>

        <section>
          <h2 className="text-subtitle">Results</h2>
          <ul className="list-disc list-inside">
            <li>Saves 10+ hours per video</li>
            <li>Zero cost with open-source tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-subtitle">Links</h2>
          <Link href="https://github.com/JStephenHuang/yap" className="text-link">
            https://github.com/JStephenHuang/yap
          </Link>
        </section>
      </div>
    </main>
  );
}
