import { faker } from "@faker-js/faker";
import { z } from "zod";

/* ----------------------------------------------------
 * slug()
 * -------------------------------------------------- */
export const slug = () =>
  z
    .string()
    .min(1)
    .superRefine((received, ctx) => {
      const expected = faker.helpers.slugify(received);
      if (received !== expected) {
        ctx.addIssue("String is not slugified");
      }
    })
    .brand("ZodSlugString");

/* ----------------------------------------------------
 * path()
 * -------------------------------------------------- */
export const path = () =>
  z
    .string()
    .min(2)
    .startsWith("/")
    .superRefine((value, ctx) => {
      const parts = value.slice(1).split("/");

      parts.forEach((part, index) => {
        const result = slug().safeParse(part);
        if (!result.success) {
          for (const error of result.error.issues) {
            ctx.addIssue({
              ...error,
              // overwrite the message with context
              message: `Path element ${index}: ${error.message}`,
            });
          }
        }
      });
    })
    .brand("ZodPathString");

/* ----------------------------------------------------
 * parentPath()
 * -------------------------------------------------- */
export const parentPath = () =>
  z
    .string()
    .min(1)
    .startsWith("/")
    .endsWith("/")
    .superRefine((value, ctx) => {
      // "/" is valid
      if (value === "/") return;

      const base = value.slice(0, -1); // remove trailing slash
      const parsed = path().safeParse(base);

      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          ctx.addIssue({...issue});
        }
      }
    })
    .brand("ZodParentPathString");
