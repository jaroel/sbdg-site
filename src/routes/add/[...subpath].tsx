import { lazy } from "solid-js";
import ContentObjectRoute from "~/components/content/Route";

const ContentObjectAddView = lazy(() => import("~/components/content/AddView"));

export default function AddRoute() {
  return <ContentObjectRoute component={ContentObjectAddView} />;
}
