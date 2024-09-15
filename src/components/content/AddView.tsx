import { useSubmission } from "@solidjs/router";
import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import type { ContentObjectAddFormSchema } from "~/schemas";
import type { ContentObject } from "~/server";
import type { Errors } from "~/types";
import EditPageBlock from "../blocks/page/EditPage";
import { TextField } from "../input/TextField";
import ContentObjectFormView from "./FormView";
import { addContentObjectAction } from "./actions";

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
  const [slug, setSlug] = createSignal("a-new-page");

  return (
    <>
      <ContentObjectFormView
        item={props.item}
        action={addContentObjectAction}
        pathPrefix="/add"
        additionalTitle={store.title}
        buttonA={{
          routePrefix: "edit",
          title: "Add and edit",
        }}
        buttonB={{
          routePrefix: "default",
          title: "Add and view",
        }}
      >
        <input type="hidden" name="parentId" value={props.item.id} />
        <input type="hidden" name="object" value={JSON.stringify(store)} />
        <div class="flex space-x-2 mx-2 my-4">
          <TextField
            label="Slug"
            value={slug()}
            onInput={(event) => {
              setSlug(event.currentTarget.value);
            }}
            name="slug"
            error={formErrors()?.slug}
            required
          />
        </div>
        <EditPageBlock
          value={store}
          setStore={setStore}
          errors={formErrors()?.object}
        />
      </ContentObjectFormView>
    </>
  );
}
