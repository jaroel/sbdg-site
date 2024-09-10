import type { SetStoreFunction } from "solid-js/store";
import TiptapEditor from "../../TiptapEditor";
import type { TextBlock } from "../schemas";

export default function EditText(props: {
  value: TextBlock;
  setStore: SetStoreFunction<TextBlock>;
}) {
  return (
    <>
      {false && "field.error" && (
        <div class="text-red-500">{"field.error"}</div>
      )}
      <TiptapEditor {...props} />
    </>
  );
}
