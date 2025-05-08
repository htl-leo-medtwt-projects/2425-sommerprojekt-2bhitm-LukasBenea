// **********************************************
// *********** account.js ***********************
// **********************************************

document.addEventListener("DOMContentLoaded", function() {
    let navButtons = document.querySelectorAll(".navButton");
    let mainContent = document.getElementById("mainContent");
  
    navButtons.forEach(button => {
        button.addEventListener("click", function() {
            let target = this.getAttribute("data-target");
  
            if (target === "account") {
                showAccountView();
            } else if (target === "daten") {
                showUserData();
            } else if (target === "comics") {
                showReadComics();
            } else if (target === "errungenschaften") {
                showAchievements();
            }
        });
    });
  
    function showAccountView() {
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (!userinfo) return;
  
        let alleBewertungen = JSON.parse(localStorage.getItem("bewertungen")) || [];
  
        let bildPfade = {
            "Deadpool Kills The Marvel Universe": "../images/startseite/dkills.jpg",
            "Planet Hulk": "../images/startseite/planet-hulk.jpg",
            "Marvel Zombies": "../images/startseite/zombies.jpg",
            "Fantastic Four Unthinkable": "../images/startseite/f4.jpg",
            "Spiderverse": "../images/startseite/spiderverse.jpg",
            "Annihilation": "../images/startseite/ann.jpg"
        };
  
        let uniqueComics = [];
        for (let i = alleBewertungen.length - 1; i >= 0 && uniqueComics.length < 4; i--) {
            if (!uniqueComics.includes(alleBewertungen[i].comic)) {
                uniqueComics.push(alleBewertungen[i].comic);
            }
        }
  
        mainContent.innerHTML = `
        <div class="accountView">
            <div class="topSection">
                <div class="profilePic" style="width: 200px; height: 200px;">
                    <img id="profilbild" src="../images/vorseite/profilBild/${userinfo.profilBild}" alt="Profilbild" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
                </div>
            F    <div class="userInfo">
                    <div class="username" id="username" style="font-size: 28px; padding: 15px;">${userinfo.username}</div>
                    <div class="levelBar" style="height: 40px;">
                        <div class="levelFill" id="levelFill" style="width: 40%; height: 100%; background: red;"></div>
                    </div>
                </div>
            </div>
  
            <div class="comicGallery" style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 40px;">
                ${uniqueComics.map(comic => `
                    <div class="comicItem" style="background:#222; padding:10px; border:2px solid white; border-radius:20px; box-shadow:0 0 10px red; overflow:hidden; height:250px; width: 200px;">
                        <img src="${bildPfade[comic] || '../images/startseite/placeholder.jpg'}" alt="${comic}" style="width:100%; height:100%; object-fit:cover; border-radius:15px;">
                    </div>
                `).join('')}
            </div>
        </div>
        `;
  
        let images = document.querySelectorAll(".comicItem img");
        images.forEach(img => {
            img.addEventListener("mouseover", () => {
                img.style.transform = "scale(1.05)";
            });
            img.addEventListener("mouseout", () => {
                img.style.transform = "scale(1)";
            });
        });
    }
  
    function showUserData() {
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (!userinfo) return;
  
        mainContent.innerHTML = `
        <div style="padding: 30px;">
            <h2 style="margin-bottom: 20px;">Deine Daten bearbeiten</h2>
            <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
                <input type="text" id="editVorname" placeholder="Vorname" value="${userinfo.vorname}" style="padding: 10px; border-radius: 10px; border: 2px solid white; background: #222; color: white;">
                <input type="text" id="editNachname" placeholder="Nachname" value="${userinfo.nachname}" style="padding: 10px; border-radius: 10px; border: 2px solid white; background: #222; color: white;">
                <input type="text" id="editGeburtsdatum" placeholder="Geburtsdatum" value="${userinfo.geburtsdatum}" style="padding: 10px; border-radius: 10px; border: 2px solid white; background: #222; color: white;">
                <input type="email" id="editEmail" placeholder="E-Mail" value="${userinfo.email}" style="padding: 10px; border-radius: 10px; border: 2px solid white; background: #222; color: white;">
                <input type="text" id="editUsername" placeholder="Username" value="${userinfo.username}" style="padding: 10px; border-radius: 10px; border: 2px solid white; background: #222; color: white;">
                <div id="saveButton" style="padding: 10px; background: red; color: white; text-align: center; border-radius: 10px; cursor: pointer; font-weight: bold;">Speichern</div>
            </div>
        </div>
        `;
  
        document.getElementById("saveButton").addEventListener("click", function() {
            userinfo.vorname = document.getElementById("editVorname").value;
            userinfo.nachname = document.getElementById("editNachname").value;
            userinfo.geburtsdatum = document.getElementById("editGeburtsdatum").value;
            userinfo.email = document.getElementById("editEmail").value;
            userinfo.username = document.getElementById("editUsername").value;
  
            localStorage.setItem("userinfo", JSON.stringify(userinfo));
            alert("Daten gespeichert!");
            showUserData();
        });
    }
  
    function showReadComics() {
        let gelesen = JSON.parse(localStorage.getItem("geleseneComics")) || [];
  
        mainContent.innerHTML = `
        <div style="padding: 30px;">
            <h2>Gelesene Comics</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${gelesen.length > 0 ? gelesen.map(comic => `<div style="background:#222; padding:10px; border:2px solid white; border-radius:10px;">${comic}</div>`).join('') : "<p>Du hast noch keine Comics gelesen!</p>"}
            </div>
        </div>
        `;
    }
  
    function showAchievements() {
        mainContent.innerHTML = `
        <div style="padding: 30px;">
            <h2>Errungenschaften</h2>
        </div>
        `;
    }
  
    showAccountView();
  });