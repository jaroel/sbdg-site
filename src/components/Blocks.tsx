import { For } from "solid-js/web";
import { EditPage, ViewPage } from "~/components/blocks/page";
import ViewTextBlock from "~/components/blocks/text";
import type { BlockTypes } from "./blocks/schemas";

export function ViewBlocks(props: {
  blocks: BlockTypes[];
}) {
  return (
    <For each={props.blocks}>
      {(item) => {
        switch (item.type) {
          case "page":
            return <ViewPage object={item} />;
          case "text":
            return <ViewTextBlock object={item} />;
        }
      }}
    </For>
  );
}

export function EditBlocks(props: {
  blocks: BlockTypes[];
}) {
  return (
    <For each={props.blocks}>
      {(item) => {
        switch (item.type) {
          case "page":
            return <EditPage object={item} />;
          case "text":
            return <ViewTextBlock object={item} />;
        }
      }}
    </For>
  );
}
