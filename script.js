//Simon says!
//Lag en web-utgave av spillet simon says.
//Du kan ha fire forskjellige firkanter av ulik farge som skal 'blinke'.
//Lag en tekst som holder styr på poengsummen til brukeren.
// Start med et 'blink', øk deretter med et ekstra blink i
// en random av fargene per tur. Brukeren skal trykke på de
// samme fargene som blir generert av datan. Trykker brukeren feil,
//  mister den et poeng, mens trykker brukeren riktig, får de et poeng!
// Du må holde styr på alle trykkene dataene har generert i riktig rekkefølge,
// samt trykkene brukeren utfører.
//Oppgaven løses med arrays, on-click, funksjoner med parameter

let points = 0;
let colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let userSequence = [];
let isGameActive = false;

updateView();
function updateView() {
  document.getElementById("app").innerHTML = `
    <h1>Simon says!</h1>
    <p>Points: ${points}</p>
    <div id="red" class="box" onclick="checkColor('red')"></div>
    <div id="blue" class="box" onclick="checkColor('blue')"></div><br>
    <div id="green" class="box" onclick="checkColor('green')"></div>
    <div id="yellow" class="box" onclick="checkColor('yellow')"></div>
    `;
}

function startGame() {
  sequence = [];
  userSequence = [];
  isGameActive = true;
  addColorToSequence();
  showSequence();
}

function addColorToSequence() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
}

function showSequence() {
  userSequence = [];
  let i = 0;
  const interval = setInterval(() => {
    highlightColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      enableUserInput();
    }
  }, 1000);
}

function highlightColor(color) {
  const colorElement = document.getElementById(color);
  colorElement.classList.add("highlight");
  setTimeout(() => {
    colorElement.classList.remove("highlight");
  }, 500);
}

function enableUserInput() {
  document.querySelectorAll(".box").forEach((box) => {
    box.onclick = function () {
      if (isGameActive) {
        checkColor(this.id);
      }
    };
  });
}

function checkColor(color) {
  if (isGameActive) {
    userSequence.push(color);

    if (
      userSequence[userSequence.length - 1] !==
      sequence[userSequence.length - 1]
    ) {
      points = Math.max(0, points - 1);
      isGameActive = false;
      alert("Game Over! Du gjorde en feil.");
      resetGame();
      return;
    }

    if (userSequence.length === sequence.length) {
      points++;
      sequence.push(colors[Math.floor(Math.random() * colors.length)]);
      setTimeout(() => {
        showSequence();
      }, 1000);
    }
  }
  updateView();
}

function resetGame() {
  setTimeout(() => {
    startGame();
  }, 2000);
}

startGame();