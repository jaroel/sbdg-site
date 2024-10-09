import { orchidORM } from "orchid-orm";
import { config } from "./config";
import { ContentObjectsTable } from "./tables/contentObjects.table";
import { PasskeysTable } from "./tables/passkeys.table";
import { UsersTable } from "./tables/users.table";

export const db = orchidORM(
  {
    ...config.database,
    connectRetry: true,
    log: true,
  },
  {
    contentObjects: ContentObjectsTable,
    users: UsersTable,
    passkeys: PasskeysTable,
  },
);
