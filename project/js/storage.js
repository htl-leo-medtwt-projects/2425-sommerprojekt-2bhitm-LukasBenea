function saveUserInfo(userInfo) {
    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    allUsers.push(userInfo);
    localStorage.setItem("users", JSON.stringify(allUsers));
}

function getUserInfo() {
    let userInfo = localStorage.getItem("userinfo");
    if (userInfo !== null) {
        return JSON.parse(userInfo);
    } else {
        return null;
    }
}

function saveProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

function getProfile() {
    let profile = localStorage.getItem("profile");
    if (profile !== null) {
        return JSON.parse(profile);
    } else {
        return null;
    }
}

function hasProfile() {
    return localStorage.getItem("profile") !== null;
}

function clearStorage() {
    localStorage.clear();
}
