import { Show, useContext } from "solid-js";
import { For } from "solid-js/web";
import geweer from "~/assets/copy_of_geweersteyr.jpg?w=168&format=avif;webp;jpeg&as=picture";
import Picture from "~/components/Picture";
import { ContentObjectContext } from "./content/context";

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
  pathPrefix: string;
}) {
  const item = useContext(ContentObjectContext);
  return (
    <>
      <pre class="border">{JSON.stringify(item, null, 2)}</pre>
      <Show when={item?.()}>
        {(item) => (
          <aside class="flex-shrink-0 w-64 bg-gray-200">
            <div class="flex flex-col p-2">
              <ul class="list-outside list-disc ml-4 mb-4">
                <For each={item().children}>
                  {(item) => (
                    <li>
                      <a href={props.pathPrefix + item.path}>
                        {item.object.title}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
              <Picture src={geweer} alt="Geweer" class="ml-auto mr-auto" />
            </div>
          </aside>
        )}
      </Show>
    </>
  );
}
