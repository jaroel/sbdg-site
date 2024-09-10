import { Button } from "@kobalte/core/button";
import { For } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import type { Errors } from "~/types";
import {
  // ArchiveBoxXMarkIcon,
  // ArrowDownIcon,
  // ArrowUpIcon,
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
        <label>Page blocks</label>
        {false && <div class="text-red-500">{"fieldArray.error"}</div>}
        <div class="space-y-4 mt-2">
          <For each={props.value.blocks}>
            {(value) => {
              switch (value.type) {
                case "text": {
                  const [store, setStore] = createStore(value);
                  return <EditText value={store} setStore={setStore} />;
                }
                case "image": {
                  const [store, setStore] = createStore(value);
                  return <EditImage value={store} setStore={setStore} />;
                }
                case "nested": {
                  const [store, setStore] = createStore(value);
                  return <EditNested value={store} setStore={setStore} />;
                }
                default:
                  assertCannotReach(value);
              }
            }}
          </For>
        </div>
        <div>
          <header>Insert a new block!</header>

          <div class="border-b border-orange-300 divide-x flex flex-row">
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
