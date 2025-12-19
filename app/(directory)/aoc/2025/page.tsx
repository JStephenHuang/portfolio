"use client";

import CodeBlockModal from "@/components/custom/CodeBlock";
import Link from "next/link";

const completedDays = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
const allDays = Array.from({ length: 12 }, (_, i) => i + 1);

export default function AoC2025Page() {
  return (
    <main className="w-screen min-h-screen relative flex flex-col items-center py-[5rem]">
      <h1 className="text-title mb-4">Advent of Code 2025</h1>
      <div className="flex flex-col max-w-2xl gap-8 text-body">
        <p className="text-[var(--fg)] text-center">
          Here are my humble solutions to{" "}
          <Link className="text-link" href="https://adventofcode.com/2025">
            AoC 2025
          </Link>
          . Short, but still challenging puzzles to solve. I will be attaching my Obsidian notes as
          well that journals my thought process for each day.
        </p>
        <div className="w-full">
          <ul className="space-y-3">
            {allDays.map((day) => (
              <li key={day} className="flex items-center justify-between gap-4">
                <span className="text-body text-[var(--fg-secondary)]">Day {day}</span>
                {completedDays.has(day) ? (
                  <CodeBlockModal filename={`day${day}.py`} src={`/aoc/2025/day${day}.py`} />
                ) : (
                  <span className="text-ui text-[var(--fg-muted)]">not solved (cuz im bad)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
