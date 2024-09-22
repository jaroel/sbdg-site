import { action, createAsync, useAction, useSubmission } from "@solidjs/router";
import { For, createMemo } from "solid-js";
import { SidebarGunOnly } from "~/components/Sidebar";
import Tabs from "~/components/Tabs";
import Button from "~/components/input/Button";
import { FileInput } from "~/components/input/FileInput";
import { listObjects } from "~/largeobject";
import { addFile } from "~/server";

const toErrors = (error: any) => {
  try {
    if (Array.isArray(error.cause._errors)) {
      return error.cause;
    }
  } catch {}
};

function ImageListing() {
  const oids = createAsync(listObjects, { initialValue: [] });

  return (
    <div class="p-4">
      <p>
        {oids().length
          ? "Listing of uploaded files"
          : "Sorry, no images uploaded."}
      </p>

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
  const submitForm = useAction(addFileAction);
  const formSubmission = useSubmission(addFileAction);
  const formErrors = createMemo(() => {
    try {
      if (Array.isArray(formSubmission.result?._errors)) {
        return formSubmission.result;
      }
    } catch {}
  });

  return (
    <div class="p-4">
      <form
        method="post"
        action={addFileAction}
        encoding="multipart/form-data"
        onsubmit={async (event) => {
          event.preventDefault();
          await submitForm(new FormData(event.currentTarget, event.submitter));
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
            Upload image
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ImagesView() {
  return (
    <>
      <div class="text-right bg-blue-100">
        <a class="mr-4" href="/" title="Go to the home page">
          home
        </a>
        <a class="mr-4" href="/images" title="Manage images">
          images
        </a>
      </div>
      <div>
        <div class="flex space-x-2 mx-2 my-4">
          <SidebarGunOnly />
          <main class="space-y-4 px-2 bg-white">
            <Tabs
              label="Image management"
              items={[
                { id: "1", title: "Listing", content: () => <ImageListing /> },
                { id: "2", title: "Upload", content: () => <FileAddForm /> },
              ]}
            />
          </main>
        </div>
      </div>
    </>
  );
}
