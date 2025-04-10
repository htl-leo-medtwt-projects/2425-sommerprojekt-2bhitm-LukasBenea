
    let regButton = document.getElementById("regButton");
    let bereiche = document.getElementById("bereiche");
    let frage = document.getElementById("frage");
    let antwortInput = document.getElementById("antwortInput");
    let jaButton = document.getElementById("ja");
    let bilderGrid = document.getElementById("bilderGrid");
    let confirmProfile = document.getElementById("confirmProfile");
    let selectedImage = null;
    let userInfo = {};
    let currentStep = 0;

    const fragen = [
        "Wie heißt du mit Vornamen?",
        "Wie ist dein Nachname?",
        "Wann wurdest du geboren? (TT.MM.JJJJ)",
        "Wie lautet deine E-Mail?",
        "Erstelle ein Passwort.",
        "Wähle nun deinen Benutzernamen."
    ];

    const keys = ["vorname", "nachname", "geburtsdatum", "email", "passwort", "username"];

    bereiche.style.transform = "translateX(0)";

    regButton.addEventListener("click", function () {
        bereiche.style.transform = "translateX(-100vw)";
        currentStep = 0;
        userInfo = {};
        frage.innerHTML = "Erstellen wir mal dein Acccount. <br> Du musst mir nur ein paar Fragen beantworten, verstanden?";
        jaButton.style.display = "block";
        antwortInput.style.display = "none";
        antwortInput.value = "";
        bilderGrid.innerHTML = "";
        bilderGrid.style.display = "none";
        confirmProfile.style.display = "none";
        selectedImage = null;
        let loginMessage = document.getElementById("loginMessage");
        if (loginMessage) loginMessage.innerHTML = "";
    });

    jaButton.addEventListener("click", function () {
        jaButton.style.display = "none";
        currentStep = 0;
        frage.innerHTML = fragen[currentStep];
        antwortInput.style.display = "block";
        antwortInput.value = "";

        antwortInput.focus();
        startFragen();
    });

    function startFragen() {
        frage.innerHTML = fragen[currentStep];
        antwortInput.style.display = "block";
        antwortInput.value = "";
        antwortInput.focus();
    }

    antwortInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let antwort = antwortInput.value.trim();

            if (antwort === "") return;
            userInfo[keys[currentStep]] = antwort;
            currentStep++;
            antwortInput.value = "";

            if (currentStep < fragen.length) {
                frage.innerHTML = fragen[currentStep];

            } else {
                frage.innerHTML = "Wähle deinen Champion aus.";
                antwortInput.style.display = "none";
                displayProfileImages();

            }
        }
    });

    function displayProfileImages() {
        bilderGrid.style.display = "grid";
        confirmProfile.style.display = "block";
        bilderGrid.innerHTML = "";

        for (let i = 1; i <= 48; i++) {
            let img = document.createElement("img");
            img.src = `../images/vorseite/profilBild/p_${i}.png`;
            img.dataset.imageId = `p_${i}.png`;
            img.addEventListener("click", function () {
                if (selectedImage) selectedImage.classList.remove("selected");
                img.classList.add("selected");
                selectedImage = img;
            });

            bilderGrid.appendChild(img);
        }
    }

    confirmProfile.addEventListener("click", function () {
        if (selectedImage) {
            userInfo.profilBild = selectedImage.dataset.imageId;
            saveUserInfo(userInfo);
            bereiche.style.transform = "translateX(0)";
            currentStep = 0;
            userInfo = {};
            frage.innerHTML = "Erstellen wir mal dein Acccount. <br> Du musst mir nur ein paar Fragen beantworten, verstanden?";
            jaButton.style.display = "block";
            antwortInput.style.display = "none";
            antwortInput.value = "";
            bilderGrid.innerHTML = "";
            bilderGrid.style.display = "none";
            confirmProfile.style.display = "none";
            selectedImage = null;
            let loginMessage = document.getElementById("loginMessage");
        
            if (loginMessage) loginMessage.innerHTML = "";

        } else {
            alert("Bitte wähle einen Champion aus.");
        }
    });

    let loginButton = document.getElementById("loginButton");
    let loginMessage = document.getElementById("loginMessage");

    loginButton.addEventListener("click", function () {
        let loginEmail = document.getElementById("loginEmail").value;
        let loginPassword = document.getElementById("loginPassword").value;
        let allUsers = JSON.parse(localStorage.getItem("users")) || [];

        let matchedUser = allUsers.find(user => user.email === loginEmail && user.passwort === loginPassword);

        if (matchedUser) {

            localStorage.setItem("userinfo", JSON.stringify(matchedUser));
            let anmeldeBereich = document.getElementById("anmeldeBereich");
            anmeldeBereich.innerHTML = "";
            let img = document.createElement("img");
            img.src = `../images/vorseite/profilBild/${matchedUser.profilBild}`;
            img.style.width = "300px";
            img.style.height = "auto";
            img.style.margin = "50px auto";
            img.style.display = "block";
            anmeldeBereich.appendChild(img);
            let logoutBtn = document.createElement("div");
            logoutBtn.textContent = "ABMELDEN";
            logoutBtn.id = "regButton";
            anmeldeBereich.appendChild(logoutBtn);


            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("userinfo");
                location.reload();
            });

            let deadTipp = document.getElementById("deadTipp");
            deadTipp.classList.add("loginBegrüßung");
            deadTipp.innerHTML = `<span class="highlight">Moinsen ${matchedUser.username},</span><br>ich sehe du hast die richtige Wahl getroffen,<br>wollen wir starten?`;
            deadTipp.style.top = "0px";
            deadTipp.style.left = "-8px";
            deadTipp.style.position = "absolute";
            deadTipp.style.textAlign = "center";
            loginMessage.innerHTML = "";

            showRissOverlay();

        } else {
            loginMessage.innerHTML = "Falsche E-Mail oder Passwort!";
        }
    });

    function showRissOverlay() {


        let existing = document.getElementById("rissOverlay");
        if (existing) existing.remove();
        let rissOverlay = document.createElement("div");
        rissOverlay.id = "rissOverlay";
        document.body.appendChild(rissOverlay);
        let rissImages = ["riss1.png", "riss2.png", "riss3.png"];
        let currentRiss = 0;
        let rissImg = document.createElement("img");
        rissImg.src = `../images/vorseite/${rissImages[currentRiss]}`;
        rissOverlay.appendChild(rissImg);

        Object.assign(rissOverlay.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "9999",
            display: "block",
            backgroundColor: "transparent"
        });

        Object.assign(rissImg.style, {
            maxWidth: "100vw",
            maxHeight: "100vh",
            cursor: "pointer"
        });
        rissOverlay.addEventListener("click", function () {
            currentRiss++;
            if (currentRiss < rissImages.length) {
                rissImg.src = `../images/vorseite/${rissImages[currentRiss]}`;
            } else {
                window.location.href = "../html/index.html";
            }
        });
    }

    let gastButton = document.getElementById("gastButton");
    gastButton.addEventListener("click", function () {
        window.location.href = "../html/index.html";
    });

