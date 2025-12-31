import { type SetStoreFunction, createStore } from "solid-js/store";
import type { $ZodFormattedError } from "zod/v4/core";
import TiptapEditor from "../../input/TiptapEditor";
import type { TextBlock } from "../schemas";

export default function EditTextBlock(props: {
  value: TextBlock;
  setStore: SetStoreFunction<TextBlock>;
  errors?: $ZodFormattedError<TextBlock>;
}) {
  const [value, setStore] = createStore(props.value.text);
  return (
    <>
      <TiptapEditor
        value={value}
        setStore={setStore}
        errors={props.errors?.text}
      />
      {props.errors && (
        <div class="text-red-500">{props.errors?._errors.join("\n")}</div>
      )}
    </>
  );
}
