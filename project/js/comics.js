window.addEventListener("DOMContentLoaded", () => {
    fetch("../json/comics.json")
        .then(res => res.json())
        .then(data => zeigeComics(data));
});

function zeigeComics(comics) {
    let grid = document.getElementById("comicGrid");

    comics.forEach((comic, index) => {
        let card = document.createElement("div");
        card.className = "comicCard";

     
        let img = document.createElement("img");
        img.src = `../images/comics/${index + 1}.webp`;
        img.alt = comic.name;
        img.onerror = () => img.style.display = "none";
        img.className = "comicImage";
        card.appendChild(img);

  
        let title = document.createElement("h2");
        title.textContent = comic.name;

  
        let beschreibung = document.createElement("p");
        beschreibung.textContent = comic.beschreibung;

 
        let bewertenBtn = document.createElement("div");
        bewertenBtn.className = "bewertenBtn";
        bewertenBtn.textContent = "Bewerten";

        let bewertungBox = document.createElement("div");
        bewertungBox.className = "bewertungBereich";
        bewertungBox.style.display = "none";


        let sterneDiv = document.createElement("div");
        sterneDiv.className = "sterne";
        let selectedStars = 0;
        for (let i = 1; i <= 5; i++) {
            let star = document.createElement("span");
            star.innerHTML = "★";
            star.dataset.wert = i;
            star.onclick = () => {
                selectedStars = i;
                updateStars(sterneDiv, i);
            };
            sterneDiv.appendChild(star);
        }

        let textarea = document.createElement("textarea");
        textarea.placeholder = "Dein Kommentar...";
        textarea.rows = 3;

        let absenden = document.createElement("div");
        absenden.className = "absendenBtn";
        absenden.textContent = "Bewertung absenden";
        absenden.onclick = () => {
            if (selectedStars === 0 || textarea.value.trim() === "") {
                alert("Bitte Sterne und Kommentar eingeben.");
                return;
            }
            saveReview(comic.name, selectedStars, textarea.value.trim());
            bewertenBtn.textContent = "Bewertet";
            bewertungBox.style.display = "none";
        };

        bewertungBox.appendChild(sterneDiv);
        bewertungBox.appendChild(textarea);
        bewertungBox.appendChild(absenden);
        bewertenBtn.onclick = () => {
            let user = JSON.parse(localStorage.getItem("userinfo"));
            if (!user || user.username === "none") {
                zeigePopUp();
                return;
            }
            if (bewertungBox.style.display === "flex") {
                bewertungBox.style.display = "none";
            } else {
                bewertungBox.style.display = "flex";
            
               
                setTimeout(() => {
                    document.addEventListener("click", function handleClickOutside(event) {
                        if (!bewertungBox.contains(event.target) && event.target !== bewertenBtn) {
                            bewertungBox.style.display = "none";
                            document.removeEventListener("click", handleClickOutside);
                        }
                    });
                }, 0); 
            }
            
        };
        

        card.appendChild(title);
        card.appendChild(beschreibung);
        card.appendChild(bewertenBtn);
        card.appendChild(bewertungBox);
        grid.appendChild(card);
    });
}

function updateStars(container, wert) {
    const alle = container.querySelectorAll("span");
    alle.forEach(s => {
        s.classList.remove("aktiv");
        if (parseInt(s.dataset.wert) <= wert) s.classList.add("aktiv");
    });
}

function saveReview(comicTitle, stars, comment) {
    let userInfo = JSON.parse(localStorage.getItem("userinfo"));
    let profile = JSON.parse(localStorage.getItem("profile"));
    if (!userInfo) {
        alert("Du musst angemeldet sein, um zu bewerten.");
        return;
    }

    let alleBewertungen = JSON.parse(localStorage.getItem("bewertungen")) || [];

    let neueBewertung = {
        username: userInfo.username || userInfo.vorname,
        profilbild: "../images/vorseite/profilBild/" + userInfo.profilBild,
        comic: comicTitle,
        sterne: stars,
        kommentar: comment
    };

    alleBewertungen.push(neueBewertung);
    localStorage.setItem("bewertungen", JSON.stringify(alleBewertungen));

    let gelesen = JSON.parse(localStorage.getItem("geleseneComics")) || [];
    if (!gelesen.includes(comicTitle)) {
        gelesen.push(comicTitle);
        localStorage.setItem("geleseneComics", JSON.stringify(gelesen));
    }
}
function zeigePopUp() {
    let overlay = document.createElement("div");
    overlay.id = "popupOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "9998";

    let pop = document.createElement("div");
    pop.style.position = "fixed";
    pop.style.top = "50%";
    pop.style.left = "50%";
    pop.style.transform = "translate(-50%, -50%)";
    pop.style.zIndex = "9999";
    pop.style.background = "#111";
    pop.style.color = "white";
    pop.style.padding = "30px";
    pop.style.border = "3px solid red";
    pop.style.borderRadius = "16px";
    pop.style.textAlign = "center";
    pop.style.boxShadow = "0 0 20px red";

    pop.innerHTML = `
        <h3>Anmeldung erforderlich</h3>
        <p>Du musst dich anmelden, um Comics zu bewerten.</p>
        <a href="../html/vorseite.html" style="display:inline-block;
        margin-top:10px;
        padding:10px 20px;
        background:red;
        color:white;
        text-decoration:none;
        border-radius:10px;
        font-weight:bold;
        ">Zur Anmeldung</a>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(pop);

    overlay.onclick = () => {
        overlay.remove();
        pop.remove();
    };

    setTimeout(() => {
        if (document.body.contains(pop)) {
            overlay.remove();
            pop.remove();
        }
    }, 5000);
}
