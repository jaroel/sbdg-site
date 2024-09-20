import { createAsync } from "@solidjs/router";
import { For, createSignal } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { listObjects } from "~/largeobject";
import type { Errors } from "~/types";
import Dialog from "../../Dialog";
import Button from "../../input/Button";
import { SelectFieldValueFallback } from "../../input/Select";
import { TextField } from "../../input/TextField";
import type { ImageBlock } from "../schemas";

export default function EditImageBlock(props: {
  value: ImageBlock;
  setStore: SetStoreFunction<ImageBlock>;
  errors?: Errors;
}) {
  const oids = createAsync(() => listObjects(), {
    initialValue: [],
  });

  const [open, setOpen] = createSignal(false);
  return (
    <>
      {props.errors?._errors && (
        <div class="text-red-500">{props.errors?._errors.join("\n")}</div>
      )}
      <TextField
        label="Image label"
        value={props.value.label}
        onInput={(event) => {
          props.setStore("label", event.currentTarget.value);
        }}
        error={props.errors?.label}
      />

      {oids().length === 0 && (
        <div class="text-gray-600">
          <p>Image browser</p>
          <p>Sorry, no images uploaded.</p>
        </div>
      )}

      {oids().length && (
        <div class="flex flex-row space-x-4 mt-2">
          <div>
            <SelectFieldValueFallback
              label="File Id"
              placeholder="Please select a value"
              options={() =>
                oids().map((oid) => {
                  return { label: `OID: ${oid}`, value: `id:${oid}` };
                })
              }
              value={props.value.fileId}
              onChange={(event) => {
                props.setStore("fileId", event.currentTarget.value);
              }}
            />
          </div>
          <div>
            <p class="text-gray-600">Image browser</p>
            <Dialog
              title="Choose an image"
              open={open()}
              onOpenChange={setOpen}
            >
              <div class="">
                <ul class="flex flex-wrap space-x-2">
                  <For each={oids()}>
                    {(oid) => (
                      <li>
                        <Button
                          name="routePrefix"
                          value="default"
                          onClick={() => {
                            props.setStore("fileId", `id:${oid}`);
                            setOpen(false);
                          }}
                        >
                          <img
                            class="w-40"
                            src={`/++file++/id:${oid}`}
                            alt="Preview!"
                          />
                        </Button>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}
