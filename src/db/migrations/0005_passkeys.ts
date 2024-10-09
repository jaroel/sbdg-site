import { change } from '../dbScript';

change(async (db) => {
  await db.createTable('passkeys', (t) => ({
    id: t.identity().primaryKey(),
    userId: t.string().unique(),
    username: t.string().unique(),
    ...t.timestamps(),
  }));
});
