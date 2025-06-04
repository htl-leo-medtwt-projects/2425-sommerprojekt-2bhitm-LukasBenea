let figuren = [
  {
    name: "Logan",
    beschreibung: "Logan, gealtert und körperlich gezeichnet, lebt abgeschieden mit seiner Familie. Die Vergangenheit verfolgt ihn – doch als Hawkeye, blind aber ungebrochen, auftaucht und um Hilfe bittet, beginnt eine Reise durch ein Ödland voller Gefahren. Jeder Schritt führt sie tiefer in ein tyrannisches System aus Superschurken. Logan muss sich entscheiden, ob er erneut der Held wird, der er einmal war, selbst wenn das bedeutet, alles zu verlieren, was er jemals beschützt hat. Auf ihrem Weg gelangen sie in verlassene Städte, in denen jede Ruine und jeder Schatten eine Geschichte von Verrat und Leid erzählt. Wilde Banden kämpfen um Ressourcen, und Loyalitäten verändern sich so schnell wie der Wind. Inmitten dieser Apokalypse ist Logan hin- und hergerissen zwischen dem Wunsch, seine Familie zu retten, und dem Drang, die Unterdrückten zu verteidigen. Seine inneren Narben drohen zu reißen, als er erkennt, dass seine Gegner ihn nicht nur körperlich, sondern auch seelisch zerbrechen wollen. Doch je näher sie ihrem Ziel kommen, desto klarer wird ihm: Manchmal ist das Schicksal unvorsetzbar, und nur wer die Dunkelheit in sich akzeptiert, kann das Licht wiederfinden.",
    bild1: "../images/oldManLogan/logan_x1.jpg",
    bild2: "../images/oldManLogan/logan_x2.jpg",
    bild3: "../images/oldManLogan/logan_x3.jpg"
  },
  {
    name: "Hawkeye",
    beschreibung: "Der blinde Bogenschütze Clint Barton, einst unerschütterlicher Avenger, nun ein geächteter Schmuggler. Trotz seiner Blindheit ist er ein Meister seines Fachs und bietet Logan Orientierung inmitten des Chaos. Seine Intuition und Präzision mit Pfeil und Bogen sind genauso tödlich wie einst. Gemeinsam bahnen sie sich einen Weg durch das Ödland, immer tiefer in eine Welt, die Gnade kaum kennt. Jeder Tag ist ein Überlebenskampf, in dem Hawkeye sein eingeschränktes Gehör und seine verbliebenen Sinne nutzen muss, um Freunde vor Feinden zu schützen. Seine Geschichten sind voller Mut und Opferbereitschaft, während er trotz aller Widrigkeiten nie den Glauben an Linke und Recht verliert.",
    bild1: "../images/oldManLogan/hawkeye_x1.jpg",
    bild2: "../images/oldManLogan/hawkeye_x2.jpg",
    bild3: "../images/oldManLogan/hawkeye_x3.jpg"
  },
  {
    name: "Red Skull",
    beschreibung: "Einst Captain Americas Erzfeind, jetzt Kriegsherr über das zerstörte Amerika. Sein Schädelgesicht thront auf verfallenen Ruinen, während er in der zerschlissenen Uniform seines Widersachers die Massen in Furcht führt. Unter seiner Herrschaft ist das Land ein Ort der Unterdrückung, wo jeder Widerstand mit brutaler Härte zerschlagen wird. Red Skulls sadistische Pläne haben ganze Landstriche verseucht, während sein Name vergiftet im Wind hallt – ein Mahnmal für diejenigen, die vergessen, dass Macht immer Konsequenzen hat.",
    bild1: "../images/oldManLogan/redskull_x1.jpg",
    bild2: "../images/oldManLogan/redskull_x2.jpg",
    bild3: "../images/oldManLogan/redskull_x3.jpg"
  },
  {
    name: "Hulk",
    beschreibung: "Was aus Bruce Banner wurde, ist ein degenerierter Clan aus Inzest-Hulks, die die Wüste terrorisieren. Ihre monströse Stärke und blinde Gewalt haben sie zu Königsmachern kleiner Fraktionen gemacht. Nur mit größter Vorsicht kann man ein solches Biest überleben – denn einmal wütend, kennen sie keine Gnade. In zerklüfteten Gebieten lauern sie in Höhlen, stets bereit, über alles herzufallen, was sich bewegt. Ihre einzige Zuflucht ist die Anarchie, und sie verschlingen jeden Tropfen Nahrung, den sie finden.",
    bild1: "../images/oldManLogan/hulk_x1.jpg",
    bild2: "../images/oldManLogan/hulk_x2.jpg",
    bild3: "../images/oldManLogan/hulk_x3.jpg"
  },
  {
    name: "Venom-T-Rex",
    beschreibung: "Der gefährlichste Jäger im Ödland: Ein Tyrannosaurus Rex, verschmolzen mit dem Venom-Symbionten. Sein gewaltiger Körper bewegt sich überraschend schnell durch die Trümmerlandschaft, während schwarze Kiefer unaufhaltsam nach Beute schnappen. Kein Lebewesen ist sicher, wenn Venom-T-Rex seine Spur aufnimmt. Er zeigt keine Gnade und keine Rast, weil sein anarchisches Verlangen nach Chaos ungestillt ist.",
    bild1: "../images/oldManLogan/venom_x1.png",
    bild2: "../images/oldManLogan/venom_x2.png",
    bild3: "../images/oldManLogan/venom_x3.png"
  }
]

let index = 0

let bild1 = document.getElementById("bild1")
let bild2 = document.getElementById("bild2")
let bild3 = document.getElementById("bild3")
let nameText = document.getElementById("charName")
let text = document.getElementById("charBeschreibung")

function zeigeCharakter(i){
  let figur = figuren[i]

  bild1.src = figur.bild1
  bild2.src = figur.bild2
  bild3.src = figur.bild3
  nameText.textContent = figur.name
  text.textContent = figur.beschreibung
}

zeigeCharakter(index)

document.getElementById("weiter").addEventListener("click", function(){
  index = index + 1
  if(index >= figuren.length){
    index = 0
  }
  zeigeCharakter(index)
})

document.getElementById("zurueck").addEventListener("click", function(){
  index = index - 1
  if(index < 0){
    index = figuren.length - 1
  }
  zeigeCharakter(index)
})

let sterne = document.querySelectorAll("#sterne span")
let gewaehlteSterne = 0

for(let i = 0; i < sterne.length; i++){
  sterne[i].addEventListener("click", function(){
    gewaehlteSterne = parseInt(sterne[i].getAttribute("data-stern"))
    for(let j = 0; j < sterne.length; j++){
      if(j < gewaehlteSterne){
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

  if(gewaehlteSterne == 0){
    alert("Bitte gib Sterne ein.")
    return
  }

  if(kommentar == ""){
    alert("Bitte schreib einen Kommentar.")
    return
  }
let eintrag = {
  username: nutzer.username,
profilbild: "../images/vorseite/profilBild/" + nutzer.profilBild,

  comic: "Old Man Logan",
  sterne: gewaehlteSterne,
  kommentar: kommentar
}


  let daten = JSON.parse(localStorage.getItem("bewertungen"))
  if(daten == null){
    daten = []
  }

  daten.push(eintrag)
  localStorage.setItem("bewertungen", JSON.stringify(daten))

  nutzer.oldManLoganRating = eintrag
  localStorage.setItem("userinfo", JSON.stringify(nutzer))

  window.location.href = "./index.html"
})
