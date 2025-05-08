// *********** SECTION: Benutzer speichern ***********
function saveUserInfo(userInfo) {
    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    allUsers.push(userInfo);
    localStorage.setItem("users", JSON.stringify(allUsers));
}

// *********** SECTION: Aktuellen Benutzer abrufen ***********
function getUserInfo() {
    let userInfo = localStorage.getItem("userinfo");
    if (userInfo !== null) {
        return JSON.parse(userInfo);
    } else {
        return null;
    }
}

// *********** SECTION: Profil separat speichern ***********
function saveProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

// *********** SECTION: Profil separat abrufen ***********
function getProfile() {
    let profile = localStorage.getItem("profile");
    if (profile !== null) {
        return JSON.parse(profile);
    } else {
        return null;
    }
}

// *********** SECTION: Überprüfen ob ein Profil existiert ***********
function hasProfile() {
    return localStorage.getItem("profile") !== null;
}

// *********** SECTION: Gesamten LocalStorage leeren ***********
function clearStorage() {
    localStorage.clear();
}
let alleComics = [
    { name: "Deadpool Kills The Marvel Universe", tags: ["deadpool", "solo", "düster", "humorvoll", "alternate", "mature"] },
    { name: "Spider-Verse", tags: ["spider-man", "team", "multiverse", "crossover", "episch", "teen"] },
    // … weitere Comics mit Tag-Arrays
];
localStorage.setItem("alleComics", JSON.stringify(alleComics));

