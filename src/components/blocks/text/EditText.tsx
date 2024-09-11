import type { SetStoreFunction } from "solid-js/store";
import type { Errors } from "~/types";
import TiptapEditor from "../../TiptapEditor";
import type { TextBlock } from "../schemas";

export default function EditTextBlock(props: {
  value: TextBlock;
  setStore: SetStoreFunction<TextBlock>;
  errors?: Errors;
}) {
  return (
    <>
      <TiptapEditor {...props} errors={props.errors?.text} />
      {props.errors && (
        <div class="text-red-500">{props.errors?._errors.join("\n")}</div>
      )}
    </>
  );
}
