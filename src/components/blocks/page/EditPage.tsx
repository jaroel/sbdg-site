import { Button } from "@kobalte/core/button";
import { type Accessor, ErrorBoundary, For } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import type { ZodFormattedError } from "zod";
import {
  ArchiveBoxXMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentIcon,
  PictureIcon,
  RectangleStackIcon,
} from "../../Icons";
import { TextField } from "../../input/TextField";
import { textBlockFactory } from "../factories";
import EditImageBlock from "../image/EditImage";
import EditNestedBlock from "../nested/EditNested";
import {
  type PageBlock,
  type PageBlockBlocks,
  pageBlockSchema,
} from "../schemas";
import EditTextBlock from "../text/EditText";

function moveLeft<T>(array: T[], index: number): T[] {
  const head = array.slice(0, index - 1);
  const prev = array[index - 1];
  const current = array[index];
  const tail = array.slice(index + 1);
  return head.concat([current, prev]).concat(tail);
}
function moveRight<T>(array: T[], index: number): T[] {
  const head = array.slice(0, index);
  const current = array[index];
  const next = array[index + 1];
  const tail = array.slice(index + 2);
  return head.concat([next, current]).concat(tail);
}

function BlockToolbar(props: {
  index: Accessor<number>;
  value: PageBlock;
  setStore: SetStoreFunction<PageBlock>;
  errors?: ZodFormattedError<PageBlock>;
}) {
  return (
    <div
      class="border-b divide-x flex flex-row"
      classList={{
        "border-red-500": Boolean(props.errors?._errors),
        "border-orange-300": Boolean(props.errors?._errors) === false,
      }}
    >
      <div>
        <Button
          title="Move item up"
          class="size-4 disabled:text-gray-400"
          disabled={props.index() === 0}
          onClick={() => {
            const values = moveLeft(props.value.blocks, props.index());
            props.setStore("blocks", values);
          }}
        >
          <ArrowUpIcon title="Move item up" />
        </Button>
        <Button
          title="Move item down"
          class="size-4 disabled:text-gray-400"
          disabled={props.index() >= props.value.blocks.length - 1}
          onClick={() => {
            const values = moveRight(props.value.blocks, props.index());
            props.setStore("blocks", values);
          }}
        >
          <ArrowDownIcon title="Move item down" />
        </Button>
      </div>
      <div class="px-2">
        <Button
          title="Delete item"
          class="size-4 disabled:text-gray-400"
          onClick={() => {
            const values = props.value.blocks
              .slice(0, props.index())
              .concat(props.value.blocks.slice(props.index() + 1));
            props.setStore("blocks", values);
          }}
        >
          <ArchiveBoxXMarkIcon title="Remove this block" />
        </Button>
      </div>
    </div>
  );
}

export default function EditPageBlock(props: {
  value: PageBlock;
  setStore: SetStoreFunction<PageBlock>;
  errors?: ZodFormattedError<PageBlock>;
}) {
  return (
    <>
      {props.errors?._errors && (
        <div class="text-red-500">{props.errors?._errors.join("\n")}</div>
      )}
      <div class="mx-2 my-4">
        <TextField
          label="Page title"
          value={props.value.title}
          onInput={(event) => {
            props.setStore("title", event.currentTarget.value);
          }}
          error={props.errors?.title}
          required
        />
      </div>
      <div class="mx-2 my-4">
        <TextField
          label="Page description"
          value={props.value.description}
          onInput={(event) => {
            props.setStore("description", event.currentTarget.value);
          }}
          error={props.errors?.description}
          required
          multiline
        />
      </div>
      <div class="flex flex-col mx-2 my-4">
        <header class="text-gray-600">Page blocks</header>
        {props.errors?.blocks?._errors && (
          <div class="text-red-500">
            {props.errors?.blocks?._errors.join("\n")}
          </div>
        )}
        <div class="space-y-4 mt-2">
          <For each={props.value.blocks}>
            {(value, index) => {
              const blockErrors = () => props.errors?.blocks?.[index()];
              return (
                <div>
                  <div>
                    <BlockToolbar
                      index={index}
                      value={props.value}
                      setStore={props.setStore}
                      errors={props.errors}
                    />
                    <ErrorBoundary
                      fallback={() => {
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
                      <BlockItem
                        value={props.value}
                        setStore={props.setStore}
                        index={index}
                        errors={blockErrors()}
                        item={value}
                      />
                    </ErrorBoundary>
                  </div>
                  {props.errors && (
                    <div class="text-red-500">
                      {props.errors?._errors.join("\n")}
                    </div>
                  )}
                </div>
              );
            }}
          </For>
        </div>
        <div>
          <header class="text-gray-600">Insert a new block!</header>
          <div class="border-b border-orange-300 divide-x flex flex-row mt-1">
            <For each={pageBlockSchema.shape.blocks.element.options}>
              {(option) => {
                const value = option.shape.type.value;
                switch (value) {
                  case "text": {
                    return (
                      <div class="px-1">
                        <Button
                          title="Text block"
                          class="size-4 disabled:text-gray-400"
                          onClick={() => {
                            props.setStore(
                              "blocks",
                              props.value.blocks
                                ? props.value.blocks.length
                                : 0,
                              textBlockFactory("New block!"),
                            );
                          }}
                        >
                          <DocumentIcon title="Insert text block" />
                        </Button>
                      </div>
                    );
                  }
                  case "image": {
                    return (
                      <div class="px-1">
                        <Button
                          title="Image block"
                          class="size-4 disabled:text-gray-400"
                          onClick={() => {
                            props.setStore(
                              "blocks",
                              props.value.blocks
                                ? props.value.blocks.length
                                : 0,
                              {
                                type: "image",
                                label: "",
                                fileId: "",
                              },
                            );
                          }}
                        >
                          <PictureIcon title="Insert image block" />
                        </Button>
                      </div>
                    );
                  }
                  case "nested": {
                    return (
                      <div class="px-1">
                        <Button
                          title="Nested block"
                          class="size-4 disabled:text-gray-400"
                          onClick={() => {
                            props.setStore(
                              "blocks",
                              props.value.blocks
                                ? props.value.blocks.length
                                : 0,
                              { type: "nested", texts: [] },
                            );
                          }}
                        >
                          <RectangleStackIcon title="Insert nested block" />
                        </Button>
                      </div>
                    );
                  }
                  default:
                    assertCannotReach(value);
                }
              }}
            </For>
          </div>
        </div>
      </div>
    </>
  );
}

function BlockItem(props: {
  value: PageBlock;
  setStore: SetStoreFunction<PageBlock>;
  index: Accessor<number>;
  errors?: ZodFormattedError<PageBlock>;
  item: PageBlockBlocks;
}) {
  const value = props.item;
  switch (value.type) {
    case "text": {
      const [store, setStore] = createStore(value);
      return (
        <>
          <EditTextBlock
            value={store}
            setStore={setStore}
            errors={props.errors}
          />
        </>
      );
    }
    case "image": {
      const [store, setStore] = createStore(value);
      return (
        <EditImageBlock
          value={store}
          setStore={setStore}
          errors={props.errors}
        />
      );
    }
    case "nested": {
      const [store, setStore] = createStore(value);
      return (
        <EditNestedBlock
          value={store}
          setStore={setStore}
          errors={props.errors}
        />
      );
    }
    default:
      assertCannotReach(value);
  }
}

function assertCannotReach(value: never) {
  throw new Error("Shouldn't reach", { cause: { value } });
}
