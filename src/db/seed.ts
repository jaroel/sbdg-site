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
          text: "Op onze site zijn alle uitslagen en standen te vinden. Ook de gegevens van onze leden.",
        },
        {
          type: "text",
          text: "Op onze site zijn alle uitslagen en standen te vinden. Ook de gegevens van onze leden.",
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
          text: "1e) Uitslagen na de laatste ronde 2023/2024  (08-04-24)\n2e) Standen na 20 ronden seizoen 2023/2024  (08-04-24)\n3e) Persoonlijke scores seizoen na 20 ronden 2023/2024  (08-04-24)\n4e) uitslagen open kampioenschap Oude IJsselstreek KKP 2024  (08-04-24)\n5e) uitslagen open kampioenschap Oude IJsselstreek LP 2024 (08-04-24)\n6e) uitslagen open kampioenschap Oude IJsselstreek LG+LGO openvizier (22-05-24)\n7e) uitslagen open kampioenschap Oude IJsselstreek LG Knielend 2023 (13-07-23)\n8e) uitslagen open kampioenschap Oude IJsselstreek KKG 50m  2023 (13-07-23)\n9e) uitslagen open kampioenschap Oude IJsselstreek KKG 12m 2023 (22-09-23)\n10e) uitslagen open kampioenschap Oude IJsselstreek kruisboog 2023 (11-10-23)\n11e) uitslagen open kampioenschap Oude IJsselstreek LG staand 2023 (22-11-23)\n12e) totaalstand (tussenstand) 2024  open kampioenschap Oude IJsselstreek  (22-05-24)\n13e) nieuw wedstrijd-reglement  (d.d. 12-09-23)\n14e) wedstrijdschema seizoen 2023-2024 (08-09-23)\n15e) wedstrijdkalender open kampioenschap Oude IJsselstreek  (09-02-24)\n16e) uitnodiging Open schietkampioenschap Oude IJsselstreek (21-03-23 LG wedstrijd toegevoegd)",
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
