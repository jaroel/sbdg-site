import { action, useSubmission } from "@solidjs/router";
import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { mergeErrors } from "~/lib";
import { type ContentObject, saveContentObjectRoot } from "~/server";
import { EditContentObject } from "./EditView";
import ContentObjectFormView from "./FormView";

export const saveContentObjectRootAction = action(
  saveContentObjectRoot,
  "saveContentObjectRootAction",
);

export default function ContentObjectEditRootView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(saveContentObjectRootAction);
  const formErrors = createMemo(() => {
    try {
      if (Array.isArray(formSubmission.result?._errors)) {
        return formSubmission.result;
      }
    } catch {}
  });
  const [value, setStore] = createStore(props.item);
  const errors = createMemo(() => mergeErrors(props.item.errors, formErrors()));

  return (
    <>
      <ContentObjectFormView
        item={props.item}
        action={saveContentObjectRootAction}
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
