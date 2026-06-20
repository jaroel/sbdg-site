import { fake, seed, setFaker } from "zod-schema-faker/v4";
import { faker } from "@faker-js/faker";
import type { ZodObject, z } from "zod";
import type { Overrides } from "./types";

setFaker(faker);

export const pathFaker = () => `/${faker.lorem.slug().split("-").join("/")}`;
export const parentPathFaker = () => `${pathFaker()}/`;
export const slugFaker = () => faker.lorem.slug();

export function make<T extends ZodObject>(
  schema: T,
  overrides?: Overrides<T>,
  options?: { seed?: number },
) {
  const replacers: Record<string, unknown> = {};

  for (const key in overrides) {
    const value = overrides[key];
    if (!value) continue;
    if (typeof value === "string") {
      replacers[key] = value;
    } else if (typeof value === "function") {
      replacers[key] = value();
    } else if (typeof value === "object") {
      const subSchema = schema.shape[key];
      if (subSchema) {
        const subData = make(subSchema as unknown as ZodObject, value as never);
        if (subData) replacers[key] = subData;
      }
    }
  }

  if (options?.seed != null) seed(options.seed);

  const mockData = fake(schema);
  const result = schema.safeParse({ ...mockData, ...replacers });
  if (result.success) return result.data as z.infer<T>;
  return { ...mockData, ...replacers } as z.infer<T>;
}
