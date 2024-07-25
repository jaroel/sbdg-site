import { type RouteDefinition, createAsync, useParams } from "@solidjs/router";
import type { JSXElement } from "solid-js";
import { Dynamic, Show } from "solid-js/web";
import { type ContentObject, getContentObjectBySubPath } from "~/server";

export const contentLoadRouteDefinition = {
  async load({ params }) {
    return await getContentObjectBySubPath(params.subpath);
  },
} satisfies RouteDefinition;

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
      {(item) => <Dynamic component={props.component} item={item()} />}
    </Show>
  );
}
