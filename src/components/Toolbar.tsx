import { createAsync } from "@solidjs/router";
import { createMemo } from "solid-js";
import type { ContentObject } from "~/server";
import { getSessionData } from "~/session.server";

export default function Toolbar(props: {
  item?: ContentObject;
}) {
  const session = createAsync(getSessionData);
  const userId = createMemo(() => session()?.userId);

  return (
    <div class="text-right bg-blue-100">
      {props.item && userId() && (
        <>
          <a
            class="mr-4"
            href={`/delete${props.item.content.path}`}
            title="Delete this item"
          >
            delete
          </a>
          <a
            class="mr-4"
            href={`/add${props.item.content.path}`}
            title="Add a new item here"
          >
            add
          </a>
          <a
            class="mr-4"
            href={`/edit${props.item.content.path}`}
            title="Edit this item"
          >
            edit
          </a>
          <a class="mr-4" href={props.item.content.path} title="View this item">
            view
          </a>
        </>
      )}
      <a class="mr-4" href="/" title="Go to the home page">
        home
      </a>
      <a class="mr-4" href="/images" title="Manage images">
        images
      </a>
      <a class="mr-4" href="/icons" title="View Icons">
        icons
      </a>
      {userId() ? (
        <a class="mr-4" href="/logout" title="Logout">
          logout
        </a>
      ) : (
        <a class="mr-4" href="/login" title="Login">
          login
        </a>
      )}
    </div>
  );
}
