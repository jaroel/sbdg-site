"use server";
import { cache, redirect } from "@solidjs/router";
import { db } from "./db/db";
import {
  contentObjectAddSchema,
  contentObjectEditSchema,
  contentViews,
} from "./schemas";
import { parseFormDataAsync } from "./zod-web-api";

import * as z from "zod";

export const getContentObjectBySubPath = (subpath: string) =>
  getContentObjectBySubPathCache(subpath === "/" ? "/" : `/${subpath}`);

export const getContentObjectBySubPathCache = cache(
  (subpath: string) => fetchContentObject(subpath),
  "getContentObjectBySubPath",
);

const contentObjectEditFormSchema = contentObjectEditSchema.extend({
  routePrefix: contentViews,
});

const routePrefixMapping = { default: "", add: "/add", edit: "/edit" };

export const saveContentObject = async (formData: FormData) => {
  try {
    const data = await parseFormDataAsync(
      formData,
      contentObjectEditFormSchema,
    );
    const parentId = data.content.parentId;
    const parentPath = parentId
      ? await db.contentObjects.find(parentId).get("path")
      : "";
    const newPath = await db.contentObjects
      .find(data.content.id)
      .update({
        ...data.content,
        parentId: data.content.parentId,
        path: `${parentPath}${data.slug}`,
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

const contentObjectAddFormSchema = contentObjectAddSchema.extend({
  routePrefix: contentViews,
});

export const addContentObject = async (formData: FormData) => {
  try {
    const data = await parseFormDataAsync(formData, contentObjectAddFormSchema);
    const parentId = data.content.parentId;
    const parentPath = parentId
      ? await db.contentObjects.find(parentId).get("path")
      : "";
    const newPath = await db.contentObjects
      .create({
        ...data.content,
        parentId: data.content.parentId,
        path: `${parentPath}${data.slug}`,
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

export type ContentObject = NonNullable<
  Awaited<ReturnType<typeof fetchContentObject>>
>;

export const fetchContentObject = async (path: string) => {
  if (path.startsWith("/_")) {
    return;
  }
  console.info("fetchContentObject", { path });
  const content = await db.contentObjects
    .where({ path })
    .select("*", {
      children: (q) => q.children.select("*"),
    })
    .takeOptional();
  if (!content) {
    return;
  }

  // const subObjects = await db.$queryBuilder
  //   .withRecursive(
  //     "subObjects",
  //     db.contentObjects.select("id", "path", "parentId").find(content.id),
  //     (q) =>
  //       q
  //         .from(db.contentObjects)
  //         .select("id", "path", "parentId")
  //         .join("subObjects", "subObjects.id", "parentId"),
  //   )
  //   .from("subObjects")
  //   .selectAll()
  //   .all();

  const parents = await db.$queryBuilder
    .withRecursive(
      "parents",
      db.contentObjects
        .select("id", "path", "parentId", "object")
        .find(content.id),
      (q) =>
        q
          .from(db.contentObjects)
          .select("id", "path", "parentId", "object")
          .join("parents", "parents.parentId", "id"),
    )
    .from("parents")
    .where({
      id: {
        not: content.id,
      },
    })
    .order({ path: "DESC" })
    .all();

  return {
    content: content,
    parents: parents,
  };
};
