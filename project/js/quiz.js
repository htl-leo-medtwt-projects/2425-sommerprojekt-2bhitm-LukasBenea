let fragen = [];
let index = 0;
let tagPunkte = {};

window.addEventListener("DOMContentLoaded", function () {
    fetch("../json/comics.json")
        .then(res => res.json())
        .then(data => localStorage.setItem("alleComics", JSON.stringify(data)));

    fetch("../json/questions.json")
        .then(res => res.json())
        .then(data => {
            fragen = data;
            ladeFrage();
        });

    document.getElementById("weiterButton").onclick = function () {
        let frage = fragen[index];
        if (frage.typ === "skala") {
            let wert = parseInt(document.getElementById("sliderInput").value);
            for (let eintrag of frage.tagVerteilung) {
                if (wert <= eintrag.bis) {
                    zähleTags(eintrag.tags);
                    break;
                }
            }
            weiter();
        }
    };
});

function ladeFrage() {
    document.getElementById("ergebnisBereich").style.display = "none";
    let frageObj = fragen[index];
    document.getElementById("frageBereich").textContent = frageObj.frage;
    let ab = document.getElementById("antwortBereich");
    ab.innerHTML = "";

    if (frageObj.typ === "choice") {
        frageObj.antworten.forEach(a => {
            let div = document.createElement("div");
            div.className = "antwortOption";
            div.textContent = a.text;
            div.onclick = () => {
                zähleTags(a.tags);
                weiter();
            };
            ab.appendChild(div);
        });
    }

    if (frageObj.typ === "skala") {
        let input = document.createElement("input");
        input.type = "range";
        input.min = frageObj.skala.min;
        input.max = frageObj.skala.max;
        input.value = 5;
        input.id = "sliderInput";
        ab.appendChild(input);
    }

    if (frageObj.typ === "jaNein") {
        ["Ja", "Nein"].forEach(wort => {
            let div = document.createElement("div");
            div.className = "antwortOption";
            div.textContent = wort;
            div.onclick = () => {
                zähleTags(wort === "Ja" ? frageObj.jaTags : frageObj.neinTags);
                weiter();
            };
            ab.appendChild(div);
        });
    }
}

function zähleTags(tags) {
    tags.forEach(tag => {
        if (!tagPunkte[tag]) {
            tagPunkte[tag] = 0;
        }
        tagPunkte[tag]++;
    });
}

function weiter() {
    index++;
    if (index < fragen.length) {
        ladeFrage();
    } else {
        zeigeErgebnis();
    }
}

function zeigeErgebnis() {
    document.getElementById("frageBereich").textContent = "";
    document.getElementById("antwortBereich").innerHTML = "";
    document.getElementById("weiterButton").style.display = "none";

    let sortiert = Object.entries(tagPunkte).sort((a, b) => b[1] - a[1]);
    let topTags = sortiert.slice(0, 3).map(e => e[0]);

    let alleComics = JSON.parse(localStorage.getItem("alleComics")) || [];
    let passende = alleComics.map((c, i) => ({ ...c, index: i }))
        .filter(c => c.tags.some(tag => topTags.includes(tag)));

    passende = [...new Set(passende)];
    passende.sort(() => Math.random() - 0.5);

    let mustRead = passende.find(c => c.tags.includes(topTags[0])) || passende[0];
    let andere = passende.filter(c => c.name !== mustRead.name);
    let empfehlungen = andere.slice(0, 2);
    
  

    let user = JSON.parse(localStorage.getItem("userinfo"));
    if (user) {
        let quizResult = {
            username: user.username,
            profilbild: user.profilBild,
            empfehlungen: empfehlungen.map(e => e.name),
            mustRead: mustRead.name,
            timestamp: new Date().toISOString()
        };

        let alleErgebnisse = JSON.parse(localStorage.getItem("quizErgebnisse")) || [];
        alleErgebnisse.push(quizResult);
        localStorage.setItem("quizErgebnisse", JSON.stringify(alleErgebnisse));
    }

    let ergebnisDiv = document.getElementById("ergebnisBereich");
    ergebnisDiv.style.display = "block";
    ergebnisDiv.innerHTML = `
        <h2>Basierend auf deinen Antworten solltest du Folgendes lesen:</h2>
        <div class="ergebnisPodest">
            <div class="empfehlungBox">
                ${comicCardHTML(empfehlungen[0])}
            </div>
            <div class="empfehlungBox must">
                ${comicCardHTML(mustRead, true)}
            </div>
            <div class="empfehlungBox">
                ${comicCardHTML(empfehlungen[1])}
            </div>
        </div>
    `;
}

function comicCardHTML(comic, isMust = false) {
    if (!comic) return `<div class="leer">Keine Empfehlung verfügbar</div>`;
    return `
        <img src="../images/comics/${comic.index + 1}.webp" alt="${comic.name}">
      <h3>${isMust ? "Must Read: " + comic.name : comic.name}</h3>
        <p>${comic.beschreibung}</p>
    `;
}
