import { Field, getValue } from "@modular-forms/solid";
import { Show } from "solid-js";
import { AddBlock, EditBlock } from "../Blocks";
import type {
  BlockAddFormProps,
  BlockDeleteFormProps,
  BlockEditFormProps,
} from "../content/mapping";
import { TextField } from "../input/TextField";

export function AddContentObject(props: BlockAddFormProps) {
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
      <Field of={props.form} name={`${props.path}slug`}>
        {(field, fprops) => (
          <div class="flex space-x-2 mx-2 my-4">
            <TextField
              {...fprops}
              label="Slug"
              value={field.value}
              error={field.error}
              required
            />
          </div>
        )}
      </Field>
      <AddBlock form={props.form} path={`${props.path}object.`} />
    </>
  );
}

export function EditContentObject(
  props: BlockEditFormProps & { hideSlugField?: boolean },
) {
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
      <Field of={props.form} name={`${props.path}slug`}>
        {(field, fprops) => (
          <Show
            when={!props.hideSlugField}
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

export function DeleteContentObject(props: BlockDeleteFormProps) {
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

      <Field of={props.form} name={`${props.path}confirmation`}>
        {(field, fprops) => (
          <div class="flex space-x-2 mx-2 my-4">
            <TextField
              {...fprops}
              label="Confirmation"
              placeholder="delete me"
              value={field.value || ""}
              error={field.error}
              required
            />
          </div>
        )}
      </Field>
    </>
  );
}
