import { Button } from "@kobalte/core/button";
import { For } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";

import {
  ArchiveBoxXMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentIcon,
} from "../../Icons";

import { TextField } from "../../input/TextField";
import { textBlockFactory } from "../factories";
import type { NestedBlock } from "../schemas";
import EditText from "../text/EditText";

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

export default function EditNested(props: {
  value: NestedBlock;
  setStore: SetStoreFunction<NestedBlock>;
}) {
  return (
    <>
      <TextField
        label="Nested title"
        value={props.value.nestedTitle}
        onInput={(event) => {
          props.setStore("nestedTitle", event.currentTarget.value);
        }}
      />
      <div class="flex flex-col mx-2 my-4">
        <label>Nested texts</label>
        {false && "fieldArray.error" && (
          <div class="text-red-500">{"fieldArray.error"}</div>
        )}
        <div class="space-y-4 mt-2">
          <For each={props.value.texts}>
            {(value, index) => {
              const [store, setStore] = createStore(value);
              return (
                <div>
                  <div class="border-b border-orange-300 divide-x flex flex-row">
                    <div>
                      <Button
                        title="Move item up"
                        class="size-4 disabled:text-gray-400"
                        disabled={index() === 0}
                        onClick={() => {
                          const values = moveLeft(props.value.texts, index());
                          props.setStore("texts", values);
                        }}
                      >
                        <ArrowUpIcon title="Move item up" />
                      </Button>
                      <Button
                        title="Move item down"
                        class="size-4 disabled:text-gray-400"
                        disabled={index() >= props.value.texts.length - 1}
                        onClick={() => {
                          const values = moveRight(props.value.texts, index());
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
                            .slice(0, index())
                            .concat(props.value.texts.slice(index() + 1));
                          props.setStore("texts", values);
                        }}
                      >
                        <ArchiveBoxXMarkIcon title="Remove this block" />
                      </Button>
                    </div>
                    {/* <div class="px-1 space-x-1">
                  <Button
                    title="Copy this block"
                    class="size-4 disabled:text-gray-400"
                    onClick={() => {
                      const values = getValues(
                        props.form,
                        fieldArray.name,
                      );
                      const value = values && values[index()];
                      value && setCopyBuffer(value);
                    }}
                  >
                    <ClipboardDocumentIcon title="Copy this block" />
                  </Button>
                  <Button
                    title="Paste block above"
                    class="size-4 disabled:text-gray-400"
                    disabled={!copyBuffer()}
                    onClick={() => {
                      const value = copyBuffer();
                      value &&
                        insert(props.form, fieldArray.name, {
                          at: index(),
                          value: value,
                        });
                    }}
                  >
                    <ArrowUpTrayIcon title="Paste block above" />
                  </Button>
                </div> */}
                  </div>
                  <EditText value={store} setStore={setStore} />
                </div>
              );
            }}
          </For>
        </div>
        <div>
          <header>Insert a new nested block!</header>
          <div class="border-b border-orange-300 divide-x flex flex-row">
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
