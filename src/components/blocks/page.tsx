import { EditBlocks, ViewBlocks } from "~/components/Blocks";
import type { PageBlock } from "./schemas";

export function ViewPage(props: {
  object: PageBlock;
}) {
  return (
    <div>
      <h1>{props.object.title}</h1>
      <p class="text-sm text-gray-600 mb-2">{props.object.description}</p>
      <ViewBlocks blocks={props.object.blocks} />
    </div>
  );
}

export function EditPage(props: {
  object: PageBlock;
}) {
  return (
    <div>
      <h1>Edit: {props.object.title}</h1>
      <p class="text-sm text-gray-600 mb-2">{props.object.description}</p>
      <EditBlocks blocks={props.object.blocks} />
    </div>
  );
}
