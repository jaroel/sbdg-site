import { For, createEffect, createSignal } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { listObjects } from "~/largeobject";
import Dialog from "../Dialog";
import Button from "../input/Button";
import { SelectFieldValueFallback } from "../input/Select";
import { TextField } from "../input/TextField";
import type { ImageBlock } from "./schemas";

export function EditImage(props: {
  value: ImageBlock;
  setStore: SetStoreFunction<ImageBlock>;
}) {
  const [oids, setOids] = createSignal<number[]>([]);
  createEffect(async () => setOids(await listObjects()));
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <TextField
        label="Image label"
        value={props.value.label}
        onInput={(event) => {
          props.setStore("label", event.currentTarget.value);
        }}
      />

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
          <p>Image browser</p>
          <Dialog title="Choose an image" open={open()} onOpenChange={setOpen}>
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
        {false && "field.value" && (
          <div>
            <p>Image preview</p>
            <img
              class="w-40"
              src={`/++file++/${props.value.fileId}`}
              alt="Preview!"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default function ViewImageBlock(props: {
  object: ImageBlock;
}) {
  return (
    <div class="ml-4">
      <p class="text-xl text-gray-600">{props.object.label}</p>
      {props.object.fileId && (
        <img
          src={`/++file++/${props.object.fileId}`}
          class="w-[400px]"
          alt="Demo!"
        />
      )}
    </div>
  );
}
