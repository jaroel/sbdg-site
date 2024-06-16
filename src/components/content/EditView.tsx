import { createForm, getValue, reset, zodForm } from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import { type Accessor, createEffect, createSignal } from "solid-js";
import type * as z from "zod";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { type ContentViews, contentObjectEditSchema } from "~/schemas";
import { type ContentObject, saveContentObject } from "~/server";
import { EditContentObject } from "../blocks/Object";

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
  item: Accessor<ContentObject>;
}) {
  const formSubmission = useSubmission(saveContentObjectAction);
  const submitForm = useAction(saveContentObjectAction);

  const [form, { Form }] = createForm<z.infer<typeof contentObjectEditSchema>>({
    initialValues: toFormData(props.item()),
    validate: zodForm(contentObjectEditSchema),
    validateOn: "change",
  });

  createEffect(() => {
    reset(form, {
      initialValues: toFormData(props.item()),
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
          onSubmit={async (_, event) => {
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
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/edit" />
            <main class="w-full px-2 bg-white">
              <EditContentObject form={form} path="" />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:text-gray-300 disabled:bg-gray-400"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="edit"
              onClick={() => setRoutePrefix("edit")}
            >
              Save
            </button>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:text-gray-300 disabled:bg-gray-400"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="default"
              onClick={() => setRoutePrefix("default")}
            >
              Save and view
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
