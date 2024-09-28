import { createAsync } from "@solidjs/router";
import { type Accessor, For, type Setter, Show } from "solid-js";
import { fetchDescendants } from "~/server";
import "~/components/Tabs.css";
import Dialog from "~/components/Dialog";

export default function InternalLink(props: {
  path: string;
  parent: string;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  setSelected: Setter<string>;
  selected: Accessor<string>;
}) {
  const descendants = createAsync(() => fetchDescendants(1));

  return (
    <>
      <Show when={descendants()} fallback={<p>nothing here</p>}>
        <div>
          <Dialog
            title="Select page to link to"
            open={props.open()}
            onOpenChange={props.setOpen}
            omitTrigger
          >
            <div class="">
              <ul class="flex flex-wrap gap-y-4 gap-x-4 my-2">
                <For each={descendants()}>
                  {(descendant) => (
                    <li class="space-x-2">
                      <input
                        type="radio"
                        name="--just-has-to-be-the-same--"
                        id={`select-page-${descendant.id}`}
                        onClick={() => {
                          props.setSelected(descendant.path);
                        }}
                        checked={props.selected() === descendant.path}
                        class="text-black border cursor-pointer"
                      />

                      <ul class="inline-flex flex-col">
                        <li>
                          <label
                            for={`select-page-${descendant.id}`}
                            title={`Select ${descendant.object.title}`}
                            class="cursor-pointer"
                          >
                            {descendant.object.title}
                          </label>
                        </li>
                        <li class="text-slate-300">{descendant.path}</li>
                      </ul>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </Dialog>
        </div>
      </Show>
    </>
  );
}
