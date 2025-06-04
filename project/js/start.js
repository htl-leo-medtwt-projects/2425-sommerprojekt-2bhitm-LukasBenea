// **********************************************
// *********** SECTION: Benutzerprofil anzeigen
// **********************************************

document.addEventListener("DOMContentLoaded", function () {
  let userinfo = JSON.parse(localStorage.getItem("userinfo"));
  let footer = document.getElementById("footer");

  if (!footer) return;

  let existingAccount = document.getElementById("accountBild");
  if (existingAccount) existingAccount.remove();

  let accountDiv = document.createElement("div");
  accountDiv.id = "accountBild";

  if (!userinfo || userinfo.username === "none") {
    let loginBtn = document.createElement("div");
    loginBtn.textContent = "Anmelden";
    loginBtn.style.cssText = `
      color: white;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
      background-color: black;
      border: 2px solid white;
      padding: 10px 20px;
      border-radius: 5px;
      position: absolute;
      right: 16px;
      bottom: 16px;
      z-index: 10000;
    `;
    loginBtn.addEventListener("click", function () {
      location.href = "../html/vorseite.html";
    });
    accountDiv.appendChild(loginBtn);
  } else {
    let img = document.createElement("img");
    img.src = `../images/vorseite/profilBild/${userinfo.profilBild}`;
    img.style.cssText = `
      width: 80px;
      border: 5px solid #D9D9D9;
      cursor: pointer;
    `;
    img.addEventListener("click", function () {
      location.href = "../html/account.html";
    });
    accountDiv.appendChild(img);
  }

  footer.appendChild(accountDiv);
});

// **********************************************
// *********** SECTION: Comic-Slider
// **********************************************

let currentIndex = 0;
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentIndex = index;
}

showSlide(0);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

// **********************************************
// *********** SECTION: Bewertungssysteme
// **********************************************

let selectedStars = {};

document.querySelectorAll(".slide").forEach((slide, index) => {
  slide.dataset.slideId = index;

  let bewertenButton = slide.querySelector(".bewerten");
  let sterneDiv = slide.querySelector(".sterne");
  let textarea = slide.querySelector("textarea");
  let infoBox = slide.querySelector(".info-text");
  let bewertungBereich = slide.querySelector(".bewertung-bereich");

  slide.querySelectorAll(".sterne span").forEach(star => {
    star.addEventListener("click", function () {
      selectedStars[index] = parseInt(star.dataset.wert);
      updateStars(sterneDiv, selectedStars[index]);
    });
  });

  bewertenButton.addEventListener("click", function () {
    let user = JSON.parse(localStorage.getItem("userinfo"));
    if (!user || user.username === "none") {
      zeigePopUp();
      return;
    }

    let isOpen = bewertungBereich.style.display === "flex";

    if (!isOpen) {
      infoBox.style.display = "none";
      bewertungBereich.style.display = "flex";
      bewertenButton.textContent = "Bewertung absenden";
    } else {
      let stars = selectedStars[index] || 0;
      let comment = textarea.value.trim();
      if (stars === 0 || comment === "") {
        alert("Bitte Sterne und Kommentar eingeben.");
        return;
      }
      let comicTitle = slide.querySelector("h2").innerText;
      saveReview(comicTitle, stars, comment);
      infoBox.style.display = "block";
      bewertungBereich.style.display = "none";
      bewertenButton.textContent = "bewerten";
      textarea.value = "";
      updateStars(sterneDiv, 0);
      selectedStars[index] = 0;
    }
  });
});

function updateStars(container, wert) {
  container.querySelectorAll("span").forEach(star => {
    star.classList.remove("aktiv");
    if (parseInt(star.dataset.wert) <= wert) {
      star.classList.add("aktiv");
    }
  });
}

function saveReview(comicTitle, stars, comment) {
  let user = JSON.parse(localStorage.getItem("userinfo"));
  let profile = user ? { bild: `../images/vorseite/profilBild/${user.profilBild}` } : null;

  if (!user) {
    alert("Du musst angemeldet sein, um zu bewerten.");
    return;
  }

  let alleBewertungen = JSON.parse(localStorage.getItem("bewertungen")) || [];

  let neueBewertung = {
    username: user.username || user.vorname,
    profilbild: profile ? profile.bild : "../images/default.png",
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
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 9998;
  `;

  let pop = document.createElement("div");
  pop.style.cssText = `
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: #111;
    color: white;
    padding: 30px;
    border: 3px solid red;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 0 20px red;
    z-index: 9999;
  `;
  pop.innerHTML = `
    <h3>Anmeldung erforderlich</h3>
    <p>Du musst dich anmelden, um Comics zu bewerten.</p>
    <a href="../html/vorseite.html" style="
      display: inline-block;
      margin-top: 10px;
      padding: 10px 20px;
      background: red;
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: bold;
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
