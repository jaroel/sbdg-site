import { type GenerateMockOptions, generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
import type { ZodObject, ZodReadonly, z } from "zod";
import type { Overrides } from "./types";

export const pathFaker = () => `/${faker.lorem.slug().split("-").join("/")}`;
export const parentPathFaker = () => `${pathFaker()}/`;
export const slugFaker = () => faker.lorem.slug();

export function make<T extends ZodObject>(
  schema: T,
  overrides?: Overrides<T>,
  options?: GenerateMockOptions,
) {
  const replacers: Overrides<T> = {};
  const stringMap: GenerateMockOptions["stringMap"] = {};

  for (const key in overrides) {
    const value = overrides[key];
    if (!value) {
      continue;
    }
    if (typeof value === "string") {
      replacers[key] = value;
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

  const backupMocks = {
    ZodReadonly: (zodRef: ZodObject, options?: GenerateMockOptions) => {
      const zodRef_ = zodRef as unknown as ZodReadonly<T>;
      return generateMock(zodRef_.unwrap(), options);
    },
    ZodParentPathString: parentPathFaker,
    ZodPathString: pathFaker,
    ZodSlugString: slugFaker,
  };
  const mergedOptions = {
    ...options,
    stringMap: { ...options?.stringMap, ...stringMap },
    backupMocks: { ...options?.backupMocks, ...backupMocks },
    throwOnUnknownType: true,
  };

  const mockData = generateMock<typeof schema>(schema, mergedOptions);
  return schema.parse({ ...mockData, ...replacers }) as z.infer<T>;
}
