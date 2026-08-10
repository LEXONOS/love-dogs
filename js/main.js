/* Love Dog's — interactions */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* header au scroll */
  var hdr = document.querySelector(".hdr");
  function onScroll(){ hdr.classList.toggle("scrolled", window.scrollY > 20); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive:true });

  /* menu mobile */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  function close(){ nav.classList.remove("open"); burger.setAttribute("aria-expanded","false"); burger.setAttribute("aria-label","Ouvrir le menu"); }
  if (burger && nav){
    burger.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    nav.addEventListener("click", function(e){ if (e.target.closest(".nav-link")) close(); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") close(); });
  }

  /* révélations au scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add("in"); });
  }

  /* surlignage nav actif */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = links.map(function(l){ var id=l.getAttribute("href"); return id && id.length>1 ? document.querySelector(id) : null; }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){
          var id = "#"+en.target.id;
          links.forEach(function(l){ l.classList.toggle("active", l.getAttribute("href")===id); });
        }
      });
    }, { threshold:0.4, rootMargin:"-45% 0px -50% 0px" });
    sections.forEach(function(s){ spy.observe(s); });
  }

  /* ---------------------------------------------------------------
     Simulateur de devis dog sitting
     Tous les tarifs sont regroupés ici : pour changer un prix ou une
     règle de facturation, il suffit de modifier cet objet.
     --------------------------------------------------------------- */
  var TARIFS = {
    visite1: 20,              // € par jour, 1 visite quotidienne
    visite2: 35,              // € par jour, 2 visites quotidiennes
    promenade: 10,            // € par chien et par promenade
    chienSupp: 5,             // € par chien supplémentaire et par visite
    kmInclus: 5,              // km offerts (distance simple)
    prixKm: 0.5,              // € par km au-delà
    kmAllerRetour: true,      // les km au-delà sont comptés aller-retour
    deplacementParVisite: true// le déplacement est facturé à chaque visite
  };

  var quote = document.getElementById("devis");
  if (quote){
    var etat = { formule:1, jours:3, chiens:1, promenades:0, km:5 };
    var LIM = { jours:[1,60], chiens:[1,6] };

    var elTotal = document.getElementById("q-total");
    var elSub   = document.getElementById("q-sub");
    var elLines = document.getElementById("q-lines");
    var elDay   = document.getElementById("q-day");
    var elWa    = document.getElementById("q-wa");
    var elKm    = document.getElementById("v-km");
    var rangeKm = document.getElementById("r-km");

    function eur(n){
      var s = (Math.round(n * 100) / 100).toFixed(n % 1 === 0 ? 0 : 2).replace(".", ",");
      return s + "\u00a0€";
    }
    function pluriel(n, mot){ return n + " " + mot + (n > 1 ? "s" : ""); }

    function calcul(){
      var v = etat.formule;
      var base = (v === 1 ? TARIFS.visite1 : TARIFS.visite2) * etat.jours;
      var supp = TARIFS.chienSupp * (etat.chiens - 1) * v * etat.jours;
      var prom = TARIFS.promenade * etat.chiens * etat.promenades * etat.jours;
      var kmFactures = Math.max(0, etat.km - TARIFS.kmInclus) * (TARIFS.kmAllerRetour ? 2 : 1);
      var depl = TARIFS.prixKm * kmFactures * (TARIFS.deplacementParVisite ? v : 1) * etat.jours;
      return { base:base, supp:supp, prom:prom, depl:depl, kmFactures:kmFactures,
               total: base + supp + prom + depl };
    }

    var afficheTotal = 0;
    function animeTotal(vers){
      if (reduce){ elTotal.textContent = Math.round(vers); afficheTotal = vers; return; }
      var de = afficheTotal, dur = 420, t0 = null;
      afficheTotal = vers;
      function pas(ts){
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        elTotal.textContent = Math.round(de + (vers - de) * e);
        if (p < 1 && afficheTotal === vers) requestAnimationFrame(pas);
        else if (afficheTotal === vers) elTotal.textContent = Math.round(vers);
      }
      requestAnimationFrame(pas);
    }

    function ligne(titre, detail, montant, gratuit){
      var li = document.createElement("li");
      if (gratuit) li.className = "is-free";
      var g = document.createElement("span");
      g.innerHTML = titre + (detail ? "<small>" + detail + "</small>" : "");
      var b = document.createElement("b");
      b.textContent = gratuit ? "Offert" : eur(montant);
      li.appendChild(g); li.appendChild(b);
      elLines.appendChild(li);
    }

    function rendu(){
      var c = calcul();
      var v = etat.formule;

      animeTotal(c.total);
      elSub.textContent = pluriel(etat.jours, "jour") + ", " + v + " visite" + (v > 1 ? "s" : "") +
                          " par jour, " + pluriel(etat.chiens, "chien");

      elLines.innerHTML = "";
      ligne("Garde à domicile",
            pluriel(etat.jours, "jour") + " × " + eur(v === 1 ? TARIFS.visite1 : TARIFS.visite2) + " / jour",
            c.base, false);

      if (etat.chiens > 1){
        ligne(pluriel(etat.chiens - 1, "chien") + " en plus",
              eur(TARIFS.chienSupp) + " par chien et par visite",
              c.supp, false);
      }
      if (etat.promenades > 0){
        ligne(pluriel(etat.promenades * etat.jours * etat.chiens, "promenade"),
              eur(TARIFS.promenade) + " par chien et par promenade",
              c.prom, false);
      }
      if (c.kmFactures > 0){
        ligne("Déplacement",
              c.kmFactures + " km facturés par visite au-delà des " + TARIFS.kmInclus + " km inclus",
              c.depl, false);
      } else {
        ligne("Déplacement", "Vous êtes à moins de " + TARIFS.kmInclus + " km", 0, true);
      }

      elDay.textContent = eur(c.total / etat.jours);

      var msg = "Bonjour Alexandre, j'ai fait une estimation sur le site :\n\n"
              + "• Garde de " + pluriel(etat.jours, "jour") + "\n"
              + "• " + v + " visite" + (v > 1 ? "s" : "") + " par jour\n"
              + "• " + pluriel(etat.chiens, "chien") + "\n"
              + "• " + (etat.promenades === 0 ? "Sans promenade" : etat.promenades + " promenade" + (etat.promenades > 1 ? "s" : "") + " par jour") + "\n"
              + "• Distance : " + etat.km + " km depuis Le Gosier\n\n"
              + "Total estimé : " + eur(c.total).replace("\u00a0", " ") + "\n\n"
              + "Est-ce que c'est possible sur mes dates ?";
      elWa.href = "https://wa.me/590690302359?text=" + encodeURIComponent(msg);

      quote.querySelectorAll(".step-btn").forEach(function(b){
        var k = b.getAttribute("data-step"), d = +b.getAttribute("data-dir");
        b.disabled = (d < 0 && etat[k] <= LIM[k][0]) || (d > 0 && etat[k] >= LIM[k][1]);
      });
    }

    quote.addEventListener("click", function(e){
      var f = e.target.closest("[data-formula]");
      if (f){
        etat.formule = +f.getAttribute("data-formula");
        quote.querySelectorAll("[data-formula]").forEach(function(el){
          var on = el === f;
          el.classList.toggle("is-on", on);
          el.setAttribute("aria-pressed", on ? "true" : "false");
        });
        rendu(); return;
      }
      var p = e.target.closest("[data-promenades]");
      if (p){
        etat.promenades = +p.getAttribute("data-promenades");
        quote.querySelectorAll("[data-promenades]").forEach(function(el){
          var on = el === p;
          el.classList.toggle("is-on", on);
          el.setAttribute("aria-pressed", on ? "true" : "false");
        });
        rendu(); return;
      }
      var s = e.target.closest(".step-btn");
      if (s && !s.disabled){
        var k = s.getAttribute("data-step"), d = +s.getAttribute("data-dir");
        etat[k] = Math.min(LIM[k][1], Math.max(LIM[k][0], etat[k] + d));
        document.getElementById("v-" + k).textContent = etat[k];
        rendu();
      }
    });

    function majKm(){
      etat.km = +rangeKm.value;
      elKm.textContent = etat.km + " km";
      rangeKm.style.setProperty("--fill", (etat.km / (+rangeKm.max)) * 100 + "%");
      rendu();
    }
    rangeKm.addEventListener("input", majKm);
    majKm();
  }

  /* compteurs animés (prix) */
  var counters = document.querySelectorAll(".count");
  function animateCount(el){
    var to = parseInt(el.getAttribute("data-to"), 10) || 0;
    if (reduce){ el.textContent = to; return; }
    var dur = 900, start = null;
    function step(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased);
      if (p < 1) requestAnimationFrame(step); else el.textContent = to;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length){
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ animateCount(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function(el){ co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }
})();
