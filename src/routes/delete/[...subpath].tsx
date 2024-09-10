import { lazy } from "solid-js";
import ContentObjectRoute from "~/components/content/Route";

const ContentObjectDeleteView = lazy(
  () => import("~/components/content/DeleteView"),
);

export default function DeleteRoute() {
  return <ContentObjectRoute component={ContentObjectDeleteView} />;
}
