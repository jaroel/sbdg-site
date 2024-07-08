"use server";
import { LargeObjectManager, type ReadStream } from "pg-large-object";
import { type HTTPEvent, sendStream, setResponseHeader } from "vinxi/server";

import { createReadStream } from "node:fs";
import type { SingleSqlItem } from "orchid-orm";
import { db } from "./db/db";

const beginSql: SingleSqlItem = { text: "BEGIN" };

export async function streamLargeObject(event: HTTPEvent) {
  const largeObjectId = Number.parseInt(
    event.path.replace("/++file++/id:", ""),
    10,
  );

  return await db.$adapter.transaction(beginSql, async (adapter) => {
    const loManager = new LargeObjectManager({
      pg: adapter.client,
    });
    const [size, stream] = await loManager.openAndReadableStreamAsync(
      largeObjectId === 1 ? 28397 : largeObjectId,
    );
    setResponseHeader(event, "content-length", size);
    await sendStream(event, stream);
  });
}

export async function createLargeObjectFromStream(fileStream: ReadStream) {
  const bufferSize = 16384;

  return await db.$adapter.transaction(beginSql, async (adapter) => {
    const loManager = new LargeObjectManager({
      pg: adapter.client,
    });

    return loManager
      .createAndWritableStreamAsync(bufferSize)
      .then(async ([oid, stream]) => {
        // The server has generated an oid
        console.log("Creating a large object with the oid", oid);

        fileStream.pipe(stream);
        await new Promise((resolve, reject) => {
          stream.on("finish", resolve);
          stream.on("error", reject);
        });
        return oid;
      });
  });
}

export async function createLargeObject() {
  const bufferSize = 16384;

  return await db.$adapter.transaction(beginSql, async (adapter) => {
    const loManager = new LargeObjectManager({
      pg: adapter.client,
    });

    return loManager
      .createAndWritableStreamAsync(bufferSize)
      .then(async ([oid, stream]) => {
        // The server has generated an oid
        console.log("Creating a large object with the oid", oid);

        const fileStream = createReadStream("./data/demo.jpeg");
        fileStream.pipe(stream);

        await new Promise((resolve, reject) => {
          stream.on("finish", resolve);
          stream.on("error", reject);
        });
        return oid;
      });
  });
}

export async function listObjects() {
  // pg_largeobject_metadata
  console.log("hier");
  const results = await db.$query<{
    oid: number;
  }>`select distinct oid from pg_largeobject_metadata`;

  return results.rows.map((row) => row.oid);
}
