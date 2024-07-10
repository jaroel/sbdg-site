import { createForm, zodForm } from "@modular-forms/solid";
import { action, useAction, useSubmission } from "@solidjs/router";
import type * as z from "zod";
import { SidebarGunOnly } from "~/components/Sidebar";
import Button from "~/components/input/Button";
import { FileInput } from "~/components/input/FileInput";
import { fileAddSchema } from "~/schemas";
import { addFile } from "~/server";

const addFileAction = action(addFile, "addFileAction");

export default function FileAddView() {
  const formSubmission = useSubmission(addFileAction);
  const submitForm = useAction(addFileAction);

  const [form, { Form, Field }] = createForm<z.infer<typeof fileAddSchema>>({
    validate: zodForm(fileAddSchema),
    validateOn: "change",
  });

  return (
    <>
      <div>
        <Form
          onSubmit={async (_, event) => {
            const formData = new FormData(event.currentTarget, event.submitter);
            console.log([...formData]);
            await submitForm(formData);
          }}
          method="post"
          action={addFileAction}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: form.submitting || formSubmission.pending,
          }}
        >
          <div class="flex space-x-2 mx-2 my-4">
            <SidebarGunOnly />
            <main class="px-2 bg-white">
              <Field name="someFile" type="File">
                {(field, fprops) => (
                  <div class="flex space-x-2 mx-2 my-4">
                    <FileInput
                      {...fprops}
                      label="Some file"
                      error={field.error}
                      required
                    />
                  </div>
                )}
              </Field>
            </main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
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
    </>
  );
}
