import { Field, setValue } from "@modular-forms/solid";
import { For, createEffect, createSignal } from "solid-js";
import { listObjects } from "~/largeobject";
import Dialog from "../Dialog";
import type { BlockEditFormProps } from "../content/mapping";
import Button from "../input/Button";
import { SelectFieldValueFallback } from "../input/Select";
import { TextField } from "../input/TextField";
import type { ImageBlock } from "./schemas";

export function EditImage(props: BlockEditFormProps) {
  const [oids, setOids] = createSignal<number[]>([]);
  createEffect(async () => setOids(await listObjects()));
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <Field of={props.form} name={`${props.path}label`}>
        {(field, fprops) => (
          <TextField
            {...fprops}
            label="Image label"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>
      <Field of={props.form} name={`${props.path}image`}>
        {(field, fprops) => (
          <TextField
            {...fprops}
            label="Image name?"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>

      <Field of={props.form} name={`${props.path}fileId`}>
        {(field, fprops) => (
          <>
            <div>
              <SelectFieldValueFallback
                {...fprops}
                label="File Id"
                placeholder="Please select a value"
                options={() =>
                  oids().map((oid) => {
                    return { label: `OID: ${oid}`, value: `id:${oid}` };
                  })
                }
                value={field.value}
                error={field.error}
              />
            </div>
            <div>
              <p>Image browser</p>
              <Dialog
                title="Choose an image"
                open={open()}
                onOpenChange={setOpen}
              >
                <ul class="flex flex-row space-x-2">
                  <For each={oids()}>
                    {(oid) => (
                      <li>
                        <Button
                          name="routePrefix"
                          value="default"
                          onClick={() => {
                            setValue(props.form, field.name, `id:${oid}`);
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
              </Dialog>
            </div>
          </>
        )}
      </Field>
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
