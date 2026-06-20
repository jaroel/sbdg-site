import { orchidORM } from "orchid-orm/node-postgres";
import { config } from "./config";
import { ContentObjectsTable } from "./tables/contentObjects.table";

export const db = orchidORM(
  {
    ...config.database,
    connectRetry: true,
    log: false,
  },
  {
    contentObjects: ContentObjectsTable,
  },
);
