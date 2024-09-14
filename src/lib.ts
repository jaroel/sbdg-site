import type { Errors } from "./types";

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

export function mergeErrors(obj1?: Errors, obj2?: Errors): Errors {
  const result = {
    _errors: Array.from(
      new Set([...(obj1?._errors || []), ...(obj2?._errors || [])]),
    ),
  } as Errors;

  // Merge nested objects
  for (const key in obj1) {
    if (key !== "_errors" && obj1[key] && obj2?.[key]) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      result[key] = mergeErrors(obj1[key]!, obj2?.[key]!);
    } else if (key !== "_errors" && obj1[key]) {
      result[key] = obj1[key];
    } else if (key !== "_errors" && obj2?.[key]) {
      result[key] = obj2?.[key];
    }
  }
  return result;
}

export const errorKeys = (errors?: { _errors: string[] }) => {
  if (errors) {
    return Object.keys(errors).filter((value) => value !== "_errors");
  }
  return [];
};
