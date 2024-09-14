"use server";
import { Readable } from "node:stream";
import { redirect, reload } from "@solidjs/router";
import { NOTFOUND404PAGE } from "./components/blocks/notfound";
import { db } from "./db/db";
import {
  type Content,
  contentFieldnames,
  outputSchema,
  updateSchema,
} from "./db/tables/contentObjects.table";
import { createLargeObjectFromStream } from "./largeobject";
import {
  contentObjectAddFormSchema,
  contentObjectDeleteFormSchema,
  contentObjectEditFormSchema,
  contentObjectEditRootFormSchema,
  fileAddSchema,
} from "./schemas";
import type { Errors } from "./types";
import { safeParseFormDataAsync } from "./zod-web-api";

export const getContentObjectBySubPath = (subpath: string) =>
  fetchContentObject(`/${subpath}`);

const routePrefixMapping = {
  default: "",
  add: "/add",
  edit: "/edit",
  delete: "/delete",
};

export const saveContentObject = async (formData: FormData) => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  const result = await safeParseFormDataAsync(
    formData,
    contentObjectEditFormSchema,
  );
  if (result.error) {
    const errors = result.error.format();
    throw new Error("error", { cause: errors });
  }

  const resultDb = updateSchema.safeParse(result.data);
  if (resultDb.error) {
    const errors = resultDb.error.format();
    throw new Error("error", { cause: errors });
  }

  const data = result.data;
  const parentPath = await db.contentObjects.find(data.id).parent.get("path");
  const path = `${parentPath === "/" ? "" : parentPath}/${data.slug}`;
  const newPath = await db.contentObjects
    .find(data.id)
    .update({ ...data, path })
    .get("path");
  if (data.routePrefix === "edit") {
    throw reload();
  }
  throw redirect(routePrefixMapping[data.routePrefix] + newPath);
};

export const saveContentObjectRoot = async (formData: FormData) => {
  const result = await safeParseFormDataAsync(
    formData,
    contentObjectEditRootFormSchema,
  );
  if (result.error) {
    const errors = result.error.format();
    throw new Error("error", { cause: errors });
  }

  const data = result.data;
  const newPath = await db.contentObjects
    .find(data.id)
    .update({ ...data, path: "/" })
    .get("path");
  if (data.routePrefix === "edit") {
    throw reload();
  }
  throw redirect(routePrefixMapping[data.routePrefix] + newPath);
};

export const addContentObject = async (formData: FormData) => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 100));
  const result = await safeParseFormDataAsync(
    formData,
    contentObjectAddFormSchema,
  );
  if (result.error) {
    const errors = result.error.format();
    throw new Error("error", { cause: errors });
  }

  const data = result.data;
  const parentId = data.parentId;
  const parentPath = await db.contentObjects.find(parentId).get("path");
  const path = parentId
    ? `${parentPath}/${data.slug}`.replaceAll("//", "/")
    : "/";
  const newPath = await db.contentObjects
    .create({ ...data, parentId: data.parentId, path })
    .get("path");
  throw redirect(routePrefixMapping[data.routePrefix] + newPath);
};

function readableStreamToNodeReadable(readableStream: ReadableStream) {
  const reader = readableStream.getReader();

  return new Readable({
    async read(size) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(Buffer.from(value));
        }
      } catch (err) {
        if (err instanceof Error) {
          this.destroy(err);
        }
        throw err;
      }
    },
  });
}

export const addFile = async (formData: FormData) => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  const result = await safeParseFormDataAsync(formData, fileAddSchema);
  if (result.error) {
    const errors = result.error.format();
    throw new Error("error", { cause: errors });
  }

  const data = result.data;
  await createLargeObjectFromStream(
    readableStreamToNodeReadable(data.someFile.stream()),
  );
  throw reload();
};

export const fetchDescendants = async (id: number) =>
  db.$queryBuilder
    .withRecursive(
      "parents",
      db.contentObjects.select("id", "path", "parentId", "object").find(id),
      (q) =>
        q
          .from(db.contentObjects)
          .select("id", "path", "parentId", "object")
          .join("parents", "parents.id", "parentId"),
    )
    .from("parents")
    .where({
      id: {
        not: id,
      },
    })
    .order({ path: "ASC" });

export const deleteContentObject = async (formData: FormData) => {
  const result = await safeParseFormDataAsync(
    formData,
    contentObjectDeleteFormSchema,
  );

  if (result.error) {
    const errors = result.error.format();
    throw new Error("error", { cause: errors });
  }

  const data = result.data;
  const parentId = await db.contentObjects
    .find(data.id)
    .delete()
    .get("parentId");

  const parentPath = parentId
    ? await db.contentObjects.find(parentId).get("path")
    : "/";
  throw redirect(routePrefixMapping[data.routePrefix] + parentPath);
};

export type ContentObject = Content & {
  children: Content[];
  parents: Content[];
  errors?: Errors;
};

export const fetchContentObject = async (
  path: string,
): Promise<ContentObject | undefined> => {
  const result = await db.contentObjects
    .as("outer")
    .where({ path })
    .select(...contentFieldnames, {
      children: (q) => q.children,
    })
    .takeOptional();

  if (result === undefined)
    return {
      id: -1,
      parentId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      path: "/",
      object: NOTFOUND404PAGE,
      parents: [],
      children: [],
    };

  const parents = await db.$queryBuilder
    .withRecursive(
      "parents",
      db.contentObjects.select(...contentFieldnames).find(result.id),
      (q) =>
        q
          .from(db.contentObjects)
          .select(...contentFieldnames)
          .join("parents", "parents.parentId", "id"),
    )
    .from("parents")
    .where({
      id: {
        not: result.id,
      },
    })
    .order({ path: "ASC" })
    .all();

  const resultDb = outputSchema.safeParse(result);
  const errors = (resultDb.error?.format() || { _errors: [] }) as Errors;
  return { ...result, parents, errors };
};
