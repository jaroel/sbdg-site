import type { Accessor } from "solid-js";
import { For } from "solid-js/web";
import geweer from "~/assets/copy_of_geweersteyr.jpg?w=168&format=avif;webp;jpeg&as=picture";
import Picture from "~/components/Picture";
import type { ContentObject } from "~/server";

export function SidebarGunOnly() {
  return (
    <aside class="flex-shrink-0 w-64 bg-gray-200">
      <div class="flex flex-col p-2">
        <Picture src={geweer} alt="Geweer" class="ml-auto mr-auto" />
      </div>
    </aside>
  );
}

export default function Sidebar(props: {
  item: Accessor<ContentObject>;
  pathPrefix: string;
}) {
  return (
    <aside class="flex-shrink-0 w-64 bg-gray-200">
      <div class="flex flex-col p-2">
        <ul class="list-outside list-disc ml-4 mb-4">
          <For each={props.item().children}>
            {(item) => (
              <li>
                <a href={props.pathPrefix + item.path}>{item.object.title}</a>
              </li>
            )}
          </For>
        </ul>
        <Picture src={geweer} alt="Geweer" class="ml-auto mr-auto" />
      </div>
    </aside>
  );
}
