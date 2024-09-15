import { action, useSubmission } from "@solidjs/router";
import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import type { ContentObjectAddFormSchema } from "~/schemas";
import { type ContentObject, addContentObject } from "~/server";
import type { Errors } from "~/types";
import { AddContentObject } from "../blocks/Object";
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

  return (
    <>
      <ContentObjectFormView
        item={props.item}
        action={addContentObjectAction}
        pathPrefix="/add"
        buttonA={{
          routePrefix: "edit",
          title: "Add and edit",
        }}
        buttonB={{
          routePrefix: "default",
          title: "Add and view",
        }}
      >
        <AddContentObject
          parent={props.item}
          value={store}
          setStore={setStore}
          errors={formErrors()}
        />
      </ContentObjectFormView>
    </>
  );
}
