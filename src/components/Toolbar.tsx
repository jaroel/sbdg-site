import type { Accessor } from "solid-js";
import type { ContentObject } from "~/server";

export default function Toolbar(props: {
  item: Accessor<ContentObject>;
}) {
  return (
    <div class="text-right bg-blue-100">
      <a class="mr-4" href={`/add${props.item().content.path}`}>
        add
      </a>
      <a class="mr-4" href={`/edit${props.item().content.path}`}>
        edit
      </a>
      <a class="mr-4" href={props.item().content.path}>
        view
      </a>
      <a class="mr-4" href="/">
        home
      </a>
    </div>
  );
}
