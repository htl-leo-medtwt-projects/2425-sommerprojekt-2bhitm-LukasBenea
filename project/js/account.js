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
                <div class="userInfo">
                    <div class="username" id="username" style="font-size: 28px; padding: 15px;">${userinfo.username}</div>
                   
                </div>
            </div>

            <div class="comicGallery" style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 10px;">
                ${uniqueComics.map(comic => `
                   <div class="comicItem" style="background:#222; padding:10px; border:2px solid white; border-radius:20px; box-shadow:0 0 10px red; overflow:hidden; height:770px; width: 200px;">

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
        <h2 style="margin-bottom: 20px;">Deine Account-Daten bearbeiten</h2>
        <div style="display: flex; flex-direction: column; gap: 15px; max-width: 400px;">

            <label>Vorname:</label>
            <input type="text" id="editVorname" value="${userinfo.vorname}" style="padding: 10px; border-radius: 8px; border: 2px solid white; background: #222; color: white;">

            <label>Nachname:</label>
            <input type="text" id="editNachname" value="${userinfo.nachname}" style="padding: 10px; border-radius: 8px; border: 2px solid white; background: #222; color: white;">

            <label>Geburtsdatum:</label>
            <input type="text" id="editGeburtsdatum" value="${userinfo.geburtsdatum}" style="padding: 10px; border-radius: 8px; border: 2px solid white; background: #222; color: white;">

            <label>E-Mail:</label>
            <input type="email" id="editEmail" value="${userinfo.email}" style="padding: 10px; border-radius: 8px; border: 2px solid white; background: #222; color: white;">

            <label>Benutzername:</label>
            <input type="text" id="editUsername" value="${userinfo.username}" style="padding: 10px; border-radius: 8px; border: 2px solid white; background: #222; color: white;">

            <label>Passwort:</label>
            <input type="password" id="editPasswort" value="${userinfo.passwort}" style="padding: 10px; border-radius: 8px; border: 2px solid white; background: #222; color: white;">

            <div id="saveButton" style="padding: 12px; background: red; color: white; text-align: center; border-radius: 10px; cursor: pointer; font-weight: bold; margin-top: 20px;">
                Speichern
            </div>
        </div>
    </div>
    `;

    document.getElementById("saveButton").addEventListener("click", function () {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (!userinfo) return;

        let index = users.findIndex(u => u.username === userinfo.username);
        if (index === -1) {
            alert("Fehler: Benutzer nicht gefunden!");
            return;
        }

        users[index].vorname = document.getElementById("editVorname").value;
        users[index].nachname = document.getElementById("editNachname").value;
        users[index].geburtsdatum = document.getElementById("editGeburtsdatum").value;
        users[index].email = document.getElementById("editEmail").value;
        users[index].username = document.getElementById("editUsername").value;
        users[index].passwort = document.getElementById("editPasswort").value;

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userinfo", JSON.stringify(users[index]));

        alert("Daten gespeichert.");
        showUserData();
    });
}



    showAccountView();
});
