// import type { Insertable, Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "../baseTable";
import { contentObjectBlockSchema } from "../schemas";

export class ContentObjectsTable extends BaseTable {
  readonly table = "contentObjects";
  columns = this.setColumns((t) => ({
    id: t.identity().primaryKey(),
    path: t.string().unique(),
    parentId: t.integer().nullable().foreignKey("contentObjects", "id", {
      name: "FKcontentObjectsParent",
      match: "FULL",
      onUpdate: "RESTRICT",
      onDelete: "CASCADE",
    }),
    ...t.timestamps(),
    object: t.json(contentObjectBlockSchema),
  }));

  relations = {
    parent: this.hasOne(() => ContentObjectsTable, {
      columns: ["id"],
      references: ["parentId"],
    }),
    children: this.hasMany(() => ContentObjectsTable, {
      columns: ["id"],
      references: ["parentId"],
    }),
  };
}

// export type ContentObject = Selectable<ContentObjectsTable>;
// export type ContentObjectNew = Insertable<ContentObjectsTable>;
// export type ContentObjectUpdate = Updatable<ContentObjectsTable>;
// export type ContentObjectQueryable = Queryable<ContentObjectsTable>;
