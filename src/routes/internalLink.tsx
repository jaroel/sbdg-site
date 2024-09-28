import { SidebarGunOnly } from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import "~/components/Tabs.css";
import InternalLink from "~/components/input/internalLink";

export default function InternalLinkView() {
  return (
    <>
      <Toolbar />
      <div>
        <div class="flex space-x-2 mx-2 my-4">
          <SidebarGunOnly />
          <main class="space-y-4 px-2 px- bg-white">
            <InternalLink path="/" parent="home" />
          </main>
        </div>
      </div>
    </>
  );
}
