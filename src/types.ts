import type { z } from "zod";

export type SomeZodObject = z.ZodObject<z.infer<z.ZodTypeAny>>;
export type Override<S extends SomeZodObject> =
  | string
  | (() => string)
  | Overrides<S>;
export type Overrides<S extends SomeZodObject> = {
  [k in keyof S["shape"]]?: Override<S["shape"]>;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
