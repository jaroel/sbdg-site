import { Field } from "@modular-forms/solid";
import type { BlockEditFormProps } from "../content/mapping";
import { TextField } from "../input/TextField";
import type { ImageBlock } from "./schemas";

export function EditImage(props: BlockEditFormProps) {
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
          <TextField
            {...fprops}
            type="text"
            label="fileId"
            value={field.value}
            error={field.error}
          />
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
        <img src={"/++file++/1"} class="w-[400px]" alt="Demo!" />
      )}
    </div>
  );
}
