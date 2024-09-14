import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import type { ContentObject } from "~/server";
import ViewPage from "../blocks/page/ViewPage";

export default function ContentObjectDefaultView(props: {
  item: ContentObject;
}) {
  return (
    <>
      <Toolbar item={props.item} />
      <Navbar item={props.item} pathPrefix="" />
      <div>
        <div class="flex flex-row space-x-2 mx-2 my-4">
          <Sidebar item={props.item} pathPrefix="" />
          <main class="px-2 bg-white">
            <ViewPage object={props.item.object} errors={props.item.errors} />
          </main>
        </div>
      </div>
    </>
  );
}
