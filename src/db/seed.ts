import { db } from "./db";

export const seed = async () => {
  const root = await db.contentObjects.create({
    path: "/",
    object: {
      type: "page",
      title: "Welkom",
      description:
        "Welkom bij de internetpagina van schietbond Dinxperlo-Gendringen",
      blocks: [
        {
          type: "text",
          text: "Op onze site zijn alle uitslagen en standen te vinden",
        },
        {
          type: "text",
          text: "Ook de gegevens van onze leden.",
        },
        {
          type: "text",
          text: "Namens het bestuur wens ik u veel leesplezier.",
        },
        {
          type: "text",
          text: "Laatste update;  22-05-24",
        },
        {
          type: "text",
          text: "1e) Uitslagen na de laatste ronde 2023/2024 ",
        },
      ],
    },
  });

  const persoonlijkGemiddelde = await db.contentObjects.create({
    parentId: root.id,
    path: "/persoonlijk-gemiddelde",
    object: {
      type: "page",
      title: "Persoonlijk gemiddelde",
      description:
        "De persoonlijke gemiddelde is het gemiddelde van de uitslag van de afgelopen ronde. Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde. Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
      blocks: [
        {
          type: "text",
          text: "[TODO: folder listing]",
        },
        {
          type: "nested",
          nestedTitle: "Ik ben nested - texts",
          texts: [
            { type: "text", text: "Nested text A" },
            { type: "text", text: "Nested text B" },
          ],
        },
        {
          type: "nested",
          nestedTitle: "Ik ben nested - no texts",
        },
      ],
    },
  });

  await db.contentObjects.create({
    parentId: persoonlijkGemiddelde.id,
    path: "/persoonlijk-gemiddelde/2023-2024",
    object: {
      type: "page",
      title: "Persoonlijk gemiddelde - 2023-2024",
      description: "Persoonlijke resultaten seizoen 2023 / 2024",
      blocks: [
        {
          type: "text",
          text: "[TODO: a table]",
        },
      ],
    },
  });

  await db.$close();
};
