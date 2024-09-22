import { action } from "@solidjs/router";
import {
  addContentObject,
  deleteContentObject,
  saveContentObject,
  saveContentObjectRoot,
} from "~/server";

export const saveContentObjectAction = action(
  saveContentObject,
  "saveContentObjectAction",
);

export const saveContentObjectRootAction = action(
  saveContentObjectRoot,
  "saveContentObjectRootAction",
);

export const addContentObjectAction = action(
  addContentObject,
  "addContentObjectAction",
);

export const deleteContentObjectAction = action(
  deleteContentObject,
  "deleteContentObjectAction",
);

export type ContentObjectAction =
  | typeof saveContentObjectAction
  | typeof saveContentObjectRootAction
  | typeof addContentObjectAction
  | typeof deleteContentObjectAction;
