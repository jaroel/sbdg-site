// import type { Insertable, Queryable, Updatable } from "orchid-orm";
import { BaseTable } from "../baseTable";

export class UsersTable extends BaseTable {
  readonly table = "users";
  columns = this.setColumns((t) => ({
    id: t.identity().primaryKey(),
    username: t.string().unique(),
    password: t.string(), // Make this of [hash of admin];[salt];[hashtype]
    ...t.timestamps(),
  }));
}
