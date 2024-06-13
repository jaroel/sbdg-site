import { orchidORM } from "orchid-orm";
import { config } from "./config";
import { ContentObjectsTable } from "./tables/contentObjects.table";

export const db = orchidORM(
  {
    ...config.database,
    connectRetry: true,
    log: true,
    autoPreparedStatements: true,
  },
  {
    contentObjects: ContentObjectsTable,
  },
);
