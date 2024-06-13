import { change } from "../dbScript";

change(async (db) => {
  await db.changeTable("contentObjects", (t) => ({
    ...t.add(
      t.foreignKey(["parentId"], "contentObjects", ["id"], {
        name: "FKcontentObjectsParent",
        match: "FULL",
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      }),
    ),
  }));
});
