import { action, useSubmission } from "@solidjs/router";
import { Show, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { type ContentObject, saveContentObjectRoot } from "~/server";
import type { Errors } from "~/types";
import { EditContentObject } from "../blocks/Object";
import Button from "../input/Button";

const saveContentObjectRootAction = action(
  saveContentObjectRoot,
  "saveContentObjectRootAction",
);

export default function ContentObjectEditRootView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(saveContentObjectRootAction);
  const formErrors = createMemo<Errors | undefined>(() => {
    try {
      if (Array.isArray(formSubmission.error.cause._errors)) {
        return formSubmission.error.cause;
      }
    } catch {}
  });
  const [value, setStore] = createStore(props.item);

  return (
    <>
      <Toolbar item={props.item} />
      <Navbar
        item={props.item}
        pathPrefix="/edit"
        titleOverride={value.object.title}
      />
      <div>
        <form
          method="post"
          action={saveContentObjectRootAction}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: formSubmission.pending,
          }}
          noValidate
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/edit" />
            <main class="w-full px-2 bg-white">
              <EditContentObject
                value={value}
                setStore={setStore}
                errors={formErrors()}
                hideSlugField
              />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Show when={formErrors()?._errors.length}>
              <div class="border-b border-red-600 text-red-500 filter grayscale-0">
                Validation failure: {JSON.stringify(formErrors()?._errors)}.
                Call Roel.
              </div>
            </Show>
            <Button
              type="submit"
              disabled={formSubmission.pending}
              name="routePrefix"
              value="edit"
            >
              Save and edit
            </Button>
            <Button
              type="submit"
              disabled={formSubmission.pending}
              name="routePrefix"
              value="default"
            >
              Save and view
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
