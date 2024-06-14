import { change } from "../dbScript";

change(async (db) => {
  await db.createTable("contentObjects", (t) => ({
    id: t.identity().primaryKey(),
    path: t.string().unique(),
    parentId: t.integer().nullable(),
    object: t.json(),
    ...t.timestamps(),
  }));

  // await db.changeTable("contentObjects", (t) => ({
  //   ...t.add(t.foreignKey(["parentId"], "contentObjects", ["id"])),
  // }));
});
