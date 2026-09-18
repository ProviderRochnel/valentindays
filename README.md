# PROTECT-CAMEROUN

Service public numérique du **Ministère de la Promotion de la Femme et de la Famille
(MINPROFF)** — République du Cameroun.

PROTECT-CAMEROUN permet de **signaler une situation de violence**, de **suivre un
dossier** et de **trouver de l'aide**, pour soi ou pour une autre personne. Le
signalement peut être anonyme et chaque demande est examinée par un agent formé du
Ministère.

> ⚠️ Ce dépôt contient l'application front-end et un jeu de données de démonstration.
> Aucune donnée réelle d'usager n'y figure.

## Les espaces du service

| Espace | Adresse | Pour qui |
| --- | --- | --- |
| Portail public | `/` | Personnes concernées, témoins, proches |
| Le dispositif | `/dispositif` | Information sur le parcours et les engagements |
| Espace partenaires | `/espace-partenaires` | Centres d'accueil, santé, services sociaux, aide juridique |
| Espace MINPROFF | `/espace-minproff` | Agents d'accueil et de suivi du Ministère |

## Principes de conception

- **Sécurité de la personne d'abord.** Une sortie rapide (bouton ou touche `Échap`)
  remplace instantanément la page par un contenu neutre et quitte le site.
- **Anonymat possible.** Le signalement anonyme ne demande aucune donnée d'identité ;
  le suivi se fait par un code à six caractères sans lettres ni chiffres ambigus.
- **Accès sans Internet.** Ligne verte 116, code court USSD et SMS mènent aux mêmes
  équipes, avec le même parcours de traitement.
- **Partage limité au nécessaire.** Les structures partenaires ne reçoivent que ce dont
  elles ont besoin pour aider ; identité complète, adresse, pièces jointes et récit
  détaillé restent au Ministère.
- **Statistiques regroupées.** Les tableaux de bord et les cartes n'affichent que des
  totaux par région, jamais une localisation individuelle.
- **Bilingue.** Français et anglais, les deux langues officielles ; le choix est
  conservé d'une visite à l'autre.

## Architecture

Le code est organisé en couches, du métier vers l'interface :

```
src/
├── domain/       Types, référentiels et règles métier (aucune dépendance React)
├── data/         Jeux de données de démonstration (à remplacer par l'API du MINPROFF)
├── state/        Réducteurs et fournisseur d'état partagé (dossiers, orientations)
├── i18n/         Fournisseur de langue et utilitaires de formatage
├── hooks/        Logique d'interface réutilisable (formulaire, USSD, sortie rapide…)
├── components/
│   ├── common/   Système de design institutionnel (boutons, encadrés, panneaux…)
│   ├── charts/   Graphiques du tableau de bord
│   ├── layout/   Ossature commune : bandeau d'urgence, en-tête, pied de page
│   ├── public/   Portail public
│   ├── dispositif/ Page d'explication du dispositif
│   ├── staff/    Espace agents du MINPROFF
│   ├── partner/  Espace des structures partenaires
│   └── ui/       Primitives shadcn/ui
├── pages/        Une page par route
└── app/          Routes et navigation
```

La couche `domain/` ne connaît ni React ni Tailwind : les règles (génération du code de
suivi, priorité suggérée, parcours d'un dossier) sont testables isolément. Le jour où
les données proviendront de l'API du Ministère, seuls `data/` et `state/` changeront.

## Système de design

Les jetons de la charte institutionnelle (marine, bleu, sarcelle) sont définis en
triplets HSL dans `src/index.css` et exposés à Tailwind dans `tailwind.config.ts`.
Ils alimentent aussi les jetons shadcn/ui (`--primary`, `--background`, …), ce qui
garantit une seule source de vérité pour les couleurs.

## Démarrer

Prérequis : Node.js 20 ou plus.

```sh
npm install
npm run dev        # serveur de développement
npm run build      # build de production
npm run preview    # prévisualiser le build
npm run lint       # ESLint
npm run typecheck  # vérification des types
npm test           # suite de tests Vitest
```

## Intégration continue et mise en ligne

Deux workflows GitHub Actions :

| Workflow | Déclenchement | Rôle |
| --- | --- | --- |
| `.github/workflows/ci.yml` | chaque *pull request* et chaque `push` sur `main` | ESLint, vérification des types, tests et build de production |
| `.github/workflows/deploy.yml` | `push` sur `main`, ou lancement manuel | Build puis publication sur GitHub Pages |

Le site est publié à l'adresse `https://<compte>.github.io/<dépôt>/`. Le chemin
racine est injecté au build par la variable `BASE_PATH`, de sorte qu'un passage
à un domaine propre (`protect.minproff.cm`, par exemple) ne demande aucune
modification du code : il suffit de définir `BASE_PATH=/`.

GitHub Pages ne réécrit pas les URL vers `index.html`. Le build produit donc un
`404.html` identique à la page d'accueil : une adresse comme `/espace-minproff`
ouverte directement démarre l'application, qui résout ensuite la route.

> Le `robots.txt` est écrit pour un déploiement à la racine d'un domaine. Sur
> une page de projet GitHub, les robots lisent le `robots.txt` de la racine du
> compte, pas celui du sous-chemin.

## Tests

- `src/domain/` — règles métier : code de suivi, priorité suggérée, export CSV.
- `src/state/` — réducteurs des dossiers et des orientations.
- `src/components/public/ReportWizard.test.tsx` — parcours complet de signalement.

## À compléter avant la mise en service

Les valeurs suivantes sont regroupées dans `src/domain/config.ts` :

| Réglage | Description |
| --- | --- |
| `shortCode` | Code court USSD attribué par les opérateurs |
| `smsNumber` | Numéro court recevant le mot-clé AIDE / HELP |
| `quickExitUrl` | Page neutre ouverte par la sortie rapide |

Restent également à raccorder : l'authentification des agents et des partenaires,
l'API de gestion des dossiers, le stockage chiffré des pièces jointes et la
journalisation des consultations.

## Stack technique

Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · React Router · Vitest
