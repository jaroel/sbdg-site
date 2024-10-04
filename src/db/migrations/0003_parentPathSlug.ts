import { change } from '../dbScript';

change(async (db) => {
  await db.changeTable('contentObjects', (t) => ({
    slug: t.add(t.string()),
    path: t.rename('parentPath'),
    ...t.drop(
      t.unique(['parentPath'], 'contentObjects_path_idx')
    ),
  }));
});
