import { Button } from "@kobalte/core/button";
import { type Accessor, For } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import type { Errors } from "~/types";
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
import EditImage from "../image/EditImage";
import EditNested from "../nested/EditNested";
import { type PageBlock, pageBlockSchema } from "../schemas";
import EditText from "../text/EditText";

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
}) {
  return (
    <div class="border-b border-orange-300 divide-x flex flex-row">
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

export default function EditPage(props: {
  value: PageBlock;
  setStore: SetStoreFunction<PageBlock>;
  errors?: Errors;
}) {
  return (
    <>
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
        <label class="text-gray-600">Page blocks</label>
        {false && <div class="text-red-500">{"fieldArray.error"}</div>}

        <div class="space-y-4 mt-2">
          <For each={props.value.blocks}>
            {(value, index) => {
              switch (value.type) {
                case "text": {
                  const [store, setStore] = createStore(value);
                  return (
                    <div>
                      <BlockToolbar
                        index={index}
                        value={props.value}
                        setStore={props.setStore}
                      />
                      <EditText value={store} setStore={setStore} />
                    </div>
                  );
                }
                case "image": {
                  const [store, setStore] = createStore(value);
                  return (
                    <div>
                      <BlockToolbar
                        index={index}
                        value={props.value}
                        setStore={props.setStore}
                      />
                      <EditImage value={store} setStore={setStore} />
                    </div>
                  );
                }
                case "nested": {
                  const [store, setStore] = createStore(value);
                  return (
                    <div>
                      <BlockToolbar
                        index={index}
                        value={props.value}
                        setStore={props.setStore}
                      />
                      <EditNested value={store} setStore={setStore} />
                    </div>
                  );
                }
                default:
                  assertCannotReach(value);
              }
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

function assertCannotReach(value: never) {
  throw new Error("Shouldn't reach");
}
