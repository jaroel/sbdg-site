import type { Accessor } from "solid-js";
import { ViewBlocks } from "~/components/Blocks";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import type { ContentObject } from "~/server";
import { ContentObjectContext } from "./context";

export default function ContentObjectDefaultView(props: {
  item: Accessor<ContentObject>;
}) {
  return (
    <ContentObjectContext.Provider value={props.item}>
      <Toolbar />
      <Navbar pathPrefix="" />
      <div>
        <div class="flex flex-row space-x-2 mx-2 my-4">
          <Sidebar pathPrefix="" />
          <main class="px-2 bg-white">
            <ViewBlocks blocks={[props.item().object]} />
          </main>
        </div>
      </div>
    </ContentObjectContext.Provider>
  );
}
