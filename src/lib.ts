import type { AnyZodObject, ZodFormattedError } from "zod";
import { Content } from "./db/tables/contentObjects.table";

export function isDeepStrictEqual(
  obj1: { [x: string]: any } | null,
  obj2: { [x: string]: any } | null,
) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== typeof obj2 || obj1 === null || obj2 === null) {
    return false;
  }

  if (typeof obj1 === "object") {
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !isDeepStrictEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function mergeErrors<T1 extends AnyZodObject, T2 extends AnyZodObject>(
  obj1?: ZodFormattedError<T1>,
  obj2?: ZodFormattedError<T2>,
) {
  const result = {
    _errors: Array.from(
      new Set([...(obj1?._errors || []), ...(obj2?._errors || [])]),
    ),
  } as ZodFormattedError<T1 | T2>;

  const keys = Array.from(
    new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]),
  );
  for (const key of keys) {
    if (key === "_errors") {
      continue;
    }
    const val1 = obj1?.[key];
    const val2 = obj2?.[key];
    if (val1 && val2) {
      result[key] = mergeErrors(val1, val2);
    } else if (val1) {
      result[key] = val1;
    } else if (val2) {
      result[key] = val2;
    }
  }
  return result;
}
