let hatGewaehlt = false
let sterneWert = 0

let boxen = [
  document.getElementById("wahlReset"),
  document.getElementById("wahlStay"),
  document.getElementById("wahlForget")
]

for(let i = 0; i < boxen.length; i++){
  boxen[i].addEventListener("click", function(){
    if(hatGewaehlt == true){
      return
    }

    let auswahl = boxen[i].getAttribute("dataWahl")
    let nutzer = JSON.parse(localStorage.getItem("userinfo"))

    if(nutzer == null){
      alert("Du musst eingeloggt sein, um deine Entscheidung zu speichern.")
      return
    }

    nutzer.houseOfMDecision = auswahl
    localStorage.setItem("userinfo", JSON.stringify(nutzer))

    hatGewaehlt = true

    document.body.classList.remove("theme-reset")
    document.body.classList.remove("theme-stay")
    document.body.classList.remove("theme-forget")
    document.body.classList.add("theme-" + auswahl)

    let text = document.createElement("p")
    text.textContent = "Du hast dich entschieden. Doch jede Entscheidung hat ihren Preis."
    text.style.marginTop = "40px"
    text.style.fontStyle = "italic"
    text.style.opacity = "0"
    text.style.transition = "opacity 2s ease"

    document.getElementById("section3").appendChild(text)

    setTimeout(function(){
      text.style.opacity = "1"
    }, 100)

    let rating = document.getElementById("section4")
    rating.style.display = "block"
    rating.scrollIntoView({ behavior: "smooth" })
  })
}

let sterne = document.querySelectorAll("#sterne span")

for(let i = 0; i < sterne.length; i++){
  sterne[i].addEventListener("click", function(){
    sterneWert = parseInt(sterne[i].getAttribute("dataStern"))
    for(let j = 0; j < sterne.length; j++){
      if(j < sterneWert){
        sterne[j].classList.add("aktiv")
      }else{
        sterne[j].classList.remove("aktiv")
      }
    }
  })
}

document.getElementById("bewertungSpeichern").addEventListener("click", function(){
  let kommentar = document.getElementById("kommentar").value.trim()
  let nutzer = JSON.parse(localStorage.getItem("userinfo"))

  if(nutzer == null){
    alert("Du musst eingeloggt sein, um zu bewerten.")
    return
  }

  if(sterneWert == 0){
    alert("Bitte gib Sterne ein.")
    return
  }

  if(kommentar == ""){
    alert("Bitte gib einen Kommentar ein.")
    return
  }

  let eintrag = {
    username: nutzer.username,
    profilbild: "../images/vorseite/profilBild/" + nutzer.profilBild,
    comic: "House of M",
    sterne: sterneWert,
    kommentar: kommentar
  }

  let liste = JSON.parse(localStorage.getItem("bewertungen"))
  if(liste == null){
    liste = []
  }

  liste.push(eintrag)
  localStorage.setItem("bewertungen", JSON.stringify(liste))

  nutzer.houseOfMRating = eintrag
  localStorage.setItem("userinfo", JSON.stringify(nutzer))

  window.location.href = "./index.html"
})
