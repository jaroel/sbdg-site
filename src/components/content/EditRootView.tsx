import { useSubmission } from "@solidjs/router";
import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { mergeErrors } from "~/lib";
import type { ContentObject } from "~/server";
import type { Errors } from "~/types";
import { EditContentObject } from "../blocks/Object";
import ContentObjectFormView from "./FormView";
import { saveContentObjectAction } from "./actions";

export default function ContentObjectEditRootView(props: {
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
      <ContentObjectFormView
        item={props.item}
        action={saveContentObjectAction}
        pathPrefix="/edit"
        buttonA={{
          routePrefix: "edit",
          title: "Save and edit",
        }}
        buttonB={{
          routePrefix: "default",
          title: "Save and view",
        }}
      >
        <EditContentObject
          value={value}
          setStore={setStore}
          errors={errors()}
          hideSlugField={true}
        />
      </ContentObjectFormView>
    </>
  );
}
