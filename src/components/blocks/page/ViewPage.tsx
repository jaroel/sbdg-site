import { HttpStatusCode } from "@solidjs/start";
import { For } from "solid-js";
import ViewImageBlock from "../image/ViewImage";
import ViewNestedBlock from "../nested/ViewNested";
import type { PageBlock } from "../schemas";
import ViewTextBlock from "../text/ViewText";

export default function ViewPage(props: {
  object: PageBlock;
}) {
  return (
    <div>
      <h1>{props.object.title}</h1>
      <HttpStatusCode code={props.object.status || 200} />
      <p class="text-sm text-gray-600 mb-2">{props.object.description}</p>

      <For each={props.object.blocks}>
        {(value) => {
          switch (value.type) {
            case "text": {
              return <ViewTextBlock value={value} />;
            }
            case "image": {
              return <ViewImageBlock object={value} />;
            }
            case "nested": {
              return <ViewNestedBlock object={value} />;
            }
            default:
              assertCannotReach(value);
          }
        }}
      </For>
    </div>
  );
}

function assertCannotReach(value: never) {
  throw new Error("Shouldn't reach");
}
