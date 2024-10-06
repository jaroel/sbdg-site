import { faker } from "@faker-js/faker";
import {
  type ParseContext,
  ParseStatus,
  ZodIssueCode,
  ZodType,
  type ZodTypeDef,
  addIssueToContext,
  isValid,
  z,
} from "zod";

// ZodPathString
const pathString = z
  .string()
  .min(2)
  .startsWith("/")
  .refine((value) => !value.endsWith("/"));
interface ZodPathStringDef extends ZodTypeDef {
  checks: [];
  typeName: "ZodPathString";
}

export class ZodPathString extends ZodType<string, ZodPathStringDef, string> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    const parsed = pathString._parse(input);
    if (!isValid(parsed)) {
      return parsed;
    }
    const status = new ParseStatus();
    let ctx: undefined | ParseContext = undefined;
    for (const [index, received] of parsed.value.split("/").entries()) {
      const expected = faker.helpers.slugify(received);
      if (received !== expected) {
        ctx = this._getOrReturnCtx(input, ctx);
        addIssueToContext(ctx, {
          code: ZodIssueCode.custom,
          message: `Path element ${index} `,
          params: {
            index,
            recevied: received,
            expected,
          },
        });
        status.dirty();
      }
    }

    return { status: status.value, value: input.data };
  }
}
export const path = () =>
  new ZodPathString({ checks: [], typeName: "ZodPathString" });

// ZodParentPathString
const parentPathString = z.string().min(3).startsWith("/").endsWith("/");
interface ZodParentPathStringDef extends ZodTypeDef {
  checks: [];
  typeName: "ZodParentPathString";
}

export class ZodParentPathString extends ZodType<
  string,
  ZodParentPathStringDef,
  string
> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    const parsed = parentPathString._parse(input);
    if (!isValid(parsed)) {
      return parsed;
    }
    const status = new ParseStatus();
    let ctx: undefined | ParseContext = undefined;
    for (const [index, received] of parsed.value.split("/").entries()) {
      const expected = faker.helpers.slugify(received);
      if (received !== expected) {
        ctx = this._getOrReturnCtx(input, ctx);
        addIssueToContext(ctx, {
          code: ZodIssueCode.custom,
          message: `Path element ${index} `,
          params: {
            index,
            recevied: received,
            expected,
          },
        });
        status.dirty();
      }
    }

    return { status: status.value, value: input.data };
  }
}
export const parentPath = () =>
  new ZodParentPathString({ checks: [], typeName: "ZodParentPathString" });

// ZodSlugString
const slugString = z.string().min(1);
interface ZodSlugStringDef extends ZodTypeDef {
  checks: [];
  typeName: "ZodSlugString";
}

export class ZodSlugString extends ZodType<string, ZodSlugStringDef, string> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    const parsed = slugString._parse(input);
    if (!isValid(parsed)) {
      return parsed;
    }
    const status = new ParseStatus();
    let ctx: undefined | ParseContext = undefined;
    const received = parsed.value;
    const expected = faker.helpers.slugify(received);
    if (received !== expected) {
      ctx = this._getOrReturnCtx(input, ctx);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_literal,
        received,
        expected,
      });
      status.dirty();
    }

    return { status: status.value, value: input.data };
  }
}
export const slug = () =>
  new ZodSlugString({ checks: [], typeName: "ZodSlugString" });
