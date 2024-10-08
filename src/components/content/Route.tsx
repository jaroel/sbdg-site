import { createAsync, useParams } from "@solidjs/router";
import type { JSXElement } from "solid-js";
import { Dynamic, Show } from "solid-js/web";
import { type ContentObject, getContentObjectBySubPath } from "~/server";

export default function ContentObjectRoute(props: {
  component: (props: { item: ContentObject }) => JSXElement;
  deferStream?: boolean;
}) {
  const params = useParams();
  const data = createAsync(() => getContentObjectBySubPath(params.subpath), {
    deferStream: props.deferStream,
  });

  return (
    <Show when={data()}>
      {(data) => <Dynamic component={props.component} item={data()} />}
    </Show>
  );
}
