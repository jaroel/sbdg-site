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
    "origin": "string",
    "code": "too_small",
    "minimum": 1,
    "inclusive": true,
    "path": [],
    "message": "Too small: expected string to have >=1 characters"
  },
  {
    "origin": "string",
    "code": "invalid_format",
    "format": "starts_with",
    "prefix": "/",
    "path": [],
    "message": "Invalid string: must start with \\"/\\""
  },
  {
    "origin": "string",
    "code": "invalid_format",
    "format": "ends_with",
    "suffix": "/",
    "path": [],
    "message": "Invalid string: must end with \\"/\\""
  },
  {
    "origin": "string",
    "code": "too_small",
    "minimum": 2,
    "inclusive": true,
    "path": [],
    "message": "Too small: expected string to have >=2 characters"
  },
  {
    "origin": "string",
    "code": "invalid_format",
    "format": "starts_with",
    "prefix": "/",
    "path": [],
    "message": "Invalid string: must start with \\"/\\""
  },
  {
    "origin": "string",
    "code": "too_small",
    "minimum": 1,
    "inclusive": true,
    "path": [],
    "message": "Path element 0: Too small: expected string to have >=1 characters"
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
    "origin": "string",
    "code": "too_small",
    "minimum": 1,
    "inclusive": true,
    "path": [],
    "message": "Path element 1: Too small: expected string to have >=1 characters"
  }
]]`);
});
