"use server";
import { Readable } from "node:stream";
import { cache, redirect } from "@solidjs/router";
import * as z from "zod";
import { NOTFOUND404PAGE } from "./components/blocks/notfound";
import { db } from "./db/db";
import {
  type Content,
  contentFieldnames,
} from "./db/tables/contentObjects.table";
import { createLargeObjectFromStream } from "./largeobject";
import {
  contentObjectAddSchema,
  contentObjectDeleteSchema,
  contentObjectEditRootSchema,
  contentObjectEditSchema,
  contentViews,
  fileAddSchema,
} from "./schemas";
import { parseFormDataAsync } from "./zod-web-api";

export const getContentObjectBySubPath = (subpath: string) =>
  getContentObjectBySubPathCache(subpath === "/" ? "/" : `/${subpath}`);

export const getContentObjectBySubPathCache = cache(
  (subpath: string) => fetchContentObject(subpath),
  "getContentObjectBySubPath",
);

const contentObjectEditFormSchema = contentObjectEditSchema.extend({
  routePrefix: contentViews,
});

const routePrefixMapping = {
  default: "",
  add: "/add",
  edit: "/edit",
  delete: "/delete",
};

export const saveContentObject = async (formData: FormData) => {
  try {
    const data = await parseFormDataAsync(
      formData,
      contentObjectEditFormSchema,
    );
    const contentId = data.id;
    const parentPath = await db.contentObjects
      .find(contentId)
      .parent.get("path");

    const newPath = await db.contentObjects
      .find(data.id)
      .update({
        ...data,
        path: `${parentPath === "/" ? "" : parentPath}/${data.slug}`,
      })
      .get("path");
    throw redirect(routePrefixMapping[data.routePrefix] + newPath);
  } catch (exception) {
    if (!(exception instanceof Response)) {
      console.info("saveContentObject", {
        type: typeof exception,
        error: exception,
      });
    }
    if (exception instanceof z.ZodError) {
      throw new Response(JSON.stringify(exception.errors), {
        status: 400,
        statusText: "Too bad, peanut butter",
      });
    }
    throw exception;
  }
};

const contentObjectEditRootFormSchema = contentObjectEditRootSchema.extend({
  routePrefix: contentViews,
});

export const saveContentObjectRoot = async (formData: FormData) => {
  try {
    const data = await parseFormDataAsync(
      formData,
      contentObjectEditRootFormSchema,
    );
    const newPath = await db.contentObjects
      .find(data.id)
      .update({
        ...data,
        path: "/",
      })
      .get("path");
    throw redirect(routePrefixMapping[data.routePrefix] + newPath);
  } catch (exception) {
    if (!(exception instanceof Response)) {
      console.info("saveContentObjectRoot", {
        type: typeof exception,
        error: exception,
      });
    }
    if (exception instanceof z.ZodError) {
      throw new Response(JSON.stringify(exception.errors), {
        status: 400,
        statusText: "Too bad, peanut butter",
      });
    }
    throw exception;
  }
};

const contentObjectAddFormSchema = contentObjectAddSchema.extend({
  routePrefix: contentViews,
});

export const addContentObject = async (formData: FormData) => {
  try {
    const data = await parseFormDataAsync(formData, contentObjectAddFormSchema);
    const parentId = data.parentId;
    const parentPath = await db.contentObjects.find(parentId).get("path");
    const newPath = await db.contentObjects
      .create({
        ...data,
        parentId: data.parentId,
        path: parentId
          ? `${parentPath}/${data.slug}`.replaceAll("//", "/")
          : "/",
      })
      .get("path");
    throw redirect(routePrefixMapping[data.routePrefix] + newPath);
  } catch (exception) {
    if (!(exception instanceof Response)) {
      console.info("addContentObject", {
        type: typeof exception,
        error: exception,
      });
    }
    if (exception instanceof z.ZodError) {
      throw new Response(JSON.stringify(exception.errors), {
        status: 400,
        statusText: "Too bad, peanut butter",
      });
    }
    throw exception;
  }
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
  const data = await parseFormDataAsync(formData, fileAddSchema);
  return await createLargeObjectFromStream(
    readableStreamToNodeReadable(data.someFile.stream()),
  );
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

const contentObjectDeleteFormSchema = contentObjectDeleteSchema.extend({
  routePrefix: contentViews,
});

export const deleteContentObject = async (formData: FormData) => {
  try {
    const data = await parseFormDataAsync(
      formData,
      contentObjectDeleteFormSchema,
    );

    const parentId = await db.contentObjects
      .find(data.id)
      .delete()
      .get("parentId");

    const parentPath = parentId
      ? await db.contentObjects.find(parentId).get("path")
      : "/";

    throw redirect(routePrefixMapping[data.routePrefix] + parentPath);
  } catch (exception) {
    if (!(exception instanceof Response)) {
      console.info("addContentObject", {
        type: typeof exception,
        error: exception,
      });
    }
    if (exception instanceof z.ZodError) {
      throw new Response(JSON.stringify(exception.errors), {
        status: 400,
        statusText: "Too bad, peanut butter",
      });
    }
    throw exception;
  }
};

export type ContentObject = Content & {
  children: Content[];
  parents: Content[];
};

export const fetchContentObject = async (
  path: string,
): Promise<ContentObject | undefined> => {
  if (path.startsWith("/_") || path.startsWith("/file/")) {
    return;
  }
  console.info("fetchContentObject", { path });
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
  return { ...result, parents };
};
