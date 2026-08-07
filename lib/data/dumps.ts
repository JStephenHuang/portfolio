import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { type DumpContentBlock, type DumpMetadata } from "@/lib/data";
import { err, isErr, type Result, tryCatch } from "@/lib/error";

const dumpsDirectory = path.join(process.cwd(), "db", "dumps");
const validDumpId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type MarkdownBlock = Extract<DumpContentBlock, { type: "markdown" }>;

export type LoadedDumpContentBlock = (MarkdownBlock & { body: string }) | Exclude<DumpContentBlock, MarkdownBlock>;

export interface DumpLog {
  blocks: LoadedDumpContentBlock[];
  date: string;
}

export const getDumpLogs = cache(async (metadata: DumpMetadata): Promise<Result<DumpLog[]>> => {
  if (!validDumpId.test(metadata.id)) return err(new Error("Invalid dump id."), false);

  const logsResult = await tryCatch(
    Promise.all(
      Object.entries(metadata.body)
        .sort(([firstDate], [secondDate]) => secondDate.localeCompare(firstDate))
        .map(
          async ([date, blocks]): Promise<DumpLog> => ({
            date,
            blocks: await Promise.all(
              blocks.map(async (block): Promise<LoadedDumpContentBlock> => {
                if (block.type !== "markdown") return block;

                return {
                  ...block,
                  body: await readFile(path.join(dumpsDirectory, metadata.id, block.src), "utf8"),
                };
              })
            ),
          })
        )
    )
  );

  if (isErr(logsResult)) return logsResult;

  return logsResult;
});
