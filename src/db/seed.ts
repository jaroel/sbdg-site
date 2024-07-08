import { db } from "./db";

export const seed = async () => {
  const root = await db.contentObjects.create({
    path: "/",
    object: {
      type: "page",
      title: "Welkom",
      blocks: [
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "Op onze site zijn alle uitslagen en standen te vinden. Ook de gegevens van onze leden.",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "Laatste update;  25-06-24",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "1e) Uitslagen na de laatste ronde 2023/2024  (08-04-24)",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "2e) Standen na 20 rond",
                    type: "text",
                    marks: [
                      {
                        type: "bold",
                      },
                    ],
                  },
                  {
                    text: "en seizoen 2023/2024  (08-04-24)",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "3e) Persoonlijke scores seizoen na 20 ronden 2023/2024  (08-04-24)",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "4e) uitslagen open",
                    type: "text",
                  },
                  {
                    text: "kampioenschap",
                    type: "text",
                    marks: [
                      {
                        type: "bold",
                      },
                    ],
                  },
                  {
                    text: '"Oude IJsselstreek" KKP 2024  (08-04-24)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '5e) uitslagen open kampioenschap "Oude IJsselstreek" LP 2024 (08-04-24)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '6e) uitslagen open kampioenschap "Oude IJsselstreek" LG+LGO openvizier (22-05-24)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '7e) uitslagen open kampioenschap "Oude IJsselstreek" LG Knielend 2024 (19-06-24)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '8e) uitslagen open kampioenschap "Oude IJsselstreek" KKG 50m  2024 (25-06-24)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '9e) uitslagen open kampioenschap "Oude IJsselstreek" KKG 12m 2023 (22-09-23)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '10e) uitslagen open kampioenschap "Oude IJsselstreek" kruisboog 2023 (11-10-23)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '11e) uitslagen open kampioenschap "Oude IJsselstreek" LG staand 2023 (22-11-23)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '12e) totaalstand (tussenstand) 2024  open kampioenschap "Oude IJsselstreek"  (25-06-24)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "13e) nieuw wedstrijd-reglement  (d.d. 12-09-23)",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "14e) wedstrijdschema seizoen 2023-2024 (08-09-23)",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: '15e) wedstrijdkalender open kampioenschap "Oude IJsselstreek"  (09-02-24)',
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "16e) uitnodiging Open schietkampioenschap Oude IJsselstreek (21-03-23 LG wedstrijd toegevoegd)",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "Namens het bestuur wens ik u veel leesplezier.",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          type: "nested",
          texts: [
            {
              text: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "setCopyBuffer",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
              type: "text",
            },
            {
              text: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "setCopyBuffer",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
              type: "text",
            },
            {
              text: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "setCopyBuffersetCopyBuffer",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
              type: "text",
            },
          ],
          nestedTitle: "setCopyBuffer",
        },
        {
          type: "nested",
          texts: [
            {
              text: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "setCopyBuffersetCopyBuffer",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
              type: "text",
            },
          ],
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
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "De persoonlijke gemiddelde is het gemiddelde van de uitslag van de afgelopen ronde.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "De persoonlijke gemiddelde is het gemiddelde van de uitslag van de afgelopen ronde.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Het persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
      ],
      description:
        "De persoonlijke gemiddelde is het gemiddelde van de uitslag van de afgelopen ronde.\r\nHet persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.\r\nHet persoonlijke gemiddelde wordt gemeten op basis van de uitslag van de laatste ronde.",
    },
  });

  await db.contentObjects.create({
    parentId: persoonlijkGemiddelde.id,
    path: "/persoonlijk-gemiddelde/2023-2024",
    object: {
      type: "page",
      title: "Persoonlijk gemiddelde - 2023-2024",
      blocks: [
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "dada",
                    type: "text",
                    marks: [
                      {
                        type: "bold",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "dada",
                    type: "text",
                    marks: [
                      {
                        type: "bold",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          type: "text",
        },
      ],
      description: "Persoonlijke resultaten seizoen 2023 / 2024",
    },
  });

  await db.contentObjects.create({
    parentId: root.id,
    path: "/uitslagen",
    object: {
      type: "page",
      title: "Uitslagen",
      blocks: [
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "dada",
                    type: "text",
                    marks: [
                      {
                        type: "bold",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "dada",
                    type: "text",
                    marks: [
                      {
                        type: "bold",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          type: "text",
        },
      ],
    },
  });

  await db.contentObjects.create({
    parentId: root.id,
    path: "/bestuur",
    object: {
      type: "page",
      title: "Bestuur",
      blocks: [
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "Bestuur Schietbond Dinxperlo Gendringen",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Voorzitter: Dhr. W.G.J. Vinkenvleugel, st. Hubertus",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Secetaris:  Dhr. G.J.W.  Doornink, Halfweg",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Penningmeester: Dhr. J.G. Bruggink, Halfweg",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Competitieleider: Dhr. J.G. Bruggink, Halfweg",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "E-mail gerardbruggink@gmail.com",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Indien men de uitslagen en standen per e-mail wil ontvangen, gaarne uw adres doorgeven aan bovenstaand e-mail adres.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Wedstrijdformulieren, voor vrijdagavond 23;00 uur, inleveren bij de competitieleider.",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "Bondsbestuurslid",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Dhr. Th. Geerts, De Strangschutters",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Dhr. J. Robben,  Eendracht",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Dhr. G. Kniest,  Z.S.V.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Dhr. G. Bekker,  V.S.V.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "Dhr. J.  Egbers,  Ulto",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
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
        {
          text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: "De gezamenlijke schietverenigingen, binnen deze gemeente, organiseren wederom het kampioenschap van deze gemeente. Deze kampioenschappen zijn uniek omdat  jaarlijks zeven verschillende disciplines op zeven verschillende locaties binnen onze gemeente grenzen worden verschoten.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "a. lp luchtpistool, geen minimale leeftijd.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "b. 12m knielend Lucht geweer, geen minimale leeftijd.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "c. kkg  50m  Klein kaliber geweer,  vanaf 16 jaar.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "d. kkg. 12m  Klein kaliber geweer,  vanaf 16 jaar.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "e. kkp.   Klein kaliber pistool,  vanaf 16 jaar.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "f. lg. 10m vrij staand en staand opgelegd Lucht geweer vanaf 12 jaar.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "f. lg. 9m staand en staand opgelegd Lucht geweer open-vizier vanaf 12 jaar.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "g. kruisboog 10m, vanaf 16 jaar.",
                    type: "text",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  {
                    text: "h. Een persoonlijke wedstrijd over alle onderdelen. (niet-opgelegd of opgelegd)",
                    type: "text",
                  },
                ],
              },
            ],
          },
          type: "text",
        },
        {
          type: "nested",
          texts: [
            {
              text: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "Deze data zijn in principe definitief, echter voor elke wedstrijd zal door de organiserende vereniging een uitnodiging toegezonden worden aan de secretaris van de vereniging met daarin de exacte data, tijden en locatie.",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
              type: "text",
            },
            {
              text: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "K.K.P. 10m  21 t/m 23 februari  s.v. Willem III  Westendorp",
                        type: "text",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "L.P. 10 m    12 t/m 14 maart    s.v. Halfweg  De Heurne",
                        type: "text",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "L.G. en LGO st. 9m open-vizier    16 t/m 18 april   HSV  De Heurne",
                        type: "text",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "L.G. kn.10 m  16 en 17 mei    s.v. st. Hubertus Breedenbroek",
                        type: "text",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "K.K.G.  50m      14 en 15 juni  s.c.  Prins Alexander  Varsseveld",
                        type: "text",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "K.K.G.  12m     6 en 13 september   s.v. Diana  Etten",
                        type: "text",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "Kruisboog 10m  3 en 4 oktober  st. Martinus  Gaanderen",
                        type: "text",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "L.G. en LGO st. 10m diopter   s.v. Halfweg De Heurne",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
              type: "text",
            },
            {
              text: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "Prijsuitreiking   27 december  s.v. Halfweg De Heurne",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
              type: "text",
            },
          ],
          nestedTitle: "AGENDA  2024",
        },
      ],
      description: "Please describe this page",
    },
  });

  await db.$close();
};
