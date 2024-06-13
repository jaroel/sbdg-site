import { For } from "solid-js";
import type { TextBlock } from "./schemas";

export default function ViewTextBlock(props: {
  object: TextBlock;
}) {
  return (
    <p class="text-sm text-gray-600">
      <For each={props.object.text.split("\n")}>
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
