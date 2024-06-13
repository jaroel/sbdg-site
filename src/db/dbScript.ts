import { rakeDb } from "orchid-orm/migrations";
import { BaseTable } from "./baseTable";
import { config } from "./config";

export const change = rakeDb(config.allDatabases, {
  baseTable: BaseTable,
  dbPath: "./db",
  migrationsPath: "./migrations",
  commands: {
    async seed() {
      const { seed } = await import("./seed");
      await seed();
    },
  },
  import: (path) => import(path),
});
