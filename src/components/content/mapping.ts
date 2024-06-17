import type { createForm } from "@modular-forms/solid";
import type { Component } from "solid-js";
import type * as z from "zod";
import type {
  contentObjectAddSchema,
  contentObjectDeleteSchema,
  contentObjectEditSchema,
} from "~/schemas";
import { EditPage } from "../blocks/page";
import type { BlockKeys } from "../blocks/schemas";
import { EditText } from "../blocks/text";

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

export type BlockDeleteFormProps = {
  path: string;
  form: ReturnType<
    typeof createForm<z.infer<typeof contentObjectDeleteSchema>>
  >[0];
};

export const editComponents: Record<
  BlockKeys,
  Component<BlockEditFormProps>
> = {
  text: EditText,
  page: EditPage,
};
