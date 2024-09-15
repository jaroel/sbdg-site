import { action } from "@solidjs/router";
import {
  addContentObject,
  saveContentObject,
  saveContentObjectRoot,
} from "~/server";

export type SaveContentObjectAction = typeof saveContentObjectAction;
export const saveContentObjectAction = action(
  saveContentObject,
  "saveContentObjectAction",
);

export type SaveContentObjectRootAction = typeof saveContentObjectRootAction;
const saveContentObjectRootAction = action(
  saveContentObjectRoot,
  "saveContentObjectRootAction",
);

export type AddContentObjectAction = typeof addContentObjectAction;
export const addContentObjectAction = action(
  addContentObject,
  "addContentObjectAction",
);
