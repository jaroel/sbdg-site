import type { createForm } from "@modular-forms/solid";
import type { Component } from "solid-js";
import type * as z from "zod";
import type {
  contentObjectAddSchema,
  contentObjectDeleteSchema,
  contentObjectEditSchema,
} from "~/schemas";
import ViewImageBlock, { EditImage } from "../blocks/Image";
import ViewNestedBlock, { EditNested } from "../blocks/nested";
import ViewPage, { EditPage } from "../blocks/page";
import type { BlockType } from "../blocks/schemas";
import ViewTextBlock, { EditText } from "../blocks/text";

export const viewComponents: Record<BlockType, Component<any>> = {
  text: ViewTextBlock,
  page: ViewPage,
  nested: ViewNestedBlock,
  image: ViewImageBlock,
};

export type BlockAddFormProps = {
  path: string;
  form: ReturnType<
    typeof createForm<z.infer<typeof contentObjectAddSchema>>
  >[0];
};

export const addComponents: Record<BlockType, Component<BlockEditFormProps>> = {
  text: EditText,
  page: EditPage,
  nested: EditNested,
  image: EditImage,
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
  BlockType,
  Component<BlockEditFormProps>
> = {
  text: EditText,
  page: EditPage,
  nested: EditNested,
  image: EditImage,
};
