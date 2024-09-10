import { action, useAction, useSubmission } from "@solidjs/router";
import { For, createEffect, createSignal } from "solid-js";
import { SidebarGunOnly } from "~/components/Sidebar";
import Tabs from "~/components/Tabs";
import Button from "~/components/input/Button";
import { FileInput } from "~/components/input/FileInput";
import { listObjects } from "~/largeobject";
import { addFile } from "~/server";
import type { Errors } from "~/types";

const toErrors = (error: any) => {
  try {
    if (Array.isArray(error.cause._errors)) {
      return error.cause;
    }
  } catch {}
};

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
  const [formErrors, setFormErrors] = createSignal<Errors | undefined>();

  return (
    <div class="p-4">
      <form
        method="post"
        action={addFileAction}
        encoding="multipart/form-data"
        onsubmit={async (event) => {
          event.preventDefault();
          try {
            await submitForm(
              new FormData(event.currentTarget, event.submitter),
            );
            setFormErrors(undefined);
          } catch (error) {
            setFormErrors(toErrors(error));
          }
        }}
        class="w-full"
        classList={{
          blur: formSubmission.pending,
        }}
        noValidate
      >
        <div>
          <FileInput
            name="someFile"
            label="Upload a new file"
            error={formErrors()?.someFile}
            required
          />
        </div>
        <div class="py-2 flex items-center justify-end">
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
