// import type { Insertable, Queryable, Updatable } from "orchid-orm";
import { BaseTable } from "../baseTable";

export class PasskeysTable extends BaseTable {
  readonly table = "passkeys";
  columns = this.setColumns((t) => ({
    id: t.identity().primaryKey(),
    userId: t.string().unique(),
    username: t.string().unique(),
    ...t.timestamps(),
  }));
}

export const inputSchema = PasskeysTable.inputSchema();
export const passkeySchema = PasskeysTable.inputSchema().pick({
  userId: true,
  username: true,
});
