import { Button } from "@kobalte/core/button";
import { type Accessor, For } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import type { Errors } from "~/types";
import {
  ArchiveBoxXMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentIcon,
} from "../../Icons";
import { TextField } from "../../input/TextField";
import { textBlockFactory } from "../factories";
import type { NestedBlock } from "../schemas";
import EditTextBlock from "../text/EditText";

function moveLeft<T>(array: T[], index: number): T[] {
  const head = array.slice(0, index - 1);
  const prev = array[index - 1];
  const current = array[index];
  const tail = array.slice(index + 1);
  return head.concat([current, prev]).concat(tail);
}
function moveRight<T>(array: T[], index: number): T[] {
  const head = array.slice(0, index);
  const current = array[index];
  const next = array[index + 1];
  const tail = array.slice(index + 2);
  return head.concat([next, current]).concat(tail);
}

function BlockToolbar(props: {
  index: Accessor<number>;
  value: NestedBlock;
  setStore: SetStoreFunction<NestedBlock>;
  errors?: Errors;
}) {
  return (
    <div
      class="border-b divide-x flex flex-row"
      classList={{
        "border-red-500": Boolean(props.errors?._errors),
        "border-orange-300": Boolean(props.errors?._errors) === false,
      }}
    >
      <div>
        <Button
          title="Move item up"
          class="size-4 disabled:text-gray-400"
          disabled={props.index() === 0}
          onClick={() => {
            const values = moveLeft(props.value.texts, props.index());
            props.setStore("texts", values);
          }}
        >
          <ArrowUpIcon title="Move item up" />
        </Button>
        <Button
          title="Move item down"
          class="size-4 disabled:text-gray-400"
          disabled={props.index() >= props.value.texts.length - 1}
          onClick={() => {
            const values = moveRight(props.value.texts, props.index());
            props.setStore("texts", values);
          }}
        >
          <ArrowDownIcon title="Move item down" />
        </Button>
      </div>
      <div class="px-2">
        <Button
          title="Delete item"
          class="size-4 disabled:text-gray-400"
          onClick={() => {
            const values = props.value.texts
              .slice(0, props.index())
              .concat(props.value.texts.slice(props.index() + 1));
            props.setStore("texts", values);
          }}
        >
          <ArchiveBoxXMarkIcon title="Remove this block" />
        </Button>
      </div>
    </div>
  );
}

export default function EditNestedBlock(props: {
  value: NestedBlock;
  setStore: SetStoreFunction<NestedBlock>;
  errors?: Errors;
}) {
  return (
    <>
      {props.errors?._errors && (
        <div class="text-red-500">{props.errors?._errors.join("\n")}</div>
      )}
      <TextField
        label="Nested title"
        value={props.value.nestedTitle}
        onInput={(event) => {
          props.setStore("nestedTitle", event.currentTarget.value);
        }}
        error={props.errors?.nestedTitle}
      />
      <div class="flex flex-col m-4">
        <header class="text-gray-600">Nested texts</header>
        {props.errors?.texts && (
          <div class="text-red-500">
            {props.errors?.texts?._errors.join("\n")}
          </div>
        )}
        <div class="space-y-4 mt-2 mb-2">
          <For each={props.value.texts}>
            {(value, index) => {
              const errors = () => props.errors?.texts?.[index().toString()];
              const [store, setStore] = createStore(value);
              return (
                <div>
                  <BlockToolbar
                    index={index}
                    value={props.value}
                    setStore={props.setStore}
                    errors={errors()}
                  />
                  <EditTextBlock
                    value={store}
                    setStore={setStore}
                    errors={errors()}
                  />
                </div>
              );
            }}
          </For>
        </div>
        <div>
          <header class="text-gray-600">Insert a new nested block!</header>
          <div class="border-b border-orange-300 divide-x flex flex-row mt-1">
            <div class="px-1">
              <Button
                title="Text block"
                class="size-4 disabled:text-gray-400"
                onClick={() => {
                  const index = props.value.texts.length;
                  const value = textBlockFactory(`New nested thing: ${index}`);
                  props.setStore("texts", index, value);
                }}
              >
                <DocumentIcon title="Insert text block" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
