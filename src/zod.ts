import { faker } from "@faker-js/faker";
import { ZodIssueCode, ZodType, type ZodTypeDef, z } from "zod";

// ZodSlugString
const slugStringSchema = z
  .string()
  .min(1)
  .superRefine((received, ctx) => {
    const expected = faker.helpers.slugify(received);
    if (received !== expected) {
      ctx.addIssue({
        code: ZodIssueCode.invalid_literal,
        message: "String is not slugified",
        received,
        expected,
      });
    }
  });

interface ZodSlugStringDef extends ZodTypeDef {
  typeName: "ZodSlugString";
}

export class ZodSlugString extends ZodType<string, ZodSlugStringDef, string> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    return slugStringSchema._parse(input);
  }
}

export const slug = () => new ZodSlugString({ typeName: "ZodSlugString" });

// ZodPathString
const pathStringSchema = z
  .string()
  .min(2)
  .startsWith("/")
  .superRefine((value, ctx) =>
    value
      .slice(1)
      .split("/")
      .forEach((received, index) => {
        for (const error of Array.from(
          slugStringSchema.safeParse(received).error?.issues || [],
        )) {
          ctx.addIssue({
            ...error,
            message: `Path element ${index}: ${error.message}`,
          });
        }
      }),
  );

interface ZodPathStringDef extends ZodTypeDef {
  typeName: "ZodPathString";
}

export class ZodPathString extends ZodType<string, ZodPathStringDef, string> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    return pathStringSchema._parse(input);
  }
}

export const path = () => new ZodPathString({ typeName: "ZodPathString" });

// ZodParentPathString
const parentPathStringSchema = z
  .string()
  .min(3)
  .startsWith("/")
  .endsWith("/")
  .superRefine((value, ctx) => {
    for (const error of Array.from(
      pathStringSchema.safeParse(value.slice(0, value.length - 2)).error
        ?.issues || [],
    )) {
      ctx.addIssue(error);
    }
  });

interface ZodParentPathStringDef extends ZodTypeDef {
  typeName: "ZodParentPathString";
}

export class ZodParentPathString extends ZodType<
  string,
  ZodParentPathStringDef,
  string
> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    return parentPathStringSchema._parse(input);
  }
}

export const parentPath = () =>
  new ZodParentPathString({ typeName: "ZodParentPathString" });
