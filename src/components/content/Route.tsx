import { type RouteDefinition, createAsync, useParams } from "@solidjs/router";
import type { Accessor, JSXElement } from "solid-js";
import { Show } from "solid-js/web";
import { type ContentObject, getContentObjectBySubPath } from "~/server";

export const contentLoadRouteDefinition = {
  async load({ params }) {
    return await getContentObjectBySubPath(params.subpath);
  },
} satisfies RouteDefinition;

export default function ContentObjectRoute(props: {
  component: (item: Accessor<ContentObject>) => JSXElement;
  deferStream?: boolean;
}) {
  const params = useParams();
  const data = createAsync(() => getContentObjectBySubPath(params.subpath), {
    deferStream: props.deferStream,
  });
  return <Show when={data()}>{props.component}</Show>;
}
