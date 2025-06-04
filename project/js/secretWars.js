let reedPunkte = 0;
let doomPunkte = 0;

let w1 = document.getElementById("wuerfel1");
let w2 = document.getElementById("wuerfel2");
let ergebnis = document.getElementById("rundenErgebnis");
let punkteReed = document.getElementById("reedPunkte");
let punkteDoom = document.getElementById("doomPunkte");
let knopf = document.getElementById("wuerfelKnopf");
let bild = document.getElementById("gewinnerBild");
let entscheidung = document.getElementById("entscheidung");
let bewertung = document.getElementById("bewertung");

knopf.addEventListener("click", function() {
  let zahl1 = Math.floor(Math.random() * 6) + 1;
  let zahl2 = Math.floor(Math.random() * 6) + 1;

  w1.innerText = zahl1;
  w2.innerText = zahl2;

  if (zahl1 > zahl2) {
    reedPunkte = reedPunkte + 1;
    ergebnis.innerText = "Reed gewinnt diese Runde!";
  } else {
    if (zahl2 > zahl1) {
      doomPunkte = doomPunkte + 1;
      ergebnis.innerText = "Doom dominiert diese Runde!";
    } else {
      ergebnis.innerText = "Unentschieden!";
    }
  }

  punkteReed.innerText = "Reed: " + reedPunkte;
  punkteDoom.innerText = "Doom: " + doomPunkte;

  if (reedPunkte === 5 || doomPunkte === 5) {
    knopf.style.display = "none";

    if (reedPunkte === 5) {
      ergebnis.innerText = "Reed hat Secret Wars gewonnen!";
      bild.src = "../images/secretWars/wReed.jpg";
    } else {
      ergebnis.innerText = "Doom bleibt Gott von Battleworld!";
      bild.src = "../images/secretWars/wDoom.jpg";
    }

    bild.style.display = "block";
    entscheidung.style.display = "block";
  }
});

function ratingAnzeigen() {
  bewertung.innerHTML = "";

  let ausgewaehlt = 0;
  let sternBox = document.createElement("div");
  sternBox.className = "stars";

  for (let i = 1; i <= 5; i++) {
    let stern = document.createElement("span");
    stern.innerText = "★";
    stern.dataset.wert = i;

    stern.addEventListener("click", function() {
      ausgewaehlt = i;
      let alle = sternBox.querySelectorAll("span");
      for (let j = 0; j < alle.length; j++) {
        let sternWert = parseInt(alle[j].dataset.wert);
        if (sternWert <= ausgewaehlt) {
          alle[j].classList.add("active");
        } else {
          alle[j].classList.remove("active");
        }
      }
    });

    sternBox.appendChild(stern);
  }

  let kommentar = document.createElement("textarea");
  kommentar.placeholder = "Dein Kommentar...";

  let abschicken = document.createElement("div");
  abschicken.className = "submitRating";
  abschicken.innerText = "Bewertung absenden";

  abschicken.addEventListener("click", function() {
    let user = JSON.parse(localStorage.getItem("userinfo"));
    if (user === null) {
      alert("Du musst eingeloggt sein, um zu bewerten.");
      return;
    }

    if (ausgewaehlt === 0 || kommentar.value.trim() === "") {
      alert("Bitte gib Sterne und einen Kommentar ein.");
      return;
    }

    let eintrag = {
      username: user.username || user.vorname,
      profilbild: "../images/vorseite/profilBild/" + user.profilBild,
      comic: "Secret Wars",
      sterne: ausgewaehlt,
      kommentar: kommentar.value.trim()
    };

    let alle = JSON.parse(localStorage.getItem("bewertungen")) || [];
    alle.push(eintrag);
    localStorage.setItem("bewertungen", JSON.stringify(alle));

    window.location.href = "./index.html";
  });

  bewertung.appendChild(sternBox);
  bewertung.appendChild(kommentar);
  bewertung.appendChild(abschicken);
}
let folgeBtn = document.getElementById("folge");
let rebellBtn = document.getElementById("rebell");
let bewertungSection = document.getElementById("section5");

folgeBtn.addEventListener("click", function () {
  bewertungSection.scrollIntoView({ behavior: "smooth" });
});

rebellBtn.addEventListener("click", function () {
  bewertungSection.scrollIntoView({ behavior: "smooth" });
});

ratingAnzeigen();
