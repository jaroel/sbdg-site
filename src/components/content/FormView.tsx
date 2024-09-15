import { useSubmission } from "@solidjs/router";
import { Show, createMemo } from "solid-js";
import type { FlowProps } from "solid-js";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import { mergeErrors } from "~/lib";
import type { ContentObject } from "~/server";
import type { Errors } from "~/types";
import Button from "../input/Button";
import type {
  AddContentObjectAction,
  SaveContentObjectAction,
  SaveContentObjectRootAction,
} from "./actions";

export default function ContentObjectFormView(
  props: {
    item: ContentObject;
    action:
      | SaveContentObjectAction
      | SaveContentObjectRootAction
      | AddContentObjectAction;
    pathPrefix: string;
    additionalTitle?: string;
    buttonA: { title: string; routePrefix: string };
    buttonB?: { title: string; routePrefix: string };
  } & FlowProps,
) {
  const formSubmission = useSubmission(props.action);
  const formErrors = createMemo<Errors | undefined>(() => {
    try {
      if (Array.isArray(formSubmission.error.cause._errors)) {
        return formSubmission.error.cause;
      }
    } catch {}
  });

  const errors = createMemo<Errors>(() =>
    mergeErrors(props.item.errors, formErrors()),
  );

  return (
    <>
      <Toolbar item={props.item} />
      <Navbar
        item={props.item}
        pathPrefix={props.pathPrefix}
        titleOverride={props.item.object.title}
        additionalTitle={props.additionalTitle}
      />
      <div>
        <form
          method="post"
          action={props.action}
          encoding="multipart/form-data"
          class="w-full"
          classList={{
            blur: formSubmission.pending,
          }}
          noValidate
        >
          <div class="flex space-x-2 mx-2 my-4">
            <Sidebar item={props.item} pathPrefix="/edit" />
            <main class="w-full px-2 bg-white">{props.children}</main>
          </div>
          <div class="px-4 py-2 flex items-center justify-end gap-x-6">
            <Show when={formErrors()?._errors.length}>
              <div class="border-b border-red-600 text-red-500 filter grayscale-0">
                Validation failure: {JSON.stringify(errors()._errors)}. Call
                Roel.
              </div>
            </Show>
            <Button
              type="submit"
              disabled={formSubmission.pending}
              name="routePrefix"
              value={props.buttonA.routePrefix}
            >
              {props.buttonA.title}
            </Button>
            {props.buttonB && (
              <Button
                type="submit"
                disabled={formSubmission.pending}
                name="routePrefix"
                value={props.buttonB.routePrefix}
              >
                {props.buttonB.title}
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
