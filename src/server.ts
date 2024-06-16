"use server";
import { cache, redirect } from "@solidjs/router";
import * as z from "zod";
import { db } from "./db/db";
import {
  contentObjectAddSchema,
  contentObjectDeleteSchema,
  contentObjectEditRootSchema,
  contentObjectEditSchema,
  contentViews,
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

export type ContentObject = NonNullable<
  Awaited<ReturnType<typeof fetchContentObject>>
>;

export const fetchContentObject = async (path: string) => {
  if (path.startsWith("/_")) {
    return;
  }
  console.info("fetchContentObject", { path });
  const result = await db.contentObjects
    .as("outer")
    .where({ path })
    .select("*", {
      children: (q) => q.children,
    })
    .take();

  const parents = await db.$queryBuilder
    .withRecursive(
      "parents",
      db.contentObjects
        .select("id", "path", "parentId", "object")
        .find(result.id),
      (q) =>
        q
          .from(db.contentObjects)
          .select("id", "path", "parentId", "object")
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
