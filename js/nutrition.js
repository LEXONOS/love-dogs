/* Love Dog's · Nutrition en 3 gammes
   1. Choix de la gamme sur mobile et tablette (sur ordinateur, les 3 sont visibles).
   2. Bouton WhatsApp de chaque sac : message prérempli avec le nom, le format et le prix affichés.
   3. Prix au kilo recalculé tout seul.
   Pour changer un prix ou un format : modifier uniquement le texte affiché dans index.html
   (ex. remplacer « Prix sur demande » par « 45&nbsp;€ »). Le bouton, le message WhatsApp
   et le prix au kilo suivent automatiquement. */
(function(){
  "use strict";
  var root = document.querySelector(".nt");
  if (!root) return;

  var TEL = "590690302359";

  /* ---- 1. Choix de la gamme ---- */
  var btns = root.querySelectorAll("[data-gamme-btn]");
  var gammes = root.querySelectorAll("[data-gamme]");

  function choisir(id){
    btns.forEach(function(b){
      var on = b.getAttribute("data-gamme-btn") === id;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    gammes.forEach(function(g){ g.classList.toggle("is-on", g.getAttribute("data-gamme") === id); });
  }

  if (btns.length && gammes.length){
    root.classList.add("js");
    root.addEventListener("click", function(e){
      var b = e.target.closest("[data-gamme-btn]");
      if (b) choisir(b.getAttribute("data-gamme-btn"));
    });
    /* lien direct vers une gamme, ex. love-dogs.fr/#gamme-premium */
    var h = (location.hash || "").replace("#gamme-", "");
    choisir(document.getElementById("gamme-" + h) ? h : "eco");
  }

  /* ---- 2 et 3. Prix au kilo + liens WhatsApp ---- */
  function texte(el){ return el ? el.textContent.replace(/ /g, " ").replace(/\s+/g, " ").trim() : ""; }
  function nombre(s){ var m = s.replace(",", ".").match(/\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN; }
  function euros(n){ return n.toFixed(2).replace(".", ",") + " €"; }

  root.querySelectorAll(".nt-item").forEach(function(item){
    var nom = texte(item.querySelector(".nt-name"));
    var format = texte(item.querySelector(".nt-fmt"));
    var prixTxt = texte(item.querySelector(".nt-price"));
    var prix = nombre(prixTxt), kilos = nombre(format);
    var aUnPrix = !isNaN(prix) && prixTxt.indexOf("€") > -1;

    var kg = item.querySelector(".nt-kg");
    if (kg) kg.textContent = (aUnPrix && kilos > 0) ? " · " + euros(prix / kilos) + "/kg" : "";
    var prixEl = item.querySelector(".nt-price");
    if (prixEl) prixEl.classList.toggle("is-ask", !aUnPrix);

    var lien = item.querySelector(".nt-order");
    if (!lien) return;
    var libelle = lien.querySelector("span");
    if (libelle) libelle.textContent = aUnPrix ? "Commander" : "Demander le prix";
    var msg = aUnPrix
      ? "Bonjour Alexandre, je souhaite commander un sac " + nom + " de " + format + " (" + prixTxt + ").\n\nMa commune : "
      : "Bonjour Alexandre, je suis intéressé(e) par le sac " + nom + " de " + format + ". Quel est son prix ?\n\nMa commune : ";
    lien.href = "https://wa.me/" + TEL + "?text=" + encodeURIComponent(msg);
    lien.setAttribute("aria-label", (aUnPrix ? "Commander " : "Demander le prix de ") + nom + " " + format + " sur WhatsApp");
  });
})();
