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
