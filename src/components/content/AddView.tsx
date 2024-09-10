import { action, useSubmission } from "@solidjs/router";
import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import type { ContentObjectAddFormSchema } from "~/schemas";
import { type ContentObject, addContentObject } from "~/server";
import type { Errors } from "~/types";
import { AddContentObject } from "../blocks/Object";
import Button from "../input/Button";

const addContentObjectAction = action(
  addContentObject,
  "addContentObjectAction",
);

export default function ContentObjectAddView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(addContentObjectAction);
  const formErrors = createMemo<Errors | undefined>(() => {
    try {
      if (Array.isArray(formSubmission.error.cause._errors)) {
        return formSubmission.error.cause;
      }
    } catch {}
  });

  const [store, setStore] = createStore<ContentObjectAddFormSchema["object"]>({
    type: "page",
    title: "A new page!",
    blocks: [],
  });

  return (
    <>
      <Toolbar item={props.item} />
      <Navbar
        item={props.item}
        pathPrefix="/add"
        additionalTitle={store.title}
      />
      <div>
        <form
          method="post"
          action={addContentObjectAction}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: formSubmission.pending,
          }}
          noValidate
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/add" />
            <main class="px-2 bg-white">
              <AddContentObject
                parent={props.item}
                value={store}
                setStore={setStore}
                errors={formErrors()}
              />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              disabled={formSubmission.pending}
              name="routePrefix"
              value="edit"
            >
              Add and edit
            </Button>
            <Button
              type="submit"
              disabled={formSubmission.pending}
              name="routePrefix"
              value="default"
            >
              Add and view
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
