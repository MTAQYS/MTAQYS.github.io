export type ToolStatus = "available" | "beta" | "soon";

export interface ToolCopy {
  summary: string;
  paragraphs: string[];
  points: string[];
}

export interface Tool {
  slug: string;
  name: string;
  status: ToolStatus;
  /** Live URL. Omitted while the tool is not published. */
  url?: string;
  fr: ToolCopy;
  en: ToolCopy;
}

export const tools: Tool[] = [
  {
    slug: "convert",
    name: "Convert",
    status: "available",
    url: "https://mtaqys.github.io/Convert/",
    fr: {
      summary:
        "Des conversions dans l’onglet. Ce que vous convertissez reste sur la machine : rien n’est téléversé, rien n’est conservé.",
      paragraphs: [
        "Convert sert quand une conversion ne doit pas passer par un service en ligne. Vous ouvrez la page, vous travaillez, vous fermez l’onglet. Pas de compte, pas d’historique chez nous.",
        "Les formats proposés sont ceux que l’outil affiche lui-même. Cette page ne promet pas une liste plus longue que ce que la version en ligne sait faire.",
        "Une fois la page chargée, la conversion ne requiert pas d’envoi de vos données.",
      ],
      points: [
        "Le calcul se fait dans le navigateur.",
        "Aucun envoi vers un serveur du studio.",
        "Pas de compte.",
        "Pas de cookie déposé pour mesurer l’usage.",
      ],
    },
    en: {
      summary:
        "Conversions in the tab. What you convert stays on the machine: nothing is uploaded, nothing is kept.",
      paragraphs: [
        "Convert is for a conversion that should not go through an online service. You open the page, you work, you close the tab. No account, no history on our side.",
        "The formats on offer are the ones the tool itself shows. This page does not promise a longer list than the live version can actually do.",
        "Once the page has loaded, the conversion does not need your data to be sent anywhere.",
      ],
      points: [
        "The work happens in the browser.",
        "Nothing is sent to a studio server.",
        "No account.",
        "No cookie dropped to measure usage.",
      ],
    },
  },
  {
    slug: "wheel",
    name: "Wheel",
    status: "available",
    url: "https://mtaqys.github.io/Wheel/",
    fr: {
      summary:
        "Une roue pour choisir ou tirer au sort. Vous écrivez les options, vous lancez, le résultat s’affiche dans la page.",
      paragraphs: [
        "Wheel sert à départager une liste : un nom, un sujet, l’ordre d’un tour de table. Les options ne sont pas envoyées, et personne d’autre ne voit le tirage.",
        "Le hasard est calculé sur l’appareil. Ce n’est pas un tirage certifié pour un jeu d’argent. C’est un outil de décision du quotidien.",
      ],
      points: [
        "La liste reste dans la page.",
        "Le tirage n’est pas enregistré chez nous.",
        "Pas de compte.",
        "Rien n’est transmis au moment de lancer la roue.",
      ],
    },
    en: {
      summary:
        "A wheel for choosing or drawing lots. You type the options, you spin, the result shows in the page.",
      paragraphs: [
        "Wheel breaks a tie in a list: a name, a topic, the order of a round-table. The options are not sent, and nobody else sees the draw.",
        "The chance is computed on the device. It is not a certified draw for gambling. It is an everyday decision tool.",
      ],
      points: [
        "The list stays in the page.",
        "The draw is not stored with us.",
        "No account.",
        "Nothing is transmitted when you spin.",
      ],
    },
  },
  {
    slug: "qr",
    name: "QR",
    status: "available",
    url: "https://mtaqys.github.io/Qr/",
    fr: {
      summary:
        "Des codes QR dessinés dans le navigateur. Le texte ou l’adresse encodés ne passent pas par un générateur tiers.",
      paragraphs: [
        "Vous saisissez un texte, une adresse ou un autre contenu court. Le code est dessiné sur la page, prêt à être montré ou téléchargé.",
        "C’est utile dès que le contenu est privé : un lien interne, un mot, une information que vous n’enverriez pas à un service gratuit.",
      ],
      points: [
        "L’image est produite sur l’appareil.",
        "Le contenu du code n’est pas transmis.",
        "Pas de compte.",
        "Pas de statistique de scan chez nous.",
      ],
    },
    en: {
      summary:
        "QR codes drawn in the browser. The text or address you encode does not go through a third-party generator.",
      paragraphs: [
        "You enter a text, an address, or another short payload. The code is drawn on the page, ready to show or download.",
        "It matters when the payload is private: an internal link, a word, something you would not send to a free generator.",
      ],
      points: [
        "The image is produced on the device.",
        "The payload is not transmitted.",
        "No account.",
        "No scan statistics on our side.",
      ],
    },
  },
  {
    slug: "compress",
    name: "Compress",
    status: "soon",
    fr: {
      summary: "Compression d’images et de PDF sur l’appareil. Les fichiers ne quittent pas le navigateur.",
      paragraphs: [
        "Compress réduira le poids d’images et de PDF sans les envoyer à un serveur. Le fichier d’origine reste chez vous, le fichier allégé aussi.",
        "L’outil n’est pas encore en ligne. Cette page décrit l’intention. Elle sera mise à jour quand la première version sera utilisable.",
      ],
      points: [
        "Images et PDF.",
        "Compression sur l’appareil.",
        "Pas de file d’attente, pas de compte.",
        "Le catalogue gardera la même adresse.",
      ],
    },
    en: {
      summary: "Image and PDF compression on the device. Files do not leave the browser.",
      paragraphs: [
        "Compress will shrink images and PDFs without sending them to a server. The original stays with you, and so does the lighter file.",
        "The tool is not online yet. This page describes the intent. It will be updated when the first version is usable.",
      ],
      points: [
        "Images and PDFs.",
        "Compression on the device.",
        "No queue, no account.",
        "The catalog will keep the same address.",
      ],
    },
  },
  {
    slug: "invoice",
    name: "Invoice",
    status: "soon",
    fr: {
      summary: "Factures et devis en français ou en anglais, exportés en PDF, sans compte.",
      paragraphs: [
        "Invoice produira un devis ou une facture : émetteur, client, lignes, totaux, mention de taxe. Le document se compose dans la page, puis s’exporte en PDF.",
        "Les informations de facturation sont des données sensibles. Elles ne sont pas envoyées au studio pour générer le fichier. Vous gardez le PDF où vous voulez.",
        "Pas encore en ligne.",
      ],
      points: [
        "Français et anglais.",
        "Devis et factures.",
        "Export PDF depuis le navigateur.",
        "Pas de compte, pas de stockage des documents chez nous.",
      ],
    },
    en: {
      summary: "Invoices and quotes in French or English, exported to PDF, with no account.",
      paragraphs: [
        "Invoice will produce a quote or an invoice: sender, client, lines, totals, tax line. You compose the document in the page, then export a PDF.",
        "Billing details are sensitive. They are not sent to the studio to generate the file. You keep the PDF wherever you like.",
        "Not online yet.",
      ],
      points: [
        "French and English.",
        "Quotes and invoices.",
        "PDF export from the browser.",
        "No account, and we do not store the documents.",
      ],
    },
  },
  {
    slug: "password",
    name: "Password",
    status: "soon",
    fr: {
      summary: "Générateur de mots de passe et vérification de robustesse, calculés dans la page.",
      paragraphs: [
        "Password proposera un mot de passe long, et dira s’il est solide. La vérification se fait sur l’appareil : le mot de passe n’est pas envoyé pour être testé ailleurs.",
        "Ce n’est pas un coffre-fort. L’outil ne mémorise rien. Vous copiez le mot de passe et vous le rangez dans votre propre gestionnaire.",
      ],
      points: [
        "Génération locale.",
        "Contrôle de robustesse local.",
        "Rien n’est transmis, rien n’est conservé.",
        "Pas un gestionnaire de mots de passe.",
      ],
    },
    en: {
      summary: "A password generator and strength check, computed in the page.",
      paragraphs: [
        "Password will suggest a long password and say whether it is solid. The check runs on the device: the password is not sent somewhere else to be tested.",
        "It is not a vault. The tool remembers nothing. You copy the password and store it in your own manager.",
      ],
      points: [
        "Local generation.",
        "Local strength check.",
        "Nothing is transmitted, nothing is kept.",
        "Not a password manager.",
      ],
    },
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function toolCopy(tool: Tool, locale: "fr" | "en"): ToolCopy {
  return locale === "fr" ? tool.fr : tool.en;
}
