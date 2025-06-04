let stones = [
  { name: "soul", image: "../images/infinity/getSoul.png", text: "Soul – vom In-Betweener gestohlen." },
  { name: "power", image: "../images/infinity/getPower.png", text: "Power – vom Champion nach einem Kampf genommen." },
  { name: "time", image: "../images/infinity/getTime.png", text: "Time – vom Gardener nach einem Skirmish." },
  { name: "space", image: "../images/infinity/getSpace.png", text: "Space – vom Runner, den Thanos zum Baby machte." },
  { name: "reality", image: "../images/infinity/getReality.png", text: "Reality – beim Collector eingetauscht." },
  { name: "mind", image: "../images/infinity/getMind.png", text: "Mind – gewonnen vom Grandmaster im Spiel." }
];

let foundStones = new Set();
let selectedStars = 0;

window.addEventListener("DOMContentLoaded", () => {
  let container = document.getElementById("stoneMapContainer");
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  stones.forEach(stone => {
    let img = document.createElement("img");
    img.src = `../images/infinity/${stone.name}Stone.png`;
    img.className = "stone-img";
    img.style.position = "absolute";
    img.style.width = "50px";
    img.style.left = Math.random() * (width - 60) + "px";
    img.style.top = Math.random() * (height - 80) + "px";

    img.onclick = () => {
      document.getElementById("popupImage").src = stone.image;
      document.getElementById("popupText").innerText = stone.text;
      document.getElementById("zoomPopup").classList.add("active");

      foundStones.add(stone.name);
      checkForAllStones();
    };

    container.appendChild(img);
  });

  function checkForAllStones() {
    if (foundStones.size === stones.length) {
      const ratingDiv = document.getElementById("ratingSection");
      if (ratingDiv) {
        ratingDiv.style.display = "block";
        ratingDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  document.querySelectorAll('.stars span').forEach(star => {
    star.addEventListener('click', () => {
      selectedStars = parseInt(star.getAttribute('data-star'));
      updateRatingStars(selectedStars);
    });
  });

  function updateRatingStars(wert) {
    document.querySelectorAll('.stars span').forEach(star => {
      let starWert = parseInt(star.getAttribute('data-star'));
      star.classList.toggle('active', starWert <= wert);
    });
  }

  const submitBtn = document.querySelector('.submitRating');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const comment = document.getElementById('comment').value.trim();
      const userinfo = JSON.parse(localStorage.getItem('userinfo'));

      if (!userinfo) {
        alert('Du musst eingeloggt sein, um zu bewerten.');
        return;
      }

      if (selectedStars === 0 || comment === '') {
        alert('Bitte gib Sterne und einen Kommentar ein.');
        return;
      }

      const bewertung = {
        username: userinfo.username || userinfo.vorname,
        profilbild: `../images/vorseite/profilBild/${userinfo.profilBild}`,
        comic: "Infinity Gauntlet",
        sterne: selectedStars,
        kommentar: comment
      };

      const alleBewertungen = JSON.parse(localStorage.getItem("bewertungen")) || [];
      alleBewertungen.push(bewertung);
      localStorage.setItem("bewertungen", JSON.stringify(alleBewertungen));

      window.location.href = "./index.html";
    });
  }
});

function closePopup() {
  document.getElementById("zoomPopup").classList.remove("active");
}
