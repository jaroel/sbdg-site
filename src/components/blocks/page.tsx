import { Field, FieldArray } from "@modular-forms/solid";
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
            <For each={fieldArray.items}>
              {(_, index) => (
                <EditBlock
                  form={props.form}
                  path={`${fieldArray.name}.${index()}.`}
                />
              )}
            </For>
          </div>
        )}
      </FieldArray>
    </>
  );
}
