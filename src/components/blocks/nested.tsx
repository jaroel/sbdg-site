import { Button } from "@kobalte/core/button";
import {
  Field,
  FieldArray,
  getValues,
  insert,
  move,
  remove,
} from "@modular-forms/solid";
import { For } from "solid-js";
import { EditBlock, ViewBlocks } from "../Blocks";
import {
  ArchiveBoxXMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentIcon,
  DocumentIcon,
} from "../Icons";
import type { BlockEditFormProps } from "../content/mapping";
import { TextField } from "../input/TextField";
import { copyBuffer, setCopyBuffer } from "./copy";
import type { NestedBlock } from "./schemas";

export function EditNested(props: BlockEditFormProps) {
  return (
    <>
      <Field of={props.form} name={`${props.path}nestedTitle`}>
        {(field, props) => (
          <TextField
            {...props}
            label="Nested title"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>

      <FieldArray of={props.form} name={`${props.path}texts`}>
        {(fieldArray) => (
          <div class="flex flex-col mx-2 my-4">
            <label>Nested texts</label>
            {fieldArray.error && (
              <div class="text-red-500">{fieldArray.error}</div>
            )}
            <div class="space-y-4 mt-2">
              <For each={fieldArray.items}>
                {(_, index) => (
                  <div>
                    <div class="border-b border-orange-300 divide-x flex flex-row">
                      <div>
                        <Button
                          type="button"
                          title="Move item up"
                          class="size-4 disabled:text-gray-400"
                          disabled={index() === 0}
                          onClick={() => {
                            move(props.form, fieldArray.name, {
                              from: index(),
                              to: index() - 1,
                            });
                          }}
                        >
                          <ArrowUpIcon title="Move item up" />
                        </Button>
                        <Button
                          type="button"
                          title="Move item down"
                          class="size-4 disabled:text-gray-400"
                          disabled={index() >= fieldArray.items.length - 1}
                          onClick={() => {
                            move(props.form, fieldArray.name, {
                              from: index(),
                              to: index() + 1,
                            });
                          }}
                        >
                          <ArrowDownIcon title="Move item down" />
                        </Button>
                      </div>
                      <div class="px-2">
                        <Button
                          type="button"
                          title="Delete item"
                          class="size-4 disabled:text-gray-400"
                          onClick={() => {
                            remove(props.form, fieldArray.name, {
                              at: index(),
                            });
                          }}
                        >
                          <ArchiveBoxXMarkIcon title="Remove this block" />
                        </Button>
                      </div>
                      <div class="px-1 space-x-1">
                        <Button
                          type="button"
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
                          type="button"
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
                      </div>
                    </div>
                    <EditBlock
                      form={props.form}
                      path={`${fieldArray.name}.${index()}.`}
                    />
                  </div>
                )}
              </For>
            </div>
            <div>
              <header>Insert a new block</header>
              <div class="border-b border-orange-300 divide-x flex flex-row">
                <div class="px-1">
                  <Button
                    type="button"
                    title="Text block"
                    class="size-4 disabled:text-gray-400"
                    onClick={() => {
                      insert(props.form, fieldArray.name, {
                        at: fieldArray.items.length,
                        value: { text: "", type: "text" },
                      });
                    }}
                  >
                    <DocumentIcon title="Insert text block" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </FieldArray>
    </>
  );
}

export default function ViewNestedBlock(props: {
  object: NestedBlock;
}) {
  return (
    <div class="ml-4">
      <p class="text-xl text-gray-600">{props.object.nestedTitle}</p>
      <ViewBlocks blocks={props.object.texts || []} />
    </div>
  );
}
