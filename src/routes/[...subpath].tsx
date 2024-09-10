import ContentObjectDefaultView from "~/components/content/DefaultView";
import ContentObjectRoute, {} from "~/components/content/Route";

export default function ViewRoute() {
  return (
    <>
      <ContentObjectRoute component={ContentObjectDefaultView} deferStream />
    </>
  );
}
