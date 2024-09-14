import { action, useSubmission } from "@solidjs/router";
import { Show, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { mergeErrors } from "~/lib";
import { type ContentObject, saveContentObject } from "~/server";
import type { Errors } from "~/types";
import { EditContentObject } from "../blocks/Object";
import Button from "../input/Button";

const saveContentObjectAction = action(
  saveContentObject,
  "saveContentObjectAction",
);

export default function ContentObjectEditView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(saveContentObjectAction);
  const formErrors = createMemo<Errors | undefined>(() => {
    try {
      if (Array.isArray(formSubmission.error.cause._errors)) {
        return formSubmission.error.cause;
      }
    } catch {}
  });
  const [value, setStore] = createStore(props.item);
  const errors = createMemo<Errors>(() =>
    mergeErrors(props.item.errors, formErrors()),
  );

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
          action={saveContentObjectAction}
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
                errors={errors()}
                hideSlugField={false}
              />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Show when={formErrors()?._errors.length}>
              <div class="border-b border-red-600 text-red-500 filter grayscale-0">
                Validation failure: {JSON.stringify(errors()._errors)}. Call
                Roel.
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
