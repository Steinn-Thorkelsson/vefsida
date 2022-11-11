// canvas uppsetning
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

document.addEventListener("touchstart", touchStartHandler);
function touchStartHandler(event) {
  pX = event.touches[0].clientX;
  pY = event.touches[0].clientY;
}

let pacMan = {
  x: Math.abs(width / 2),
  y: Math.abs(height / 2),
  vx: 3,
  vy: 0,
  radius: 20,
  litur: "yellow",
  teikna: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.litur;
    ctx.fill();
  },
};

class Kula {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.litur = "white";
    this.radius = 10;
  }
  teikna() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.litur;
    ctx.fill();
  }
  collision() {
    if (pacMan.x < this.x + pacMan.radius) {
      if (pacMan.x > this.x - pacMan.radius) {
        if (pacMan.y < this.y + pacMan.radius) {
          if (pacMan.y > this.y - pacMan.radius) {
            for (let i = 0; i < kulur.length; i++) {
              if (kulur[i].id === this.id) {
                kulur.splice(i, 1);
                stig += 1;
                if(window.navigator.vibrate(100)){
                  console.log("Vibrate");
                }
              }
            }
          }
        }
      }
    }
  }
}

const kulur = [];
let id = 0;
let lengd = 3;

while (kulur.length < lengd) {
  let kula = new Kula(random(10, width - 20), random(10, height - 20), id);
  kulur.push(kula);
  id += 1;
  console.log(id);
}
let stig = 0;
let pX = width / 2;
let pY = height / 2;
const stigatafla = document.getElementById("stig");

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, width, height);
  for (const kula of kulur) {
    kula.teikna();
    kula.collision();
  }
  pacMan.teikna();
  // pacMan.hreyfa();
  var dx = pX - pacMan.x;
  var dy = pY - pacMan.y;

  var distance = Math.sqrt(dx * dx + dy * dy);

  let speed = 20;

  if (distance > speed) {
    dx *= speed / distance;
    dy *= speed / distance;
  }

  pacMan.x += dx;
  pacMan.y += dy;

  // console.log(stig);
  // if (stig === kulur.length){
  //   console.log("þú vannst!")
  // }
  if (stig === lengd) {
    stigatafla.innerHTML = "Þú Vannst!";
  } else {
    stigatafla.innerHTML = "Stig: " + stig;
  }
  window.requestAnimationFrame(loop);
}
loop();
