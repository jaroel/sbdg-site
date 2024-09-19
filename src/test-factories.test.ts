import { type FakerFunction, generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";
import { z } from "zod";
import { make } from "./test-factories";

test("ran", () => {
  expect(true).toBeTruthy();
});

test("make override string", () => {
  const schema = z.object({ title: z.string() });
  const value = make(schema, { title: "override" });
  const data = schema.parse(value);
  expect(data.title).toBe("override");
});

test("make takes overrides faker", () => {
  const schema = z.object({ title: z.string() });
  const value = make(schema, { title: faker.lorem.slug(2) });
  const data = schema.parse(value);
  expect(data.title).toContain("-");
});

test("make GenerateMockOptions", () => {
  const schema = z.object({ title: z.string() });
  function mockeryMapper(keyName: string): FakerFunction | undefined {
    const keyToFnMap: Record<string, FakerFunction> = {
      title: () => "override",
    };
    return keyName && keyName in keyToFnMap
      ? keyToFnMap[keyName as never]
      : undefined;
  }
  const value = make(schema, undefined, { mockeryMapper });
  const data = schema.parse(value);
  expect(data.title).toBe("override");
});

test("generateMock GenerateMockOptions", () => {
  const schema = z.object({ title: z.string() });
  function mockeryMapper(keyName: string): FakerFunction | undefined {
    const keyToFnMap: Record<string, FakerFunction> = {
      title: () => "override",
    };
    return keyName && keyName in keyToFnMap
      ? keyToFnMap[keyName as never]
      : undefined;
  }
  const value = generateMock(schema, { mockeryMapper });
  const data = schema.parse(value);
  expect(data.title).toBe("override");
});

test("make overrides + GenerateMockOptions", () => {
  const schema = z.object({
    title: z.string(),
    otherField: z.string(),
    anotherField: z.string(),
  });
  function mockeryMapper(keyName: string): FakerFunction | undefined {
    const keyToFnMap: Record<string, FakerFunction> = {
      title: () => "override",
    };
    return keyName && keyName in keyToFnMap
      ? keyToFnMap[keyName as never]
      : undefined;
  }
  const value = make(
    schema,
    { otherField: "override2" },
    {
      mockeryMapper,
      stringMap: {
        anotherField: () => "override3",
      },
    },
  );
  const data = schema.parse(value);
  expect(data.title).toBe("override");
  expect(data.otherField).toBe("override2");
  expect(data.anotherField).toBe("override3");
});

test("make overrides partially", () => {
  const schema = z.object({
    object1: z.object({
      object2: z.object({ title3a: z.string(), title3b: z.string() }),
      title2a: z.string(),
      title2b: z.string(),
    }),
    title1a: z.string(),
    title1b: z.string(),
  });

  const overrides = {
    object1: {
      object2: { title3b: "override title3b" },
      title2b: "override title2b",
    },
    title1a: () => "override title1a",
    title1b: "override title1b",
  };
  const value = make(schema, overrides);
  const data = schema.parse(value);
  expect(data.title1b).toBe("override title1b");
  expect(data.object1.title2b).toBe("override title2b");
  expect(data.object1.object2.title3b).toBe("override title3b");
});
