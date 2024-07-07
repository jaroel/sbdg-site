import { LargeObjectManager } from "pg-large-object";
import { type HTTPEvent, sendStream, setResponseHeader } from "vinxi/server";

import type { SingleSqlItem } from "orchid-orm";
import { db } from "./db/db";

const beginSql: SingleSqlItem = { text: "BEGIN" };

export async function streamLargeObject(event: HTTPEvent) {
  const largeObjectId = Number.parseInt(
    event.path.replace("/++file++/", ""),
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
