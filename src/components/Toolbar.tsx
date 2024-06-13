import type { Accessor } from "solid-js";
import type { ContentObject } from "~/server";

export default function Toolbar(props: {
  item: Accessor<ContentObject>;
}) {
  return (
    <div class="text-right bg-blue-100">
      <a class="mr-4" href={`/add${props.item().object.path}`}>
        add
      </a>
      <a class="mr-4" href={`/edit${props.item().object.path}`}>
        edit
      </a>
      <a class="mr-4" href={props.item().object.path}>
        view
      </a>
      <a class="mr-4" href="/">
        home
      </a>
    </div>
  );
}
