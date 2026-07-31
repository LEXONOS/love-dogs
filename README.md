# Love Dog's — site vitrine

Site vitrine une page pour **Love Dog's** (partenaire canin en Guadeloupe) : éducation canine, dog sitting et nutrition. Réalisé en HTML / CSS / JavaScript natif, sans framework ni dépendance de build. Il fonctionne tel quel dans n'importe quel navigateur et se met en ligne sur n'importe quel hébergeur.

Palette noir et or, une seule page, header clair avec les trois services en avant, sections aérées.

---

## Arborescence

```
love-dogs/
├── index.html          Page unique (contenu, SEO, données structurées)
├── css/style.css       Styles (palette, mise en page, animations, responsive)
├── js/main.js          Menu mobile, header au scroll, révélations, tracé de l'emblème
├── assets/
│   └── logo.svg        Emblème + wordmark en SVG (à remplacer par le logo officiel)
├── favicon.svg         Icône d'onglet
├── robots.txt          Autorise l'indexation
├── sitemap.xml         Plan du site pour Google
└── README.md
```

---

## Voir le site en local

Double-cliquer sur `index.html`, ou lancer un petit serveur :

```bash
# avec Python
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

---

## Mettre en ligne sur GitHub

1. Créer un dépôt sur GitHub (ex. `love-dogs`).
2. Y déposer **le contenu** de ce dossier (le `index.html` doit être à la racine du dépôt).
3. Aperçu gratuit possible :
   - **GitHub Pages** : Settings → Pages → Branch `main` → `/root`.
   - **Vercel / Netlify** : importer le dépôt, aucun réglage de build (site statique).
4. Mise en ligne définitive chez le client : uploader les fichiers via OVH / FileZilla à la racine de l'hébergement, une fois le domaine `love-dogs.fr` transféré.

---

## Ce qu'il reste à personnaliser

### 1. Le logo officiel
L'emblème actuel (bouclier + patte) est une version propre, dans les tons de la marque, pour que le site soit complet dès maintenant. Pour poser le vrai logo `icon-512` du client :
- remplacer `assets/logo.svg` par le fichier fourni, **ou**
- dans `index.html`, remplacer les blocs `<use href="#emblem-shape"/>` (header + footer) par une balise image, par exemple :
  ```html
  <img src="assets/logo.png" alt="Love Dog's" />
  ```

### 2. Les photos du client
Le site est volontairement livré sans photo pour rester léger et net. Pour ajouter une photo d'ambiance dans le héro, ouvrir `css/style.css`, chercher `.hero` et ajouter :
```css
.hero::before{
  content:"";position:absolute;inset:0;z-index:0;opacity:.28;
  background:url("../assets/hero.jpg") center/cover no-repeat;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 60%);
          mask-image:linear-gradient(90deg,transparent,#000 60%);
}
```
(déposer le fichier dans `assets/hero.jpg`).

### 3. Les coordonnées
Numéro, WhatsApp et email sont présents à plusieurs endroits (`tel:+590690302359`, `https://wa.me/590690302359`, `lovedogs971@gmail.com`). Un simple rechercher / remplacer dans `index.html` suffit si un contact change.

---

## Référencement (SEO)

Déjà en place : balise `title`, meta description, mots-clés, Open Graph (partage réseaux), `sitemap.xml`, `robots.txt` et surtout les **données structurées `LocalBusiness`** (JSON-LD dans le `<head>`) avec le téléphone, l'email et la zone Guadeloupe. C'est ce que Google lit pour le référencement local.

À faire ensuite pour « apparaître en premier » :
1. **Créer la fiche Google Business Profile** (le client n'en a pas). C'est le levier n°1 pour être visible localement en Guadeloupe.
2. Mettre en ligne sur le domaine définitif et déclarer le site dans **Google Search Console** (soumettre le `sitemap.xml`).
3. Remplacer les URL `https://www.love-dogs.fr/` dans `index.html`, `sitemap.xml` et `robots.txt` si le domaine final diffère.

---

## Détails techniques

- Aucune dépendance externe hors polices Google (Great Vibes, Oswald, Inter).
- Accessible : navigation clavier, focus visible, lien d'évitement, `prefers-reduced-motion` respecté (les animations se coupent pour les personnes sensibles au mouvement).
- Responsive du mobile au grand écran, bouton WhatsApp flottant sur mobile.
- Testé sur les navigateurs récents (Chrome, Safari, Firefox, Edge).
