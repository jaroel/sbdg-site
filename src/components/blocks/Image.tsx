import { Field } from "@modular-forms/solid";
import { Show, createEffect, createSignal } from "solid-js";
import { listObjects } from "~/largeobject";
import type { BlockEditFormProps } from "../content/mapping";
import { Select } from "../input/Select";
import { TextField } from "../input/TextField";
import type { ImageBlock } from "./schemas";

export function EditImage(props: BlockEditFormProps) {
  const [oids, setOids] = createSignal<number[]>([]);
  createEffect(async () => setOids(await listObjects()));
  return (
    <>
      <Field of={props.form} name={`${props.path}label`}>
        {(field, fprops) => (
          <TextField
            {...fprops}
            label="Image label"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>
      <Field of={props.form} name={`${props.path}image`}>
        {(field, fprops) => (
          <TextField
            {...fprops}
            label="Image name?"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>

      <Field of={props.form} name={`${props.path}fileId`}>
        {(field, fprops) => (
          <Show
            when={oids().length}
            fallback={
              <Select
                {...fprops}
                label="File Id"
                placeholder={field.value}
                options={[{ label: field.value, value: field.value }]}
                value={field.value}
                error=""
              />
            }
          >
            <Select
              {...fprops}
              label="File Id"
              placeholder={
                (field.value && `Invalid value: ${field.value}`) ||
                "Please select a value"
              }
              options={oids().map((oid) => {
                return { label: `OID: ${oid}`, value: `id:${oid}` };
              })}
              value={field.value}
              error={field.error}
            />
          </Show>
        )}
      </Field>
    </>
  );
}

export default function ViewImageBlock(props: {
  object: ImageBlock;
}) {
  return (
    <div class="ml-4">
      <p class="text-xl text-gray-600">{props.object.label}</p>
      {props.object.fileId && (
        <img
          src={`/++file++/${props.object.fileId}`}
          class="w-[400px]"
          alt="Demo!"
        />
      )}
    </div>
  );
}
