import type { ZodObject } from "zod";

export type Override<S extends ZodObject> =
  | string
  | (() => string)
  | Overrides<S>;
export type Overrides<S extends ZodObject> = {
  [k in keyof S["shape"]]?: Override<S["shape"][k]>;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
