// import type { Insertable, Queryable, Updatable } from "orchid-orm";
import type { Selectable } from "orchid-orm";
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
    parent: this.belongsTo(() => ContentObjectsTable, {
      columns: ["parentId"],
      references: ["id"],
    }),
    children: this.hasMany(() => ContentObjectsTable, {
      columns: ["id"],
      references: ["parentId"],
    }),
  };
}

export const contentFieldnames = [
  "id",
  "path",
  "parentId",
  "createdAt",
  "updatedAt",
  "object",
] as const;
export type Content = Pick<
  Selectable<ContentObjectsTable>,
  (typeof contentFieldnames)[number]
>;
export const contentMetaFieldnames = [
  "id",
  "path",
  "parentId",
  "createdAt",
  "updatedAt",
] as const;
export type ContentMetadata = Pick<
  Content,
  (typeof contentMetaFieldnames)[number]
>;
export const contentObjectFieldnames = ["object"] as const;
export type ContentObject = Pick<
  Content,
  (typeof contentObjectFieldnames)[number]
>;

// export type ContentObjectRowNew = Insertable<ContentObjectsTable>;
// export type ContentObjectRowUpdate = Updatable<ContentObjectsTable>;
// export type ContentObjectRowQueryable = Queryable<ContentObjectsTable>;

export const updateSchema = ContentObjectsTable.updateSchema();
export const outputSchema = ContentObjectsTable.outputSchema();
