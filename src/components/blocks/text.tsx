import type { Component } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { Dynamic, For, Show } from "solid-js/web";
import TiptapEditor from "../TiptapEditor";

import type {
  TextBlock,
  TiptapDoc,
  TiptapElement,
  TiptapElementType,
  TiptapMarkType,
  TiptapParagraph,
  TiptapText,
} from "./schemas";

export function EditText(props: {
  value: TextBlock;
  setStore: SetStoreFunction<TextBlock>;
}) {
  return (
    <>
      {false && "field.error" && (
        <div class="text-red-500">{"field.error"}</div>
      )}
      <TiptapEditor {...props} />
    </>
  );
}

function RenderText(props: {
  element: TiptapText;
}) {
  const hasMark = (type: TiptapMarkType) =>
    props.element.marks?.map((item) => item.type === type).filter(Boolean)
      .length !== 0;

  return (
    <Show when={props.element.marks?.length} fallback={props.element.text}>
      {hasMark("bold") && <strong>{props.element.text}</strong>}
      {hasMark("italic") && <em>{props.element.text}</em>}
    </Show>
  );
}

function RenderParagraph(props: {
  element: TiptapParagraph;
}) {
  return (
    <p>
      <RenderElements elements={props.element.content} />
    </p>
  );
}

function renderDoc(props: {
  element: TiptapDoc;
}) {
  return <RenderElements elements={props.element.content} />;
}

function RenderElements(props: {
  elements: TiptapElement[];
}) {
  return (
    <For each={props.elements}>
      {(value) => <RenderTiptapElement element={value} />}
    </For>
  );
}

export const viewTiptapElement: Record<TiptapElementType, Component<any>> = {
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
  value: TextBlock;
}) {
  return (
    <>
      <RenderTiptapElement element={props.value.text} />
    </>
  );
}
