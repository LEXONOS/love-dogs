# Love Dog's — site vitrine

Site vitrine une page pour **Love Dog's** (partenaire canin en Guadeloupe) : éducation canine, dog sitting et nutrition. HTML / CSS / JavaScript natif, sans framework ni étape de build. Il fonctionne tel quel dans n'importe quel navigateur et se met en ligne sur n'importe quel hébergeur.

Design clair et aéré, fond porcelaine chaud, accents or et anthracite, motif patte de chien comme fil conducteur, micro-interactions au survol.

---

## Arborescence

```
love-dogs/
├── index.html          Page unique (contenu, SEO, données structurées)
├── css/style.css       Styles (palette claire, mise en page, animations, responsive)
├── js/main.js          Menu mobile, header au scroll, révélations au défilement
├── assets/
│   ├── logo.svg        Emblème + wordmark (à remplacer par le logo officiel)
│   └── og-image.png    Image d'aperçu réseaux sociaux
├── favicon.svg         Icône d'onglet
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Voir le site en local

Double-cliquer sur `index.html`, ou lancer un petit serveur :

```bash
python3 -m http.server 8000     # puis ouvrir http://localhost:8000
```

---

## Mettre en ligne sur GitHub

1. Créer un dépôt (ex. `love-dogs`).
2. Déposer **le contenu** de ce dossier (le `index.html` doit être à la racine du dépôt).
3. Aperçu gratuit : **GitHub Pages** (Settings, Pages, branche `main`, dossier `/root`) ou **Vercel / Netlify** (import du dépôt, aucun réglage de build).
4. Mise en ligne finale chez le client : upload via OVH / FileZilla à la racine, une fois `love-dogs.fr` transféré.

---

## Ajouter les photos du client

Le site est livré avec des zones photo prêtes, remplies par un dégradé chaleureux et un petit repère « Photo ». Il y a **3 emplacements** : héro, éducation et dog sitting. Pour poser une vraie photo, ouvrir `css/style.css` et remplacer le `background` du bloc concerné par l'image :

```css
.photo-hero{ background:url("../assets/hero.jpg") center/cover no-repeat; }
.photo-edu { background:url("../assets/education.jpg") center/cover no-repeat; }
.photo-sit { background:url("../assets/sitting.jpg") center/cover no-repeat; }
```

(déposer les fichiers dans `assets/`). Une fois la photo posée, on peut retirer le petit repère en supprimant la ligne `<span class="photo-hint">...</span>` correspondante dans `index.html`. Format conseillé : image nette, orientation portrait pour le héro, paysage pour les deux autres.

---

## Remplacer le logo

L'emblème actuel (patte dorée) est une version propre aux couleurs de la marque, pour que le site soit complet tout de suite. Pour poser le vrai logo `icon-512` :
- soit remplacer `assets/logo.svg` par le fichier fourni,
- soit remplacer dans `index.html` les blocs `<span class="brand-badge">...</span>` (header + footer) par une image, par exemple `<img src="assets/logo.png" alt="Love Dog's" />`.

---

## Coordonnées

Numéro, WhatsApp et email apparaissent à plusieurs endroits : `tel:+590690302359`, `https://wa.me/590690302359`, `lovedogs971@gmail.com`. Un simple rechercher / remplacer dans `index.html` suffit si un contact change.

---

## Référencement (SEO)

Déjà en place : `title`, meta description, mots-clés, Open Graph (partage réseaux), `sitemap.xml`, `robots.txt` et surtout les **données structurées `LocalBusiness`** (JSON-LD) avec téléphone, email et zone Guadeloupe.

À faire ensuite pour « apparaître en premier » :
1. **Créer la fiche Google Business Profile** (le client n'en a pas) : c'est le levier n°1 pour la visibilité locale en Guadeloupe.
2. Mettre en ligne sur le domaine définitif puis déclarer le site dans **Google Search Console** (soumettre le `sitemap.xml`).
3. Remplacer les URL `https://www.love-dogs.fr/` dans `index.html`, `sitemap.xml` et `robots.txt` si le domaine final diffère.

---

## Détails techniques

- Aucune dépendance externe hors polices Google (Great Vibes, Sora, Inter).
- Accessible : navigation clavier, focus visible, lien d'évitement, `prefers-reduced-motion` respecté.
- Responsive du mobile au grand écran, bouton WhatsApp flottant sur mobile.
