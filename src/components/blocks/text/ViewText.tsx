import { For } from "solid-js/web";
import type {
  TiptapDoc,
  TiptapMarkType,
  TiptapParagraph,
  TiptapText,
} from "../../input/schema";
import type { TextBlock } from "../schemas";

const hasMark = (marks: TiptapText["marks"], type: TiptapMarkType) =>
  marks?.map((item) => item.type === type).filter(Boolean).length !== 0;

function RenderText(props: {
  element: TiptapText;
}) {
  return (
    <>
      {!props.element.marks?.length && props.element.text}
      {!!props.element.marks?.length && (
        <>
          {" "}
          {hasMark(props.element.marks, "bold") && (
            <strong>{props.element.text}</strong>
          )}
          {hasMark(props.element.marks, "italic") && (
            <em>{props.element.text}</em>
          )}
        </>
      )}
    </>
  );
}

function RenderParagraph(props: {
  element: TiptapParagraph;
}) {
  return (
    <p>
      <For each={props.element.content}>
        {(value) => <RenderText element={value} />}
      </For>
    </p>
  );
}

function RenderDoc(props: {
  element: TiptapDoc;
}) {
  return (
    <For each={props.element.content}>
      {(value) => <RenderParagraph element={value} />}
    </For>
  );
}

export default function ViewTextBlock(props: {
  value: TextBlock;
}) {
  return <RenderDoc element={props.value.text} />;
}
