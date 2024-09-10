import { action, useSubmission } from "@solidjs/router";
import {
  For,
  Show,
  createEffect,
  createMemo,
  createResource,
  createSignal,
} from "solid-js";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import {
  type ContentObject,
  deleteContentObject,
  fetchDescendants,
} from "~/server";
import { DeleteContentObject } from "../blocks/Object";

import type { Errors } from "~/types";
import Button from "../input/Button";

const deleteContentObjectAction = action(
  deleteContentObject,
  "deleteContentObjectAction",
);

const loadDescendants = fetchDescendants;

export default function ContentObjectDeleteView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(deleteContentObjectAction);
  const formErrors = createMemo<Errors | undefined>(() => {
    try {
      if (Array.isArray(formSubmission.error.cause._errors)) {
        return formSubmission.error.cause;
      }
    } catch {}
  });

  const [contentId, setContentId] = createSignal<number>();
  const [descendants] = createResource(contentId, loadDescendants);

  createEffect(() => {
    setContentId(props.item.id);
  });

  return (
    <>
      <Toolbar item={props.item} />
      <Navbar
        item={props.item}
        pathPrefix="/delete"
        additionalTitle="Delete confirmation"
      />
      <div>
        <form
          action={deleteContentObjectAction}
          method="post"
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: formSubmission.pending,
          }}
          noValidate
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/delete" />
            <main class="w-full px-2 bg-white">
              <DeleteContentObject value={props.item} errors={formErrors()} />
              <div class="ml-2">
                The following content objects will be deleted after
                confirmation:
                <ol class="list-decimal list-inside ml-2">
                  <li>
                    <ul class="inline-flex flex-col">
                      <li>{props.item.object.title}</li>
                      <li class="text-slate-300">{props.item.path}</li>
                    </ul>
                  </li>
                  <Show when={descendants() === undefined}>
                    <li>All descendants content objects</li>
                  </Show>
                  <For each={descendants()}>
                    {(item) => (
                      <li>
                        <ul class="inline-flex flex-col">
                          <li>{item.object.title}</li>
                          <li class="text-slate-300">{item.path}</li>
                        </ul>
                      </li>
                    )}
                  </For>
                </ol>
              </div>
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              disabled={formSubmission.pending}
              name="routePrefix"
              value="default"
            >
              Confirm and delete
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
