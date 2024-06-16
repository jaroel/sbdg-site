import {
  createForm,
  getErrors,
  getValue,
  reset,
  zodForm,
} from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import { type Accessor, createEffect, createSignal } from "solid-js";
import type * as z from "zod";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { type ContentViews, contentObjectEditSchema } from "~/schemas";
import { type ContentObject, saveContentObject } from "~/server";
import { EditContenObject } from "../blocks/Object";

const saveSLObjectPage = action(saveContentObject, "saveSLObjectPage");

const toFormData = (
  item: ContentObject,
): z.infer<typeof contentObjectEditSchema> => {
  return {
    content: {
      ...item.content,
      parentId: 0,
    },
    slug: "/",
  };
};

export default function ContentObjectEditRootView(props: {
  item: Accessor<ContentObject>;
}) {
  const formSubmission = useSubmission(saveSLObjectPage);
  const submitForm = useAction(saveSLObjectPage);

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
        titleOverride={getValue(form, "content.object.title")}
      />
      <div>
        <Form
          onSubmit={async (_, event) => {
            const formData = new FormData(event.currentTarget, event.submitter);
            formData.append("routePrefix", routePrefix());
            await submitForm(formData);
          }}
          method="post"
          action={saveSLObjectPage}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: form.submitting || formSubmission.pending,
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/edit" />
            <main class="w-full px-2 bg-white">
              <EditContenObject form={form} path="content." />
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:text-gray-300 disabled:bg-gray-400"
              disabled={form.submitting || formSubmission.pending}
              name="routePrefix"
              value="edit"
              onClick={() => {
                setRoutePrefix("edit");
              }}
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
