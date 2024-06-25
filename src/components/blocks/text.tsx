import { Field } from "@modular-forms/solid";
import type { Component } from "solid-js";
import { Dynamic, For, Show } from "solid-js/web";
import TiptapEditor from "../TiptapEditor";
import type { BlockEditFormProps } from "../content/mapping";
import type {
  TextBlock,
  TiptapDoc,
  TiptapElement,
  TiptapKeys,
  TiptapParagraph,
  TiptapText,
} from "./schemas";

export function EditText(props: BlockEditFormProps) {
  return (
    <>
      <Field of={props.form} name={`${props.path}text`}>
        {(field, fprops) => (
          <>
            {field.error && <div class="text-red-500">{field.error}</div>}
            <input
              type="hidden"
              name={field.name}
              value={JSON.stringify(field.value)}
            />
            <TiptapEditor field={field} form={props.form} fprops={fprops} />
          </>
        )}
      </Field>
    </>
  );
}

function RenderText(props: {
  element: TiptapText;
}) {
  return (
    <Show when={props.element.marks} fallback={props.element.text}>
      <strong>{props.element.text}</strong>
    </Show>
  );
}

function RenderParagraph(props: {
  element: TiptapParagraph;
}) {
  return (
    <For each={props.element.content}>
      {(value) => (
        <p>
          <RenderTiptapElement element={value} />
        </p>
      )}
    </For>
  );
}

function renderDoc(props: {
  element: TiptapDoc;
}) {
  return (
    <For each={props.element.content}>
      {(value) => <RenderTiptapElement element={value} />}
    </For>
  );
}

export const viewTiptapElement: Record<TiptapKeys, Component<any>> = {
  text: RenderText,
  doc: renderDoc,
  paragraph: RenderParagraph,
};

function RenderTiptapElement(props: {
  element: TiptapElement;
}) {
  return (
    <Dynamic component={viewTiptapElement[props.element.type]} {...props} />
  );
}

export default function ViewTextBlock(props: {
  object: TextBlock;
}) {
  return (
    <>
      <RenderTiptapElement element={props.object.text} />
    </>
  );
}
