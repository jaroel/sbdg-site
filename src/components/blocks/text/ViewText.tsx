import { Link } from "@kobalte/core/link";
import type { FlowProps } from "solid-js";
import { For } from "solid-js/web";
import type {
  TiptapDoc,
  TiptapMark,
  TiptapParagraph,
  TiptapText,
} from "../../input/schema";
import type { TextBlock } from "../schemas";

const renderMark = (mark: TiptapMark) => {
  switch (mark.type) {
    case "bold":
      return (props: FlowProps) => (
        <strong {...mark.attrs}>{props.children}</strong>
      );
    case "italic":
      return (props: FlowProps) => <em {...mark.attrs}>{props.children}</em>;
    case "link":
      return (props: FlowProps) => (
        <Link
          href={mark.attrs.href}
          rel={mark.attrs.rel}
          // https://docs.solidjs.com/solid-router/reference/components/a#soft-navigation
          target={mark.attrs.target === "_self" ? undefined : mark.attrs.target}
          class="underline underline-offset-2 decoration-slate-400"
        >
          {props.children}
        </Link>
      );
  }
};

function renderMarks(element: TiptapText) {
  const markRenderers = element.marks
    ?.toSorted((a, b) => (a.type === "link" ? 1 : -1))
    ?.map(renderMark);
  const renderMarks = markRenderers?.reduce(
    (previousValue, currentValue) => (value) =>
      previousValue({ children: currentValue(value) }),
  );
  return renderMarks ? renderMarks({ children: element.text }) : element.text;
}

function RenderText(props: {
  element: TiptapText;
}) {
  return <>{renderMarks(props.element)}</>;
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
