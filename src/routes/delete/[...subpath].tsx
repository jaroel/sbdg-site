import ContentObjectDeleteView from "~/components/content/DeleteView";
import ContentObjectRoute from "~/components/content/Route";

export default function DeleteRoute() {
  return <ContentObjectRoute component={ContentObjectDeleteView} />;
}
