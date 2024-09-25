import { HttpStatusCode } from "@solidjs/start";
import { ErrorBoundary, For, Show } from "solid-js";
import type { ZodFormattedError, z } from "zod";
import type { contentObjectSchema } from "~/schemas";
import ViewImageBlock from "../image/ViewImage";
import ViewNestedBlock from "../nested/ViewNested";
import type { PageBlock, PageBlockBlocks } from "../schemas";
import ViewTableBlock from "../table/ViewTable";
import ViewTextBlock from "../text/ViewText";

export default function ViewPage(props: {
  object: PageBlock;
  errors?: ZodFormattedError<z.infer<typeof contentObjectSchema>>["content"];
}) {
  return (
    <div>
      <h1>{props.object.title}</h1>
      <HttpStatusCode code={props.object.status_code || 200} />
      <p class="text-sm text-gray-600 mb-2">{props.object.description}</p>

      {props.errors && (
        <div class="text-red-500">
          {props.errors._errors.join("\n")}

          {props.errors.createdAt?._errors.join("\n")}
          {props.errors.id?._errors.join("\n")}
          {props.errors.parentId?._errors.join("\n")}
          {props.errors.path?._errors.join("\n")}
          {props.errors.updatedAt?._errors.join("\n")}
          {props.errors.object?._errors.join("\n")}
          {props.errors.object?.blocks?._errors.join("\n")}
        </div>
      )}

      <For each={props.object.blocks}>
        {(value, index) => {
          return (
            <ErrorBoundary
              fallback={() => {
                const blockErrors = () =>
                  props.errors?.object?.blocks?.[index()];
                return (
                  <div class="text-red-500">
                    <p>blockErrors:</p>
                    <pre>{JSON.stringify(blockErrors())}</pre>
                    <p>This value broke:</p>
                    <pre>{JSON.stringify({ value })}</pre>
                  </div>
                );
              }}
            >
              <BlockItem value={value} />
            </ErrorBoundary>
          );
        }}
      </For>
    </div>
  );
}

function BlockItem(props: { value: PageBlockBlocks }) {
  const value = props.value;
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
    case "table": {
      return <ViewTableBlock object={value} />;
    }
    default:
      assertCannotReach(value);
  }
}

function assertCannotReach(value: never) {
  throw new Error("Shouldn't reach", { cause: value });
}
