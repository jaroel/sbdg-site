import { createForm, getValue, reset, zodForm } from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import { Show, createEffect, createSignal } from "solid-js";
import type * as z from "zod";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { type ContentViews, contentObjectEditSchema } from "~/schemas";
import { type ContentObject, saveContentObject } from "~/server";
import { EditContentObject } from "../blocks/Object";
import Button from "../input/Button";

const saveContentObjectAction = action(
  saveContentObject,
  "saveContentObjectAction",
);

const toFormData = (
  item: ContentObject,
): z.infer<typeof contentObjectEditSchema> => {
  return {
    ...item,
    slug: item.path.slice(item.path.lastIndexOf("/") + 1),
  };
};

export default function ContentObjectEditView(props: {
  item: ContentObject;
}) {
  const formSubmission = useSubmission(saveContentObjectAction);
  const submitForm = useAction(saveContentObjectAction);

  const [form, { Form }] = createForm<z.infer<typeof contentObjectEditSchema>>({
    initialValues: toFormData(props.item),
    validate: zodForm(contentObjectEditSchema),
    validateOn: "change",
  });

  createEffect(() => {
    reset(form, {
      initialValues: toFormData(props.item),
    });
  });

  const [routePrefix, setRoutePrefix] = createSignal<ContentViews>("edit");

  return (
    <>
      <Toolbar item={props.item} />
      <Navbar
        item={props.item}
        pathPrefix="/edit"
        titleOverride={getValue(form, "object.title")}
      />
      <div>
        <Form
          onSubmit={async (values, event) => {
            const formData = new FormData(event.currentTarget, event.submitter);
            formData.append("routePrefix", routePrefix());
            await submitForm(formData);
          }}
          method="post"
          action={saveContentObjectAction}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: form.submitting || formSubmission.pending,
            "border border-red-600": form.invalid,
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/edit" />
            <main class="w-full px-2 bg-white">
              <EditContentObject form={form} path="" />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Show when={form.response.message}>
              <div class="border-b border-red-600 text-red-500 filter grayscale-0">
                Validation failure: {JSON.stringify(form.response)}. Call Roel.
              </div>
            </Show>
            <Button
              type="submit"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="edit"
              onClick={() => setRoutePrefix("edit")}
            >
              Save
            </Button>
            <Button
              type="submit"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="default"
              onClick={() => setRoutePrefix("default")}
            >
              Save and view
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
