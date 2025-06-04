// **********************************************
// *********** account.js ***********************
// **********************************************

document.addEventListener("DOMContentLoaded", function() {
    zeigeUserDaten();

    function zeigeUserDaten() {
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (!userinfo) return;

        let mainContent = document.getElementById("mainContent");

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
            let index = users.findIndex(user => user.username === userinfo.username);

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
            zeigeUserDaten();
        });
    }
});
