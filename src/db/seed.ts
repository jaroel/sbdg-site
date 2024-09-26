import { textBlockFactory } from "../components/blocks/factories";
import { db } from "./db";
import uitslagenPage from "./example/uitslagen.json";
import { contentObjectBlockSchema } from "./schemas";

export const seed = async () => {
  const root = await db.contentObjects.create({
    path: "/",
    object: {
      type: "page",
      title: "Welkom",
      blocks: [
        textBlockFactory(
          "Op onze site zijn alle uitslagen en standen te vinden. Ook de gegevens van onze leden.",
        ),
        textBlockFactory("Laatste update;  25-06-24"),
        textBlockFactory([
          "1e) Uitslagen na de laatste ronde 2023/2024  (08-04-24)",
          "2e) Standen na 20 ronden seizoen 2023/2024  (08-04-24)",
          "3e) Persoonlijke scores seizoen na 20 ronden 2023/2024  (08-04-24)",
          '4e) uitslagen open kampioenschap "Oude IJsselstreek" KKP 2024  (08-04-24)',
          '5e) uitslagen open kampioenschap "Oude IJsselstreek" LP 2024 (08-04-24)',
          '6e) uitslagen open kampioenschap "Oude IJsselstreek" LG+LGO open vizier (22-05-24)',
          '7e) uitslagen open kampioenschap "Oude IJsselstreek" LG Knielend 2024 (19-06-24)',
          '8e) uitslagen open kampioenschap "Oude IJsselstreek" KKG 50m  2024 (25-06-24)',
          '9e) uitslagen open kampioenschap "Oude IJsselstreek" KKG 12m 2023 (22-09-23)',
          '10e) uitslagen open kampioenschap "Oude IJsselstreek" kruisboog 2023 (11-10-23)',
          '11e) uitslagen open kampioenschap "Oude IJsselstreek" LG staand 2023 (22-11-23)',
          '12e) totaalstand (tussenstand) 2024  open kampioenschap "Oude IJsselstreek"  (25-06-24)',
          "13e) nieuw wedstrijd-reglement  (d.d. 12-09-23)",
          "14e) wedstrijdschema seizoen 2023-2024 (08-09-23)",
          '15e) wedstrijdkalender open kampioenschap "Oude IJsselstreek"  (09-02-24)',
          "16e) uitnodiging Open schietkampioenschap Oude IJsselstreek (21-03-23 LG wedstrijd toegevoegd)",
        ]),
        textBlockFactory("Namens het bestuur wens ik u veel leesplezier."),
        {
          type: "nested",
          texts: [
            textBlockFactory("setCopyBuffersetCopyBuffer"),
            textBlockFactory("setCopyBuffersetCopyBuffer"),
            textBlockFactory("setCopyBuffersetCopyBuffer"),
          ],
          nestedTitle: "setCopyBuffer",
        },
        {
          type: "nested",
          texts: [textBlockFactory("setCopyBuffersetCopyBuffer")],
          nestedTitle: "setCopyBuffersetCopyBuffer",
        },
      ],
      description:
        "Welkom bij de internetpagina van schietbond Dinxperlo-Gendringen",
    },
  });

  const persoonlijkGemiddelde = await db.contentObjects.create({
    parentId: root.id,
    path: "/persoonlijk-gemiddelde",
    object: {
      type: "page",
      title: "Persoonlijk gemiddelde",
      blocks: [
        textBlockFactory([
          "De persoonlijke gemiddelde is het gemiddelde van de uitslag van de afgelopen ronde.",
          "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
          "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
        ]),
        textBlockFactory([
          "De persoonlijke gemiddelde is het gemiddelde van de uitslag van de afgelopen ronde.",
          "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
          "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
        ]),
      ],
      description:
        "De persoonlijke gemiddelde is het gemiddelde van de uitslag van de afgelopen ronde.\r\nHet persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.\r\nHet persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
    },
  });

  await db.contentObjects.create({
    parentId: persoonlijkGemiddelde.id,
    path: "/persoonlijk-gemiddelde/2023-2024",
    object: contentObjectBlockSchema.parse(uitslagenPage),
  });

  await db.contentObjects.create({
    parentId: root.id,
    path: "/uitslagen",
    object: {
      type: "page",
      title: "Uitslagen",
      blocks: [textBlockFactory("dada"), textBlockFactory("dada")],
    },
  });

  await db.contentObjects.create({
    parentId: root.id,
    path: "/bestuur",
    object: {
      type: "page",
      title: "Bestuur",
      blocks: [
        textBlockFactory([
          "Bestuur Schietbond Dinxperlo Gendringen",
          "Voorzitter: Dhr. W.G.J. Vinkenvleugel, st. Hubertus",
          "Secetaris:  Dhr. G.J.W.  Doornink, Halfweg",
          "Penningmeester: Dhr. J.G. Bruggink, Halfweg",
          "Competitieleider: Dhr. J.G. Bruggink, Halfweg",
          "E-mail gerardbruggink@gmail.com",
          "Indien men de uitslagen en standen per e-mail wil ontvangen, gaarne uw adres doorgeven aan bovenstaand e-mail adres.",
          "Wedstrijdformulieren, voor vrijdagavond 23;00 uur, inleveren bij de competitieleider.",
        ]),
        textBlockFactory([
          "Bondsbestuurslid",
          "Dhr. Th. Geerts, De Strangschutters",
          "Dhr. J. Robben,  Eendracht",
          "Dhr. G. Kniest,  Z.S.V.",
          "Dhr. G. Bekker,  V.S.V.",
          "Dhr. J.  Egbers,  Ulto",
        ]),
      ],
    },
  });

  await db.contentObjects.create({
    parentId: root.id,
    path: "/oude-ijsselstreek",
    object: {
      type: "page",
      title: 'Kampioenschap gemeente "Oude IJsselstreek"',
      blocks: [
        textBlockFactory([
          "De gezamenlijke schietverenigingen, binnen deze gemeente, organiseren wederom het kampioenschap van deze gemeente. Deze kampioenschappen zijn uniek omdat  jaarlijks zeven verschillende disciplines op zeven verschillende locaties binnen onze gemeente grenzen worden verschoten.",
          "a. lp luchtpistool, geen minimale leeftijd.",
          "b. 12m knielend Lucht geweer, geen minimale leeftijd.",
          "c. kkg  50m  Klein kaliber geweer,  vanaf 16 jaar.",
          "d. kkg. 12m  Klein kaliber geweer,  vanaf 16 jaar.",
          "e. kkp.   Klein kaliber pistool,  vanaf 16 jaar.",
          "f. lg. 10m vrij staand en staand opgelegd Lucht geweer vanaf 12 jaar.",
          "f. lg. 9m staand en staand opgelegd Lucht geweer open-vizier vanaf 12 jaar.",
          "g. kruisboog 10m, vanaf 16 jaar.",
          "h. Een persoonlijke wedstrijd over alle onderdelen. (niet-opgelegd of opgelegd)",
        ]),
        {
          type: "nested",
          texts: [
            textBlockFactory(
              "Deze data zijn in principe definitief, echter voor elke wedstrijd zal door de organiserende vereniging een uitnodiging toegezonden worden aan de secretaris van de vereniging met daarin de exacte data, tijden en locatie.",
            ),
            textBlockFactory([
              "K.K.P. 10m  21 t/m 23 februari  s.v. Willem III  Westendorp",
              "L.P. 10 m    12 t/m 14 maart    s.v. Halfweg  De Heurne",
              "L.G. en LGO st. 9m open-vizier    16 t/m 18 april   HSV  De Heurne",
              "L.G. kn.10 m  16 en 17 mei    s.v. st. Hubertus Breedenbroek",
              "K.K.G.  50m      14 en 15 juni  s.c.  Prins Alexander  Varsseveld",
              "K.K.G.  12m     6 en 13 september   s.v. Diana  Etten",
              "Kruisboog 10m  3 en 4 oktober  st. Martinus  Gaanderen",
              "L.G. en LGO st. 10m diopter   s.v. Halfweg De Heurne",
            ]),
            textBlockFactory(
              "Prijsuitreiking   27 december  s.v. Halfweg De Heurne",
            ),
          ],
          nestedTitle: "AGENDA  2024",
        },
      ],
      description: "Please describe this page",
    },
  });

  await db.$close();
};
