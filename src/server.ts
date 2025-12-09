"use server";
import { Readable } from "node:stream";
import { redirect, reload } from "@solidjs/router";
import { createError } from "vinxi/http";
import { textBlockFactory } from "./components/blocks/factories";
import { db } from "./db/db";
import {
  contentFieldnames,
  createSchema,
  outputSchema,
  updateSchema,
} from "./db/tables/contentObjects.table";
import { createLargeObjectFromStream } from "./largeobject";
import {
  type ContentViews,
  contentObjectAddFormSchema,
  contentObjectDeleteFormSchema,
  contentObjectEditFormSchema,
  contentObjectEditRootFormSchema,
  contentObjectSchema,
  fileAddSchema,
} from "./schemas";
import { toRecord } from "./zod-web-api";
import * as z from "zod";

export const getContentObjectBySubPath = (subpath: string) =>
  fetchContentObject(`/${subpath}`);

const routePrefixMapping: Record<ContentViews, string> = {
  default: "",
  add: "/add",
  edit: "/edit",
  delete: "/delete",
};

export const saveContentObject = async (formData: FormData) => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  const result = contentObjectEditFormSchema.safeParse(toRecord(formData));
  if (result.error) {
    return result.error.format();
  }

  const data = result.data;
  const { currentPath } = await db.contentObjects
    .find(data.id)
    .select({
      currentPath: "path",
    })
    .take();
  const newPath = await db.contentObjects
    .find(data.id)
    .update(updateSchema.parse(data))
    .get("path");
  if (data.routePrefix === "edit" && currentPath === newPath) {
    throw reload();
  }
  throw redirect(routePrefixMapping[data.routePrefix] + newPath);
};

export const saveContentObjectRoot = async (formData: FormData) => {
  const result = contentObjectEditRootFormSchema.safeParse(toRecord(formData));
  if (result.error) {
    return result.error.format();
  }

  const data = result.data;
  const newPath = await db.contentObjects
    .find(data.id)
    .update({ ...data, parentPath: "/", slug: "" })
    .get("path");
  if (data.routePrefix === "edit") {
    throw reload();
  }
  throw redirect(routePrefixMapping[data.routePrefix] + newPath);
};

export const addContentObject = async (formData: FormData) => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 100));
  const result = contentObjectAddFormSchema.safeParse(toRecord(formData));
  if (result.error) {
    return result.error.format();
  }

  const data = result.data;
  const parentId = data.parentId;
  const parentPath = await db.contentObjects
    .find(parentId)
    .get("contentObjects.path");
  const newPath = await db.contentObjects
    .create(
      createSchema.parse({ ...data, parentId: data.parentId, parentPath }),
    )
    .get("parentPath");
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
  const result = fileAddSchema.safeParse(toRecord(formData));
  if (result.error) {
    return result.error.format();
  }

  const data = result.data;
  await createLargeObjectFromStream(
    readableStreamToNodeReadable(data.someFile.stream()),
  );
  throw reload();
};

export const fetchDescendants = async (id: number) =>
  db.contentObjects
    .as("paths")
    .select("id", "path")
    .join(
      db.$qb
        .withRecursive(
          "children",
          db.contentObjects
            .select("id", "parentPath", "parentId", "object")
            .find(id),
          (q) =>
            q
              .from(db.contentObjects)
              .select("id", "parentPath", "parentId", "object")
              .join("children", "children.id", "parentId"),
        )
        .from("children")
        .where({
          id: {
            not: id,
          },
        }),
      "id",
      "paths.id",
    )
    .select(...contentFieldnames.options, "path")
    .order({ path: "ASC" })
    .all();

export const deleteContentObject = async (formData: FormData) => {
  const result = contentObjectDeleteFormSchema.safeParse(toRecord(formData));
  if (result.error) {
    return result.error.format();
  }

  const data = result.data;
  const parentId = await db.contentObjects
    .find(data.id)
    .delete()
    .get("parentId");

  const parentPath = parentId
    ? await db.contentObjects.find(parentId).get("parentPath")
    : "/";
  throw redirect(routePrefixMapping[data.routePrefix] + parentPath);
};

export type ContentObject = Awaited<ReturnType<typeof fetchContentObject>>;

export const fetchContentObject = async (path: string) => {
  const index = path.lastIndexOf("/");
  const slug = path.slice(index + 1);
  const parentPath = path.slice(0, index + 1);

  if (slug === "service-worker.js") {
    throw createError({ statusMessage: "Not Found", statusCode: 404 });
  }

  const content = await db.contentObjects
    .as("outer")
    .where({ slug, parentPath })
    .select(...contentFieldnames.options, "path", {
      children: (q) => q.children.select(...contentFieldnames.options, "path"),
    })
    .select("path")
    .takeOptional();

  if (content === undefined) {
    return contentObjectSchema.parse({
      content: {
        id: -1,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        parentPath: parentPath,
        slug: slug,
        path: path,
        object: {
          type: "page",
          status_code: 404,
          title: "Page not found",
          blocks: [textBlockFactory("Sorry :(")],
        },
      },
      parents: [],
      children: [],
      errors: undefined,
    });
  }

  const parents = await db.contentObjects
    .as("paths")
    .select("id", "path")
    .join(
      db.$qb
        .withRecursive(
          "parents",
          db.contentObjects
            .select(...contentFieldnames.options)
            .find(content.id),
          (q) =>
            q
              .from(db.contentObjects)
              .select(...contentFieldnames.options)
              .join("parents", "parents.parentId", "id"),
        )
        .from("parents")
        .where({
          id: {
            not: content.id,
          },
        }),
      "id",
      "paths.id",
    )
    .select(...contentFieldnames.options, "path")
    .order({ path: "ASC" })
    .all();

  const errors = outputSchema.safeParse(content).error;

  const value = {
    content,
    parents,
    children: content.children,
    errors: errors ? z.treeifyError(errors) : null,
  };
  return value;
};
