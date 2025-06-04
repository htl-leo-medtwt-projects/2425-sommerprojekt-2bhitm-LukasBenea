let ironButton = document.getElementById("ironBUTTON");
let captainButton = document.getElementById("captainBUTTON");
let ausgabeTeam = document.getElementById("ausgabeTeam");
let teamBild = document.getElementById("teamBild");
let section4 = document.getElementById("section4");

ironButton.addEventListener("click", function () {
    localStorage.setItem("civilwarTeam", "ironman");
    updateErgebnis("ironman");
    section4.style.backgroundColor = "#EA111D";
    document.getElementById("section4").scrollIntoView({ behavior: "smooth" });
});

captainButton.addEventListener("click", function () {
    localStorage.setItem("civilwarTeam", "captain");
    updateErgebnis("captain");
    section4.style.backgroundColor = "#106192";
    document.getElementById("section4").scrollIntoView({ behavior: "smooth" });
});

function updateErgebnis(team) {
    if (team === "ironman") {
        ausgabeTeam.innerText = "Deine Wahl: Team Iron Man";
        teamBild.src = "../images/civilWar/iron.png";
    }
    if (team === "captain") {
        ausgabeTeam.innerText = "Deine Wahl: Team Captain America";
        teamBild.src = "../images/civilWar/cap.png";
    }
}

let sterneContainer = document.getElementById("sterneContainer");
let kommentarFeld = document.getElementById("kommentarFeld");
let sendenButton = document.getElementById("sendenButton");

let ausgewaehlteSterne = 0;

for (let i = 1; i <= 5; i++) {
    let stern = document.createElement("div");
    stern.classList.add("stern");
    stern.innerHTML = "★";
    stern.dataset.index = i;
    stern.addEventListener("click", function () {
        ausgewaehlteSterne = parseInt(this.dataset.index);
        zeigeSterne();
    });
    sterneContainer.appendChild(stern);
}

function zeigeSterne() {
    let alleSterne = document.querySelectorAll(".stern");
    for (let i = 0; i < alleSterne.length; i++) {
        if (i < ausgewaehlteSterne) {
            alleSterne[i].classList.add("aktiv");
        } else {
            alleSterne[i].classList.remove("aktiv");
        }
    }
}

sendenButton.addEventListener("click", function () {
    let kommentar = kommentarFeld.value.trim();
    if (ausgewaehlteSterne === 0) return;
    if (kommentar === "") kommentar = "-";

    let userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (!userinfo) return;

    let alleBewertungen = JSON.parse(localStorage.getItem("bewertungen")) || [];

    let neueBewertung = {
        username: userinfo.username,
        comic: "Civil War",
        sterne: ausgewaehlteSterne,
        kommentar: kommentar
    };

    alleBewertungen.push(neueBewertung);
    localStorage.setItem("bewertungen", JSON.stringify(alleBewertungen));

    window.location.href = "./index.html";
});

// beim Laden KEIN Team anzeigen
window.addEventListener("load", function () {
    section4.style.backgroundColor = varSiteColor();
});

function varSiteColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--siteBackgroundcolor').trim();
}
