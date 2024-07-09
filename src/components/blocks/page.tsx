import { Button } from "@kobalte/core/button";
import { Field, FieldArray, insert, move, remove } from "@modular-forms/solid";
import { HttpStatusCode } from "@solidjs/start";
import { For } from "solid-js";
import { EditBlock, ViewBlocks } from "~/components/Blocks";
import {
  ArchiveBoxXMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentIcon,
  PictureIcon,
  RectangleStackIcon,
} from "../Icons";
import type { BlockEditFormProps } from "../content/mapping";
import { TextField } from "../input/TextField";
import type { PageBlock } from "./schemas";

export default function ViewPage(props: {
  object: PageBlock;
}) {
  return (
    <div>
      <h1>{props.object.title}</h1>
      <HttpStatusCode code={props.object.status || 200} />
      <p class="text-sm text-gray-600 mb-2">{props.object.description}</p>
      <ViewBlocks blocks={props.object.blocks} />
    </div>
  );
}

export function EditPage(props: BlockEditFormProps) {
  return (
    <>
      <Field of={props.form} name={`${props.path}title`}>
        {(field, fprops) => (
          <>
            <div class="mx-2 my-4">
              <TextField
                {...fprops}
                label="Page title"
                value={field.value}
                error={field.error}
                required
              />
            </div>
          </>
        )}
      </Field>
      <Field of={props.form} name={`${props.path}description`}>
        {(field, fprops) => (
          <>
            <div class="mx-2 my-4">
              <TextField
                {...fprops}
                label="Page description"
                value={field.value}
                error={field.error}
                required
                multiline
              />
            </div>
          </>
        )}
      </Field>

      <FieldArray of={props.form} name={`${props.path}blocks`}>
        {(fieldArray) => (
          <div class="flex flex-col mx-2 my-4">
            <label>Page blocks</label>
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
                      {/* <div class="px-1 space-x-1">
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
                      </div> */}
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
                <div class="px-1">
                  <Button
                    type="button"
                    title="Nested block"
                    class="size-4 disabled:text-gray-400"
                    onClick={() => {
                      insert(props.form, fieldArray.name, {
                        at: fieldArray.items.length,
                        value: { type: "nested", nestedTitle: "" },
                      });
                    }}
                  >
                    <RectangleStackIcon title="Insert nested block" />
                  </Button>
                </div>
                <div class="px-1">
                  <Button
                    type="button"
                    title="Image block"
                    class="size-4 disabled:text-gray-400"
                    onClick={() => {
                      insert(props.form, fieldArray.name, {
                        at: fieldArray.items.length,
                        value: { type: "image", label: "", image: "" },
                      });
                    }}
                  >
                    <PictureIcon title="Insert image block" />
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
