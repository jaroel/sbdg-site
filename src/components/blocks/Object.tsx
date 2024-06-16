import { Field, getValue } from "@modular-forms/solid";
import { Show } from "solid-js";
import { EditBlock } from "../Blocks";
import type { BlockEditFormProps } from "../content/mapping";
import { TextField } from "../input/TextField";

export function EditContenObject(props: BlockEditFormProps) {
  return (
    <>
      <Field of={props.form} name={`${props.path}id`} type="number">
        {(field, fprops) => (
          <input
            {...fprops}
            type="hidden"
            name={field.name}
            value={field.value}
          />
        )}
      </Field>

      <Field of={props.form} name={`${props.path}parentId`} type="number">
        {(field, fprops) => (
          <input
            {...fprops}
            type="hidden"
            name={field.name}
            value={field.value}
          />
        )}
      </Field>

      <Field of={props.form} name="slug">
        {(field, fprops) => (
          <Show
            when={getValue(props.form, `${props.path}parentId`)}
            fallback={
              <input
                {...fprops}
                type="hidden"
                name={field.name}
                value={field.value}
              />
            }
          >
            <div class="flex space-x-2 mx-2 my-4">
              <TextField
                {...fprops}
                label="Slug"
                value={field.value}
                error={field.error}
                required
              />
            </div>
          </Show>
        )}
      </Field>

      <EditBlock form={props.form} path={`${props.path}object.`} />
    </>
  );
}
