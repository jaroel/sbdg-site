import { action } from "@solidjs/router";
import {
  addContentObject,
  deleteContentObject,
  saveContentObject,
  saveContentObjectRoot,
} from "~/server";

type SaveContentObjectAction = typeof saveContentObjectAction;
export const saveContentObjectAction = action(
  saveContentObject,
  "saveContentObjectAction",
);

type SaveContentObjectRootAction = typeof saveContentObjectRootAction;
export const saveContentObjectRootAction = action(
  saveContentObjectRoot,
  "saveContentObjectRootAction",
);

type AddContentObjectAction = typeof addContentObjectAction;
export const addContentObjectAction = action(
  addContentObject,
  "addContentObjectAction",
);

export const deleteContentObjectAction = action(
  deleteContentObject,
  "deleteContentObjectAction",
);

export type ContentObjectAction =
  | SaveContentObjectAction
  | SaveContentObjectRootAction
  | AddContentObjectAction;
