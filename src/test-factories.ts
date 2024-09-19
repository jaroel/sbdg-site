import { type GenerateMockOptions, generateMock } from "@anatine/zod-mock";
import type { z } from "zod";
import type { Overrides, SomeZodObject } from "./types";

export function make<T extends SomeZodObject>(
  schema: T,
  overrides?: Overrides<T>,
  options?: GenerateMockOptions,
) {
  const replacers: Record<string, any> = {};
  const stringMap: GenerateMockOptions["stringMap"] = {};

  for (const key in overrides) {
    const value = overrides[key];
    if (!value) {
      continue;
    }
    if (typeof value === "string") {
      stringMap[key] = () => value;
    } else if (typeof value === "object") {
      const subSchema = schema.shape[key];
      if (subSchema) {
        const subData = make(subSchema, value);
        if (subData) {
          replacers[key] = subData;
        }
      }
    } else {
      stringMap[key] = value;
    }
  }
  const mergedOptions = {
    ...options,
    stringMap: { ...options?.stringMap, ...stringMap },
  };
  const mockData = generateMock<typeof schema>(schema, mergedOptions);

  return schema.parse({ ...mockData, ...replacers }) as z.infer<T>;
}
