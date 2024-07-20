import { type Accessor, createContext } from "solid-js";
import type { ContentObject } from "~/server";

export const ContentObjectContext = createContext<Accessor<ContentObject>>();
