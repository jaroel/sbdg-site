import { createBaseTable } from "orchid-orm";
import { zodSchemaConfig } from "orchid-orm-schema-to-zod";

export const BaseTable = createBaseTable({
  schemaConfig: zodSchemaConfig,

  columnTypes: (t) => ({
    ...t,
    timestamp: (precision?: number) => t.timestamp(precision).asDate(),
  }),
});
