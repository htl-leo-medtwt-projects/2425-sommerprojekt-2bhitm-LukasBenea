window.addEventListener("DOMContentLoaded", function() {
    let bewertungenContainer = document.getElementById("bewertungen");
    let allReviews = JSON.parse(localStorage.getItem("bewertungen")) || [];
    let userInfo = getUserInfo(); 

    allReviews.forEach(review => {
        let eintrag = document.createElement("div");
        eintrag.classList.add("bewertung");

        if (userInfo && (review.username === userInfo.username || review.username === userInfo.vorname)) {
            eintrag.classList.add("own");
        } else {
            eintrag.classList.add("other");
        }

        // *********** SECTION: Profilbild Pfad richtig zusammensetzen ***********
        let bildpfad = review.profilbild || `../images/profilbilder/p_${review.username}.png`;

        eintrag.innerHTML = `
            <div class="bewertung-header">
                <img src="${bildpfad}" alt="Profilbild">
                <span>${review.username}</span>
            </div>
            <div><strong>Comic:</strong> ${review.comic}</div>
            <div class="sterne">${"⭐".repeat(review.sterne)}</div>
            <div class="bewertung-kommentar">${review.kommentar}</div>
        `;

        bewertungenContainer.appendChild(eintrag);
    });

    // *********** SECTION: GSAP Animation beim Scrollen ***********
    gsap.utils.toArray(".bewertung").forEach(box => {
        let fromDirection = box.classList.contains("own") ? "-150" : "150";

        gsap.fromTo(box, 
            { x: fromDirection, opacity: 0, scale: 0.8 }, 
            { 
                x: 0, 
                opacity: 1, 
                scale: 1,
                duration: 1.2, 
                ease: "bounce.out",
                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    let bewertungen = JSON.parse(localStorage.getItem("bewertungen"));
console.log("ALLE BEWERTUNGEN:", bewertungen);
bewertungen.forEach((b, i) => {
  console.log(`Bewertung ${i+1}:`);
  console.log("Username:", b.username);
  console.log("Profilbild:", b.profilbild);
  console.log("Comic:", b.comic);
  console.log("Sterne:", b.sterne);
  console.log("Kommentar:", b.kommentar);
});

});
