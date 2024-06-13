// import { change } from "../dbScript";

// change(async (db) => {
//   await db.createTable("contentObjects", (t) => ({
//     id: t.identity().primaryKey(),
//     path: t.string().unique(),
//     parentId: t.integer(),
//     ...t.timestamps(),
//     block: t.json(),
//   }));

//   await db.addForeignKey(
//     "contentObjects",
//     ["parentId"],
//     "contentObjects",
//     ["id"],
//     {
//       name: "FKcontentObjectsParent",
//       match: "FULL",
//       onUpdate: "RESTRICT",
//       onDelete: "CASCADE",
//     },
//   );
// });
