import { Field, FieldArray, move } from "@modular-forms/solid";
import { For } from "solid-js";
import { EditBlock, ViewBlocks } from "~/components/Blocks";
import type { BlockEditFormProps } from "../content/mapping";
import { TextField } from "../input/TextField";
import type { PageBlock } from "./schemas";

export default function ViewPage(props: {
  object: PageBlock;
}) {
  return (
    <div>
      <h1>{props.object.title}</h1>
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
            <div class="flex space-x-2 mx-2 my-4">
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
            <div class="flex space-x-2 mx-2 my-4">
              <TextField
                {...fprops}
                label="Page description"
                value={field.value}
                error={field.error}
                required
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
            <div class="space-y-2">
              <For each={fieldArray.items}>
                {(_, index) => (
                  <div>
                    <div class="border-b-2 border-orange-300">
                      <button
                        type="button"
                        title="Move item up"
                        class="size-4 disabled:text-gray-400"
                        disabled={index() === 0}
                        onClick={(event) => {
                          console.log(`${props.path}blocks`, {
                            from: index(),
                            to: index() - 1,
                          });
                          move(props.form, `${props.path}blocks`, {
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
                        onClick={(event) => {
                          console.log(`${props.path}blocks`, {
                            from: index(),
                            to: index() + 1,
                          });
                          move(props.form, `${props.path}blocks`, {
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
