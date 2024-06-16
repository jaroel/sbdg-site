import type { createForm } from "@modular-forms/solid";
import type { Component } from "solid-js";
import type * as z from "zod";
import type {
  contentObjectAddSchema,
  contentObjectEditSchema,
} from "~/schemas";
import { EditPage } from "../blocks/Page";
import { EditText } from "../blocks/Text";
import type { BlockKeys } from "../blocks/schemas";

export type BlockAddFormProps = {
  path: string;
  form: ReturnType<
    typeof createForm<z.infer<typeof contentObjectAddSchema>>
  >[0];
};

export const addComponents: Record<BlockKeys, Component<BlockEditFormProps>> = {
  text: EditText,
  page: EditPage,
};

export type BlockEditFormProps = {
  path: string;
  form: ReturnType<
    typeof createForm<z.infer<typeof contentObjectEditSchema>>
  >[0];
};

export const editComponents: Record<
  BlockKeys,
  Component<BlockEditFormProps>
> = {
  text: EditText,
  page: EditPage,
};
