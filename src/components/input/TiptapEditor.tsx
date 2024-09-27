import { ToggleButton } from "@kobalte/core/toggle-button";
import { ToggleGroup } from "@kobalte/core/toggle-group";
import type { Editor } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import type { JSX } from "solid-js";
import { Show, createEffect, createSignal } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import {
  createEditorTransaction,
  createTiptapEditor,
  useEditorIsFocused,
  useEditorJSON,
} from "solid-tiptap";
import type { ZodFormattedError } from "zod";
import { isDeepStrictEqual } from "~/lib";
import { BoldIcon, LinkIcon, LinkSlashIcon, ParagraphIcon } from "../Icons";
import InternalLink from "./InternalLink";
import type { TiptapDoc } from "./schema";

function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="h-full border-l border-gray-300" />
    </div>
  );
}

interface ControlProps {
  class: string;
  editor: Editor;
  title: string;
  key: string;
  onChange: () => void;
  isActive?: (editor: Editor) => boolean;
  children: JSX.Element;
}

function Control(props: ControlProps): JSX.Element {
  const flag = createEditorTransaction(
    () => props.editor,
    (instance) =>
      props.isActive ? props.isActive(instance) : instance.isActive(props.key),
  );

  const selection = createEditorTransaction(
    () => props.editor,
    (instance) => instance.view.state.selection,
  );

  return (
    <>
      <ToggleButton
        defaultPressed={false}
        class={`${props.class} w-6 h-6 flex items-center justify-center rounded focus:outline-none ui-pressed:border ui-disabled:text-gray-300`}
        pressed={flag()}
        title={props.title}
        onClick={console.log}
        onChange={props.onChange}
        disabled={selection().empty}
      >
        {props.children} {flag()}
      </ToggleButton>
    </>
  );
}

interface ToolbarProps {
  editor: Editor;
}

function ToolbarContents(props: ToolbarProps): JSX.Element {
  const [selected, setSelected] = createSignal("");
  const [open, setOpen] = createSignal(false);

  const selection = createEditorTransaction(
    () => props.editor,
    (instance) => instance.view.state.selection,
  );

  createEffect(() => {
    if (selected()) {
      props.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: selected() })
        .focus()
        .run();
    }
  });

  return (
    <div class="p-2 flex space-x-1">
      <ToggleGroup class="flex space-x-1 " disabled={selection().empty}>
        <Control
          key="paragraph"
          class="font-bold ui-disabled:text-slate-300"
          editor={props.editor}
          onChange={() => props.editor.chain().focus().setParagraph().run()}
          title="Paragraph"
        >
          <ParagraphIcon title="Paragraph" class="w-full h-full m-1" />
        </Control>
      </ToggleGroup>
      <Separator />
      <ToggleGroup class="flex space-x-1" disabled={selection().empty}>
        <Control
          key="bold"
          class="font-bol"
          editor={props.editor}
          onChange={() => props.editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <BoldIcon title="Bold" class="w-full h-full m-1" />
        </Control>
        <Control
          key="italic"
          class="italic"
          editor={props.editor}
          onChange={() => props.editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          I
        </Control>
        <Separator />
        <InternalLink
          path="/"
          parent="home"
          open={open}
          setOpen={setOpen}
          selected={selected}
          setSelected={setSelected}
        />
        <Control
          key="link"
          class="link"
          editor={props.editor}
          onChange={() => {
            setOpen(!open());
          }}
          title="Link"
        >
          <LinkIcon title="Link" class="w-full h-full m-1" />
        </Control>
        <Control
          key="link"
          class="link"
          editor={props.editor}
          onChange={() => {
            props.editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .unsetLink()
              .run();
          }}
          title="Unlink"
        >
          <LinkSlashIcon title="Unlink" class="w-full h-full m-1" />
        </Control>
      </ToggleGroup>
    </div>
  );
}

export default function TiptapEditor(props: {
  value: TiptapDoc;
  setStore: SetStoreFunction<TiptapDoc>;
  errors?: ZodFormattedError<TiptapDoc>;
}) {
  const [container, setContainer] = createSignal<HTMLDivElement>();

  return (
    <>
      <div
        class="flex items-center justify-center w-full border border-gray-200 border-t-0"
        classList={{
          "border-red-500": Boolean(props.errors?._errors),
        }}
      >
        <div class="flex-1 m-1">
          <div
            class="bg-white overflow-y-scroll rounded-lg"
            ref={setContainer}
          />
          <Show when={container()}>
            {(container) => <EditorComp {...props} container={container()} />}
          </Show>
        </div>
      </div>

      {props.errors && (
        <div class="text-red-500">
          {props.errors._errors.join("\n")}
          {props.errors.content !== undefined && (
            <>
              <pre>{JSON.stringify(props.errors.content, null, 2)}</pre>
              <pre>{JSON.stringify(props.value.content, null, 2)}</pre>
              Required
            </>
          )}
        </div>
      )}
    </>
  );
}

function EditorComp(props: {
  container: HTMLDivElement;
  value: TiptapDoc;
  setStore: SetStoreFunction<TiptapDoc>;
}) {
  const editor = createTiptapEditor(() => ({
    element: props.container,
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    editorProps: {
      attributes: {
        class: "p-2 focus:outline-none prose max-w-full",
      },
    },
    content: props.value,
  }));

  const editorJSON = useEditorJSON(editor);
  const isFocused = useEditorIsFocused(editor);

  createEffect(() => {
    const editorContent = editorJSON();
    if (editorContent && !isFocused()) {
      if (!isDeepStrictEqual(props.value, editorContent)) {
        props.setStore(editorContent);
      }
    }
  });

  return (
    <>
      <Show when={editor()}>
        {(editor) => (
          <>
            <ToolbarContents editor={editor()} />
          </>
        )}
      </Show>
    </>
  );
}
