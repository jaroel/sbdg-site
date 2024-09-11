import type { Component } from "solid-js";
import { Dynamic, For, Show } from "solid-js/web";
import type {
  TiptapDoc,
  TiptapElement,
  TiptapElementType,
  TiptapMarkType,
  TiptapParagraph,
  TiptapText,
} from "../../input/schema";
import type { TextBlock } from "../schemas";

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
