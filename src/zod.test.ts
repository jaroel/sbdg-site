import { expect, test } from "vitest";
import { ZodError } from "zod";
import { path, parentPath } from "./zod";

test("parentPath", () => {
  const field = parentPath();
  expect(field.parse("/")).toBe("/");
  expect(field.parse("/a/")).toBe("/a/");
  expect(field.parse("/a/b/c/d/")).toBe("/a/b/c/d/");

  expect(() => field.parse("")).toThrowErrorMatchingInlineSnapshot(`[ZodError: [
  {
    "code": "too_small",
    "minimum": 1,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "String must contain at least 1 character(s)",
    "path": []
  },
  {
    "code": "invalid_string",
    "validation": {
      "startsWith": "/"
    },
    "message": "Invalid input: must start with \\"/\\"",
    "path": []
  },
  {
    "code": "invalid_string",
    "validation": {
      "endsWith": "/"
    },
    "message": "Invalid input: must end with \\"/\\"",
    "path": []
  },
  {
    "code": "too_small",
    "minimum": 2,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "String must contain at least 2 character(s)",
    "path": []
  },
  {
    "code": "invalid_string",
    "validation": {
      "startsWith": "/"
    },
    "message": "Invalid input: must start with \\"/\\"",
    "path": []
  },
  {
    "code": "too_small",
    "minimum": 1,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "Path element 0: String must contain at least 1 character(s)",
    "path": []
  }
]]`);
});

test("path", () => {
  const field = path();
  expect(field.parse("/a")).toBe("/a");
  expect(field.parse("/a/b/c/d")).toBe("/a/b/c/d");

  expect(() =>
    field.parse("/a/"),
  ).toThrowErrorMatchingInlineSnapshot(`[ZodError: [
  {
    "code": "too_small",
    "minimum": 1,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "Path element 1: String must contain at least 1 character(s)",
    "path": []
  }
]]`);
});
