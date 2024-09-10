import { For } from "solid-js";
import type { NestedBlock } from "../schemas";
import ViewTextBlock from "../text/ViewText";

export default function ViewNestedBlock(props: {
  object: NestedBlock;
}) {
  return (
    <div class="ml-4">
      <p class="text-xl text-gray-600">{props.object.nestedTitle}</p>
      <For each={props.object.texts}>
        {(value) => {
          return <ViewTextBlock value={value} />;
        }}
      </For>
    </div>
  );
}
