import { createBaseTable } from "orchid-orm";
// import { zodSchemaConfig } from 'orchid-orm-schema-to-zod';
import {valibotSchemaConfig} from 'orchid-orm-valibot';

export const BaseTable = createBaseTable({
  schemaConfig: valibotSchemaConfig,

  columnTypes: (t) => ({
    ...t,
    timestamp: (precision?: number) => t.timestamp(precision).asDate(),
  }),
});

export const { sql } = BaseTable;
