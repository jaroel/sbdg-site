import { Field, FieldArray, insert, move, remove } from "@modular-forms/solid";
import { For } from "solid-js";
import { EditBlock, ViewBlocks } from "../Blocks";
import type { BlockEditFormProps } from "../content/mapping";
import { TextField } from "../input/TextField";
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
            multiline
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
                        <button
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <title>Move item up</title>
                            <path
                              fill-rule="evenodd"
                              d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <title>Move item down</title>
                            <path
                              fill-rule="evenodd"
                              d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="px-2">
                        <button
                          type="button"
                          title="Delete item"
                          class="size-4 disabled:text-gray-400"
                          onClick={() => {
                            remove(props.form, fieldArray.name, {
                              at: index(),
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <title>Remove this block</title>
                            <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                            <path
                              fill-rule="evenodd"
                              d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5Zm5.22 1.72a.75.75 0 0 1 1.06 0L10 10.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L11.06 12l1.72 1.72a.75.75 0 1 1-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 0 1-1.06-1.06L8.94 12l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="px-2">
                        <button
                          type="button"
                          title="Insert new item above"
                          class="size-4 disabled:text-gray-400"
                          onClick={() => {
                            insert(props.form, fieldArray.name, {
                              at: index(),
                              value: { text: "", type: "text" },
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <title>Insert new item above</title>
                            <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                          </svg>
                        </button>
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
    <>
      <p class="text-sm text-gray-600">{props.object.nestedTitle}</p>
      <ViewBlocks blocks={props.object.texts || []} />
    </>
  );
}
