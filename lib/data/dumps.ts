import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { err, isErr, ok, type Result, tryCatch } from "@/lib/error";

const dumpsDirectory = path.join(process.cwd(), "data", "dumps");
const validDumpId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datedEntryPattern = /^(\d{4}-\d{2}-\d{2})\.md$/;

export interface DumpEntry {
  body: string;
  date: string;
}

const isFileNotFoundError = (error: Error): boolean =>
  "code" in error && (error as NodeJS.ErrnoException).code === "ENOENT";

const getEntryDate = (filename: string): string | null => {
  const date = filename.match(datedEntryPattern)?.[1];

  if (!date) return null;

  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) return null;

  return date;
};

export const getDumpBody = cache(async (id: string): Promise<Result<string | null>> => {
  if (!validDumpId.test(id)) return err(new Error("Invalid dump id."), false);

  const result = await tryCatch(readFile(path.join(dumpsDirectory, id, "body.md"), "utf8"));

  if (isErr(result)) {
    if (isFileNotFoundError(result.error)) return ok(null);

    return result;
  }

  return result;
});

export const getDumpEntries = cache(async (id: string): Promise<Result<DumpEntry[]>> => {
  if (!validDumpId.test(id)) return err(new Error("Invalid dump id."), false);

  const directory = path.join(dumpsDirectory, id);
  const directoryResult = await tryCatch(readdir(directory, { withFileTypes: true }));

  if (isErr(directoryResult)) {
    if (isFileNotFoundError(directoryResult.error)) return ok([]);

    return directoryResult;
  }

  const entryFiles = directoryResult.data
    .filter((entry) => entry.isFile() && getEntryDate(entry.name))
    .sort((first, second) => second.name.localeCompare(first.name));
  const entriesResult = await tryCatch(
    Promise.all(
      entryFiles.map(
        async (entry): Promise<DumpEntry> => ({
          body: await readFile(path.join(directory, entry.name), "utf8"),
          date: getEntryDate(entry.name) as string,
        })
      )
    )
  );

  if (isErr(entriesResult)) return entriesResult;

  return entriesResult;
});
