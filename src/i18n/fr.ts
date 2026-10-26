import type { Dictionary } from "./types";

const email = "contact@dynamogic.com";

export const fr: Dictionary = {
  lang: "fr",
  ogLocale: "fr_FR",
  ogAlt: "Dynamogic, studio d’IA, d’automatisation et d’ingénierie logicielle.",
  skip: "Aller au contenu",
  navAria: "Navigation principale",
  langAria: "Langue",
  menuOpen: "Menu",
  menuClose: "Fermer",
  themeLight: "Clair",
  themeDark: "Sombre",
  themeAriaToLight: "Thème sombre. Passer au thème clair.",
  themeAriaToDark: "Thème clair. Passer au thème sombre.",
  footerAria: "Pied de page",
  footerBlurb:
    "Studio d’intelligence artificielle, d’automatisation et d’ingénierie logicielle.",
  footerRights: "© 2026 Dynamogic",
  emailLabel: "Écrire",
  nav: [
    { page: "home", label: "Accueil" },
    { page: "services", label: "Expertise" },
    { page: "tools", label: "Outils" },
    { page: "contact", label: "Contact" },
  ],
  legalNav: [
    { page: "legal", label: "Mentions légales" },
    { page: "privacy", label: "Confidentialité" },
  ],
  home: {
    metaTitle: "Dynamogic — Studio d’IA, d’automatisation et d’ingénierie",
    metaDescription:
      "Dynamogic est un petit studio. Nous concevons des systèmes d’intelligence artificielle, d’automatisation et de logiciel pour des équipes qui veulent un travail clair, repris en main.",
    kicker: "Studio",
    title: "Trois métiers.\n*Un seul* studio.",
    lede: "Intelligence artificielle, automatisation et ingénierie logicielle. Dynamogic travaille avec des équipes qui veulent un système clair — tenu, transmis, sans décor inutile.",
    primaryCta: "Écrire",
    secondaryCta: "Voir l’expertise",
    markCaption: "Marque · grand-duc",
    practices: [
      {
        index: "01",
        title: "Intelligence artificielle",
        text: "Un modèle, là où il aide vraiment.",
      },
      {
        index: "02",
        title: "Automatisation",
        text: "Les passages répétitifs, rendus visibles.",
      },
      {
        index: "03",
        title: "Ingénierie logicielle",
        text: "Du code qu’une autre personne peut tenir.",
      },
    ],
    whatTitle: "Ce que nous faisons",
    whatLede:
      "Trois capacités, tenues ensemble. Pas un catalogue, et pas une promesse de remplacer les gens.",
    what: [
      {
        index: "01",
        title: "Intelligence artificielle",
        text: "Des usages précis : lire et classer des documents, proposer un brouillon qu’une personne valide, chercher dans les contenus d’une équipe, assister une tâche déjà définie. Le modèle reste un composant. Le jugement reste à quelqu’un.",
      },
      {
        index: "02",
        title: "Automatisation",
        text: "Les passages répétitifs entre personnes et systèmes : réception, contrôle, transfert, notification, archive. Un flux que l’on peut suivre. Quand une étape s’arrête, quelqu’un le sait, et le travail peut se finir à la main.",
      },
      {
        index: "03",
        title: "Ingénierie logicielle",
        text: "Applications, interfaces, services et outils internes. Une structure lisible, des limites explicites, et un chemin pour faire évoluer le système après notre passage. Nous écrivons pour la personne qui reprendra le code.",
      },
    ],
    toolsLink: "Des utilitaires libres, exécutés dans le navigateur, sont réunis à part.",
    howTitle: "Comment nous travaillons",
    howLede: "Un interlocuteur. Un rythme court. Rien qui ne puisse être expliqué.",
    how: [
      {
        index: "01",
        title: "Comprendre",
        text: "Nous partons du travail tel qu’il se fait. Qui décide, où l’information se perd, ce qui doit rester humain, et ce qui peut devenir un système.",
      },
      {
        index: "02",
        title: "Construire",
        text: "Une première version assez petite pour être jugée. Ensuite le durcissement : accès, reprises, cas limites, et ce qui se passe quand ça ne marche pas.",
      },
      {
        index: "03",
        title: "Transmettre",
        text: "Vous repartez avec un système lisible, des choix écrits, et la possibilité de le modifier sans nous. Le lien reste le même.",
      },
    ],
    nameTitle: "Le nom",
    nameLede: "Dynamogic assemble trois mots. Aucun des trois n’est un slogan.",
    nameParts: [
      {
        word: "Dynamique",
        text: "Ce qui doit suivre le métier, plutôt que le figer.",
      },
      {
        word: "Logique",
        text: "Ce qui doit rester vérifiable, par une personne.",
      },
      {
        word: "Magie",
        text: "Le moment où le système s’efface et où le travail avance. Pas un effet. Un résultat de précision.",
      },
    ],
    ctaTitle: "Posez le travail sur la table.",
    ctaText:
      "Décrivez le contexte, la contrainte, et ce qui compterait comme un résultat. Un seul canal.",
    ctaButton: email,
  },
  services: {
    metaTitle: "Expertise — Dynamogic",
    metaDescription:
      "Intelligence artificielle, automatisation et ingénierie logicielle. Ce que Dynamogic prend en charge, comment un travail se déroule, et ce que nous ne promettons pas.",
    kicker: "Expertise",
    title: "Le métier,\n*pas* le décor.",
    lede: "Nous intervenons là où un système doit tenir dans le temps. Le périmètre s’écrit avant de construire. Ce qui suit décrit des capacités, pas une liste d’outils.",
    indexLabel: "Sur cette page",
    blocks: [
      {
        id: "ai",
        index: "01",
        title: "Intelligence artificielle",
        paragraphs: [
          "Un modèle est utile quand la tâche est bornée : beaucoup de texte à trier, un premier jet à relire, une recherche dans un corpus qui vous appartient, une aide au fil d’une procédure déjà décrite.",
          "Nous commençons par la limite. Ce que le système a le droit de proposer. Ce qu’une personne doit décider. Ce qui est conservé, et ce qui ne l’est pas. Si une règle, un formulaire ou une requête suffit, nous ne posons pas un modèle par-dessus.",
        ],
        points: [
          "Lecture, classement et recherche dans vos propres contenus",
          "Brouillons et assistants, avec une validation humaine",
          "Intégration dans un outil ou un flux qui existe déjà",
          "Un cadre écrit : entrées, sorties, et ce qui reste manuel",
        ],
      },
      {
        id: "automation",
        index: "02",
        title: "Automatisation",
        paragraphs: [
          "L’automatisation utile est celle que l’on peut raconter. Un dossier arrive, un contrôle s’applique, une personne est prévenue, une trace reste. Le gain n’est pas un tableau de bord de plus. C’est du temps retiré aux recopies, sans cacher le métier.",
          "Nous dessinons aussi la panne. Quand une étape s’arrête, le travail ne disparaît pas dans un script silencieux : quelqu’un le voit, et peut le terminer à la main.",
        ],
        points: [
          "Réception, contrôle, transfert, notification, archive",
          "Des enchaînements lisibles, plutôt qu’une suite de scripts opaques",
          "Des reprises prévues, pas découvertes en production",
          "Moins de copier-coller, sans retirer le jugement",
        ],
      },
      {
        id: "software",
        index: "03",
        title: "Ingénierie logicielle",
        paragraphs: [
          "Applications, interfaces, services, outils internes. Le critère n’est pas la nouveauté de la pile. C’est de savoir si une personne qui n’était pas là au début peut comprendre le système, le lancer, et le modifier sans le craindre.",
          "Nous gardons le périmètre étroit, les noms clairs, et les dépendances que l’on peut justifier. Les tests sont là où une régression coûterait cher, pas pour décorer le dépôt.",
        ],
        points: [
          "Interfaces et applications utilisées vraiment",
          "Services et échanges entre systèmes",
          "Outils internes, quand un tableur a atteint sa limite",
          "Notes de reprise : comment lancer, où regarder, quoi ne pas casser",
        ],
      },
    ],
    frameTitle: "Le cadre d’un travail",
    frameLede: "Le déroulé reste simple. Il s’ajuste à la taille du sujet, pas à une méthode à afficher.",
    frame: [
      {
        index: "01",
        title: "Un écrit avant de produire",
        text: "Le problème, les limites, ce qui ne sera pas fait, et à quoi on saura que la première version est juste.",
      },
      {
        index: "02",
        title: "Une version que l’on peut juger",
        text: "Assez petite pour être regardée en vrai. Ensuite seulement : accès, reprises, cas limites.",
      },
      {
        index: "03",
        title: "Une transmission",
        text: "Le système, les choix, et la façon de le faire vivre sans nous. Un seul contact pour la suite.",
      },
    ],
    limitsTitle: "Ce que nous ne faisons pas",
    limits: [
      "Nous ne publions pas de noms de clients, et nous n’en empruntons pas.",
      "Nous ne vendons pas un catalogue figé.",
      "Nous ne promettons pas qu’un modèle remplace un jugement.",
      "Nous ne chiffrons pas un résultat que nous n’avons pas mesuré.",
    ],
    ctaTitle: "Un sujet précis vaut mieux qu’une liste.",
    ctaText: "Écrivez ce qui coince, ce qui est déjà en place, et le délai réel. Nous répondons au même endroit.",
    ctaButton: email,
  },
  tools: {
    metaTitle: "Outils — Dynamogic",
    metaDescription:
      "Trois outils gratuits, exécutés dans le navigateur. Convertisseur de fichiers et de données, roue des prénoms, générateur de codes QR. Rien n’est téléversé.",
    kicker: "Outils",
    title: "Trois outils.\n*Rien* ne quitte le navigateur.",
    lede: "Des utilitaires gratuits, chacun sur sa page. Les fichiers, les listes et les codes restent sur votre machine. Dynamogic ne les reçoit pas.",
    note: "Ces pages sont distinctes du site du studio. Elles sont faites pour ne rien téléverser.",
    items: [
      {
        name: "Convert",
        href: "/Convert/",
        index: "01",
        summary: "Convertisseur de fichiers et de données.",
        detail: "Les transformations courantes se font dans la page. Rien n’est envoyé.",
        action: "Ouvrir Convert",
      },
      {
        name: "Wheel",
        href: "/Wheel/",
        index: "02",
        summary: "Roue des prénoms, tirage au sort.",
        detail: "Collez une liste, lancez le tirage, lisez le résultat. Le tirage reste sur cet appareil.",
        action: "Ouvrir Wheel",
      },
      {
        name: "QR",
        href: "/Qr/",
        index: "03",
        summary: "Générateur de codes QR.",
        detail: "Composez un code et téléchargez-le. Pas de compte, pas de téléversement.",
        action: "Ouvrir QR",
      },
    ],
  },
  contact: {
    metaTitle: "Contact — Dynamogic",
    metaDescription:
      "Écrivez à Dynamogic à contact@dynamogic.com. Le formulaire ouvre votre messagerie. Aucun message n’est envoyé par le site.",
    kicker: "Contact",
    title: "*Un seul* canal.",
    lede: "Décrivez le contexte, ce qui bloque, et ce qui compterait comme un résultat. Nous lisons ce qui arrive à cette adresse, et nulle part ailleurs sur ce site.",
    direct: "Écrire directement",
    formTitle: "Préparer un message",
    formNote:
      "Le bouton ouvre votre messagerie avec le texte ci-dessous. Le site n’a pas de serveur de formulaire, et n’enregistre rien.",
    name: "Nom",
    email: "Votre e-mail",
    subject: "Sujet",
    message: "Message",
    optional: "facultatif",
    required: "obligatoire",
    submit: "Ouvrir dans la messagerie",
    points: [
      "Pas de formulaire envoyé à un serveur.",
      "Pas de lettre d’information cachée derrière le bouton.",
      "Si votre messagerie ne s’ouvre pas, écrivez à la main à l’adresse ci-contre.",
    ],
  },
  legal: {
    metaTitle: "Mentions légales — Dynamogic",
    metaDescription:
      "Mentions légales du site Dynamogic. Cadre générique : l’éditeur est nommé Dynamogic, et les identifiants juridiques ne sont pas inventés.",
    kicker: "Mentions légales",
    title: "Mentions légales",
    lede: "Ces mentions décrivent le site publié sous le nom Dynamogic. Elles restent générales tant que l’identité juridique de l’éditeur n’est pas reportée ici.",
    updated: "Dernière mise à jour : 25 octobre 2026.",
    sections: [
      {
        id: "editeur",
        heading: "Éditeur du site",
        paragraphs: [
          "Le site est édité sous le nom Dynamogic.",
          "Contact : contact@dynamogic.com",
        ],
      },
      {
        id: "a-completer",
        heading: "À compléter",
        placeholder: true,
        paragraphs: [
          "Les éléments qui identifient une personne ou une structure ne figurent pas sur cette page, et ils ne sont pas inventés.",
          "Lorsqu’ils seront arrêtés, ils seront ajoutés dans cette section : forme juridique, siège, numéro d’immatriculation, capital, numéro de TVA, et directeur ou directrice de la publication.",
        ],
      },
      {
        id: "hebergement",
        heading: "Hébergement",
        paragraphs: [
          "Le site est un ensemble de pages statiques.",
          "Tant qu’il est servi depuis GitHub Pages, l’hébergement est assuré par GitHub, Inc. Si la publication passe ensuite sur Cloudflare Pages, le nom de l’hébergeur sera mis à jour ici.",
          "L’adresse postale et le téléphone de l’hébergeur ne sont pas recopiés ici. Ils seront ajoutés dans cette section si une mention complète l’exige.",
        ],
      },
      {
        id: "propriete",
        heading: "Propriété des contenus",
        paragraphs: [
          "Les textes et les éléments graphiques de ce site sont publiés par Dynamogic.",
          "Pour toute demande de réutilisation, écrivez à contact@dynamogic.com.",
        ],
      },
      {
        id: "responsabilite",
        heading: "Responsabilité",
        paragraphs: [
          "Les informations publiées décrivent l’activité du studio. Elles ne constituent pas un engagement de résultat sur un travail qui n’a pas été convenu.",
        ],
      },
    ],
  },
  privacy: {
    metaTitle: "Confidentialité — Dynamogic",
    metaDescription:
      "Le site Dynamogic ne crée pas de compte, ne dépose pas de cookie et n’envoie pas le formulaire de contact à un serveur. Écrire se fait à contact@dynamogic.com.",
    kicker: "Confidentialité",
    title: "Confidentialité",
    lede: "Cette page décrit ce que le site fait, et ce qu’il ne fait pas, des informations qui le traversent. Elle nomme uniquement Dynamogic.",
    updated: "Dernière mise à jour : 25 octobre 2026.",
    sections: [
      {
        id: "responsable",
        heading: "Qui publie",
        paragraphs: [
          "Le site est publié sous le nom Dynamogic.",
          "Pour toute question sur cette page, ou sur un message que vous nous avez envoyé : contact@dynamogic.com",
        ],
      },
      {
        id: "a-completer-responsable",
        heading: "À compléter — responsable",
        placeholder: true,
        paragraphs: [
          "Si le responsable du traitement doit être désigné avec une forme juridique, un siège ou un numéro d’immatriculation, ces éléments seront ajoutés dans cette section.",
          "Ils ne sont pas inventés ici.",
        ],
      },
      {
        id: "pas-de-collecte",
        heading: "Ce que le site ne fait pas",
        paragraphs: [
          "Pas de compte. Pas de lettre d’information. Pas de cookie déposé par ce site. Pas de mesure d’audience ajoutée par nos soins.",
          "Le bouton de contact ouvre la messagerie de la personne qui écrit. Le message n’est pas envoyé à un serveur de ce site.",
        ],
      },
      {
        id: "courrier",
        heading: "Lorsque vous écrivez",
        paragraphs: [
          "Si vous envoyez un message à contact@dynamogic.com, nous l’utilisons pour vous répondre.",
          "La correspondance est conservée le temps de l’échange, puis supprimée. Nous ne vendons pas ces messages. Nous ne les utilisons pas pour entraîner un modèle.",
        ],
      },
      {
        id: "outils",
        heading: "Pages liées",
        paragraphs: [
          "Certaines pages liées proposent des utilitaires qui s’exécutent dans votre navigateur. Ils sont conçus pour ne pas téléverser vos fichiers, listes ou codes vers Dynamogic.",
          "Chaque page décrit son propre fonctionnement.",
        ],
      },
      {
        id: "journaux",
        heading: "Journaux de l’hébergeur",
        paragraphs: [
          "L’hébergeur des pages statiques peut conserver des journaux techniques de connexion, comme l’adresse IP, l’agent et la page demandée, pour faire fonctionner le réseau.",
          "Dynamogic n’y ajoute pas de traceur.",
        ],
      },
      {
        id: "a-completer-journaux",
        heading: "À compléter — durée des journaux",
        placeholder: true,
        paragraphs: [
          "La durée de conservation de ces journaux dépend de l’hébergeur retenu : GitHub Pages aujourd’hui, Cloudflare Pages si le site y est publié ensuite.",
          "Elle sera précisée dans cette section à partir de la documentation de l’hébergeur de production. Elle n’est pas estimée ici.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        paragraphs: ["Ce site ne dépose pas de cookie."],
      },
      {
        id: "droits",
        heading: "Vos droits",
        paragraphs: [
          "Vous pouvez demander l’accès, la rectification ou l’effacement de la correspondance en écrivant à contact@dynamogic.com.",
          "En France, vous pouvez aussi saisir la CNIL : cnil.fr.",
        ],
      },
    ],
  },
};
