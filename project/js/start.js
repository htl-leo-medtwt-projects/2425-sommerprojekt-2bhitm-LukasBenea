// **********************************************
// *********** SECTION: Benutzerprofil anzeigen
// **********************************************

document.addEventListener("DOMContentLoaded", function () {
  
    document.addEventListener("DOMContentLoaded", function () {
        console.log("==== TESTSTART ====");
    
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        let fromLogin = localStorage.getItem("fromLogin");
    
        console.log("userinfo:", userinfo);
        console.log("fromLogin:", fromLogin);
    
        console.log("==== TESTENDE ====");
    });
  let userinfo = JSON.parse(localStorage.getItem("userinfo"));
  let footer = document.getElementById("footer");

  let accountDiv = document.createElement("div");
  accountDiv.id = "accountBild";

  if (userinfo && userinfo.bild) {
      let img = document.createElement("img");
      img.src = userinfo.bild;
      img.style.width = "80px";
      img.style.border = "5px solid #D9D9D9";
      img.style.cursor = "pointer";
      accountDiv.appendChild(img);

      img.addEventListener("click", function () {
          location.href = "../html/account.html";
      });

  } else {
      let login = document.createElement("div");
      login.textContent = "Anmelden";
      login.style.color = "white";
      login.style.fontWeight = "bold";
      login.style.fontSize = "20px";
      login.style.cursor = "pointer";
      login.style.position = "absolute";
      login.style.right = "16px";
      login.style.bottom = "16px";

      login.addEventListener("click", function () {
          location.href = "../html/login.html";
      });

      accountDiv.appendChild(login);
  }

  footer.appendChild(accountDiv);

  // **********************************************
  // *********** SECTION: Comic-Klick-Panel
  // **********************************************

  let comics = document.querySelectorAll("#comics img");
  let comicPanel = document.getElementById("comicPanel");
  let comicTitle = document.getElementById("comicTitle");
  let comicDesc = document.getElementById("comicDesc");
  let commentBox = document.getElementById("commentBox");
  let closePanel = document.getElementById("closePanel");
  let stars = document.querySelectorAll(".star");

  comics.forEach((comic) => {
      comic.addEventListener("click", function () {
          let title = comic.getAttribute("data-title");
          let desc = comic.getAttribute("data-desc");

          comicTitle.textContent = title;
          comicDesc.textContent = desc;
          comicPanel.style.display = "flex";

          stars.forEach((s) => s.classList.remove("active"));
          commentBox.value = "";
      });
  });

  // **********************************************
  // *********** SECTION: Bewertungsterne
  // **********************************************

  stars.forEach((star, index) => {
      star.addEventListener("click", function () {
          stars.forEach((s, i) => {
              if (i <= index) {
                  s.classList.add("active");
              } else {
                  s.classList.remove("active");
              }
          });
      });
  });

  // **********************************************
  // *********** SECTION: Panel schließen
  // **********************************************

  if (closePanel) {
    closePanel.addEventListener("click", function () {
        comicPanel.style.display = "none";
    });
}

});
// **********************************************
// *********** SECTION: Footer Account-Anzeige **
// **********************************************

document.addEventListener("DOMContentLoaded", function () {
  let footer = document.getElementById("footer");
  if (!footer) return;

  let existingAccount = document.getElementById("accountBild");
  if (existingAccount) {
      existingAccount.remove();
  }

  let accountDiv = document.createElement("div");
  accountDiv.id = "accountBild";

  let userinfo = JSON.parse(localStorage.getItem("userinfo"));

  if (!userinfo || userinfo.username === "none") {
      // Gast = zeige Anmeldebutton
      let loginBtn = document.createElement("div");
      loginBtn.textContent = "Anmelden";
      loginBtn.style.color = "white";
      loginBtn.style.fontWeight = "bold";
      loginBtn.style.fontSize = "20px";
      loginBtn.style.cursor = "pointer";
      loginBtn.style.backgroundColor = "black";
      loginBtn.style.border = "2px solid white";
      loginBtn.style.padding = "10px 20px";
      loginBtn.style.borderRadius = "5px";
      loginBtn.style.position = "absolute";
      loginBtn.style.right = "16px";
      loginBtn.style.bottom = "16px";
      loginBtn.style.zIndex = "10000";

      loginBtn.addEventListener("click", function () {
          location.href = "../html/vorseite.html";
      });

      accountDiv.appendChild(loginBtn);

  } else {
      // Angemeldeter User = zeige Profilbild
      let img = document.createElement("img");
      img.src = `../images/vorseite/profilBild/${userinfo.profilBild}`;
      img.style.cursor = "pointer";
      img.style.width = "80px";
      img.style.border = "5px solid #D9D9D9";
      img.addEventListener("click", function () {
          location.href = "../html/account.html";
      });
      accountDiv.appendChild(img);
  }

  footer.appendChild(accountDiv);
});


// *********** SECTION: Comic-Slider mit Infobox ***********

let currentIndex = 0;
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let totalSlides = slides.length;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentIndex = index;
}

showSlide(0);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});


// **********************************************
// *********** Bewertungssysteme ****************
// **********************************************


let selectedStars = {}; 

document.querySelectorAll(".slide").forEach(slide => {
  slide.querySelectorAll(".sterne span").forEach(star => {
    star.addEventListener("click", function() {
      let slideId = slide.dataset.slideId;
      selectedStars[slideId] = parseInt(this.getAttribute("data-wert"));
      updateStars(slide, selectedStars[slideId]);
    });
  });
});

function updateStars(slide, wert) {
  slide.querySelectorAll(".sterne span").forEach(star => {
    star.classList.remove("aktiv");
    if (parseInt(star.getAttribute("data-wert")) <= wert) {
      star.classList.add("aktiv");
    }
  });
}

function saveReview(comicTitle, stars, comment) {
  let userInfo = getUserInfo();
  let profile = getProfile();
  markAsRead(comicTitle);


  if (!userInfo) {
    alert("Du musst eingeloggt sein, um zu bewerten!");
    return;
  }

  let allReviews = JSON.parse(localStorage.getItem("bewertungen")) || [];

  let newReview = {
    username: userInfo.username || userInfo.vorname,
    profilbild: profile ? profile.bild : "../images/default.png",
    comic: comicTitle,
    sterne: stars,
    kommentar: comment
  };

  allReviews.push(newReview);
  localStorage.setItem("bewertungen", JSON.stringify(allReviews));


}
let gelesen = JSON.parse(localStorage.getItem("geleseneComics")) || [];
if (!gelesen.includes(comicTitle)) {
    gelesen.push(comicTitle);
    localStorage.setItem("geleseneComics", JSON.stringify(gelesen));
}

// **********************************************
// *********** SECTION: Comic als gelesen markieren
// **********************************************
function markAsRead(comicTitle) {
  let gelesen = JSON.parse(localStorage.getItem("geleseneComics")) || [];

  if (!gelesen.includes(comicTitle)) {
      gelesen.push(comicTitle);
      localStorage.setItem("geleseneComics", JSON.stringify(gelesen));
  }
}



document.querySelectorAll(".slide").forEach((slide, index) => {
  slide.dataset.slideId = index; 

  let bewertenButton = slide.querySelector(".bewerten");

  bewertenButton.addEventListener("click", function() {
    let infoText = slide.querySelector(".info-text");
    let bewertungBereich = slide.querySelector(".bewertung-bereich");

    let commentInput = slide.querySelector("textarea");
    let comicTitle = slide.querySelector(".info-box h2").innerText;
    let slideId = slide.dataset.slideId;

    let isInBewertenMode = bewertungBereich.style.display === "flex";

    if (!isInBewertenMode) {
      infoText.style.display = "none";
      bewertungBereich.style.display = "flex";
      bewertenButton.textContent = "Bewertung absenden";
    } else {
      let stars = selectedStars[slideId] || 0;
      let comment = commentInput.value.trim();

      if (stars === 0 || comment === "") {
        alert("Bitte gib Sterne und Kommentar ein!");
        return;
      }

      saveReview(comicTitle, stars, comment);

      infoText.style.display = "block";
      bewertungBereich.style.display = "none";
      bewertenButton.textContent = "bewerten";
      commentInput.value = "";
      updateStars(slide, 0); 
      selectedStars[slideId] = 0;
    }
  });
});
