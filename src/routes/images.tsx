import { createForm, zodForm } from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import { For, createEffect, createSignal } from "solid-js";
import type * as z from "zod";
import { SidebarGunOnly } from "~/components/Sidebar";
import Tabs from "~/components/Tabs";
import Button from "~/components/input/Button";
import { FileInput } from "~/components/input/FileInput";
import { listObjects } from "~/largeobject";
import { fileAddSchema } from "~/schemas";
import { addFile } from "~/server";

function ImageListing() {
  const [oids, setOids] = createSignal<number[]>([]);
  createEffect(async () => setOids(await listObjects()));
  return (
    <div class="p-4">
      <p>Listing of uploaded files</p>

      <div class="flex flex-wrap gap-2">
        <For each={oids()}>
          {(oid) => (
            <div>
              <img src={`/++file++/id:${oid}`} alt="Preview!" class="w-60" />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

const addFileAction = action(addFile, "addFileAction");

function FileAddForm() {
  const formSubmission = useSubmission(addFileAction);
  const submitForm = useAction(addFileAction);

  const [form, { Form, Field }] = createForm<z.infer<typeof fileAddSchema>>({
    validate: zodForm(fileAddSchema),
    validateOn: "change",
  });

  return (
    <div class="p-4">
      <Form
        onSubmit={async (_, event) =>
          submitForm(new FormData(event.currentTarget, event.submitter))
        }
        method="post"
        action={addFileAction}
        encoding="multipart/form-data"
        class="w-full"
        classList={{
          blur: form.submitting || formSubmission.pending,
        }}
      >
        <div>
          <Field name="someFile" type="File">
            {(field, fprops) => (
              <FileInput
                {...fprops}
                label="Upload a new file"
                error={field.error}
                required
              />
            )}
          </Field>
        </div>
        <div class="py-2 flex items-center justify-end">
          <Button
            type="submit"
            disabled={form.submitting || formSubmission.pending}
            name="routePrefix"
            value="default"
            onClick={console.log}
          >
            Add and view
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default function ImagesView() {
  return (
    <div>
      <div class="flex space-x-2 mx-2 my-4">
        <SidebarGunOnly />
        <main class="space-y-4 px-2 bg-white">
          <Tabs
            label="Image management"
            items={[
              { id: "2", title: "Upload", content: () => <FileAddForm /> },
              { id: "1", title: "Listing", content: () => <ImageListing /> },
            ]}
          />
        </main>
      </div>
    </div>
  );
}
