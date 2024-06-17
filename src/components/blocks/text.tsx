import { Field } from "@modular-forms/solid";
import { For } from "solid-js";
import type { BlockEditFormProps } from "../content/mapping";
import { TextField } from "../input/TextField";
import type { TextBlock } from "./schemas";

export function EditText(props: BlockEditFormProps) {
  return (
    <>
      <Field of={props.form} name={`${props.path}text`}>
        {(field, props) => (
          <TextField
            {...props}
            label="Field text"
            value={field.value}
            error={field.error}
            multiline
          />
        )}
      </Field>
    </>
  );
}

export default function ViewTextBlock(props: {
  object: TextBlock;
}) {
  return (
    <p class="text-sm text-gray-600">
      <For each={props.object.text.split(/\r?\n/)}>
        {(item) => (
          <>
            {item}
            <br />
          </>
        )}
      </For>
    </p>
  );
}
