import { change } from '../dbScript';

change(async (db) => {
  await db.createTable('users', (t) => ({
    id: t.identity().primaryKey(),
    username: t.string().unique(),
    password: t.string(),
    ...t.timestamps(),
  }));
});
