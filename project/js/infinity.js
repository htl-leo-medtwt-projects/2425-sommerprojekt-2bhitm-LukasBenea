let stones = [
  { name: "soul",
     image: "../images/infinity/getSoul.png", 
     text: "Soul – vom In-Betweener gestohlen." 
    },
  { name: "power", 
    image: "../images/infinity/getPower.png", 
    text: "Power – vom Champion nach einem Kampf genommen." 
},
  { name: "time", 
    image: "../images/infinity/getTime.png", 
    text: "Time – vom Gardener nach einem Skirmish." 
},
  { name: "space", 
    image: "../images/infinity/getSpace.png", 
    text: "Space – vom Runner, den Thanos zum Baby machte." 
},
  { name: "reality", 
    image: "../images/infinity/getReality.png", 
    text: "Reality – beim Collector eingetauscht." 
},
  { name: "mind", 
    image: "../images/infinity/getMind.png", 
    text: "Mind – gewonnen vom Grandmaster im Spiel." 
}
];

window.addEventListener("DOMContentLoaded", () => {
  let container = document.getElementById("stoneMapContainer");
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  stones.forEach(stone => {


    let img = document.createElement("img");
    img.src = `../images/infinity/${stone.name}Stone.png`;
    img.className = "stone-img";
    img.style.position = "absolute";
    img.style.width = "50px";
    img.style.left = Math.random() * (width - 60) + "px";
    img.style.top = Math.random() * (height - 80) + "px";



    img.onclick = () => {
      document.getElementById("popupImage").src = stone.image;
      document.getElementById("popupText").innerText = stone.text;
      document.getElementById("zoomPopup").classList.add("active");
    };

    container.appendChild(img);
  });
});

function closePopup() {
  document.getElementById("zoomPopup").classList.remove("active");
}
