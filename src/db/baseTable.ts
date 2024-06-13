import { createBaseTable } from "orchid-orm";
import { zodSchemaConfig } from "orchid-orm-schema-to-zod";

export const BaseTable = createBaseTable({
  schemaConfig: zodSchemaConfig,

  columnTypes: (t) => ({
    ...t,
    text: (min = 1, max = Number.POSITIVE_INFINITY) => t.text(min, max),
    timestamp: (precision?: number) => t.timestamp(precision).asDate(),
  }),
});

// export const { sql } = BaseTable;
