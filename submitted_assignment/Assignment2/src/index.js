let n = 5;
let activePlayer = "player1";
document
  .getElementById(activePlayer)
  .setAttribute("style", "background-color: green;");
const board = document.getElementById("board");
const rowColmNumber = document.getElementById("rowColmNumber");
const inputDisplay = document.getElementById("inputDisplay");
let el = document.getElementById("myBar");  
const res = document.getElementById("result");

inputDisplay.innerHTML = rowColmNumber.value;

rowColmNumber.addEventListener("change", (e) => {
  n = Number(e.target.value);
  reSet();
});

function reSet() {
  board.innerHTML = "";
  generateTable(n);
  clearInterval(interval)
  clearInterval(progressInterval)
  el.style.width ='0%'; 
}

// checking row & colm for winning condition
function checkRowColm(p) {
  const player =
    activePlayer === "player1" ? "x" : activePlayer === "player2" ? "o" : "";
  let isempty;
  for (let i = 0; i < n; i++) {
    let win = true;
    for (let j = 0; j < n; j++) {
      let id = p === "row" ? `${i}${j}` : (p = "colm" ? `${j}${i}` : "");
      const cell = document.getElementById(id);
      const text = cell.innerHTML;
      if (!text) isempty = true;
      if (text !== player || text === null) win = false;
    }
    if (win) return win;
  }
  if (!isempty) {
    alert("Game draw");
    reSet();
    return;
  }
  return false;
}

// checking diagonal for winning condition
function checkDigonal() {
  const player =
    activePlayer === "player1" ? "x" : activePlayer === "player2" ? "o" : "";
  let win = true;
  for (let i = 0; i < n; i++) {
    let id = `${i}${i}`;
    const cell = document.getElementById(id);
    const text = cell.innerHTML;

    if (text !== player) win = false;
  }
  if (win) return win;
  win = true;
  for (let i = 0; i < n; i++) {
    let id = `${i}${n - 1 - i}`;
    const cell = document.getElementById(id);
    const text = cell.innerHTML;
    if (text !== player) win = false;
  }
  return win;
}

// set interval for progress bar and change player
let interval
let progressInterval
  let width = 0;
  function frame() {
    console.log('width',width)
    if (width === 100) {
      width=1
        } else {
      width++; 
      el.style.width = width + '%'; 
    }
  }
  function timer(){
    console.log('active',activePlayer)
    activePlayer = activePlayer === "player1" ? "player2" : "player1";
    let inactivePlayer = activePlayer === "player1" ? "player2" : "player1";
    document.getElementById(activePlayer).setAttribute("style", "background-color: green;");
    document.getElementById(inactivePlayer).setAttribute("style", "background-color: EFEFEF;");
  }
function updateScore() {
  if(interval) clearInterval(interval)
  if(progressInterval) clearInterval(progressInterval)
   width=0
   progressInterval = setInterval(frame, 50);
   interval = setInterval( timer,5000)
  if (checkRowColm("colm")) return true;
  if (checkRowColm("row")) return true;
  if (checkDigonal()) return true;
  return false;
}


//
const clickhandle = (id) => {
 
  if (activePlayer) {
    document
      .getElementById(activePlayer)
      .setAttribute("style", "background-color: EFEFEF;");
    let cell = document.getElementById(id);
    if (!cell.innerHTML) {
      if (activePlayer === "player1"){
        cell.innerHTML = "x";
        cell.setAttribute("style", "background-color: rgb(124, 252, 0);")
      }
      else if (activePlayer === "player2") {
        cell.innerHTML = "o"
        cell.setAttribute("style", "background-color: rgb(250, 128, 114);")
      }
      let result = updateScore(activePlayer);
      if (result) {
        res.innerHTML = `${activePlayer} won!!`;
        alert(`${activePlayer} won!!`);
        reSet();
      }
      activePlayer = activePlayer === "player1" ? "player2" : "player1";
    }
    document
      .getElementById(activePlayer)
      .setAttribute("style", "background-color: green;");
  }
};

function generateTable(n) {
  // create element: table & tbody
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");
  for (let i = 0; i < n; i++) {
    // create element table row: tr
    let tableRow = document.createElement("tr");
    for (let j = 0; j < n; j++) {
      // create table cell: 'td'
      let cell = document.createElement("td");
      let id = `${i}${j}`;
      cell.setAttribute("id", id);
      cell.setAttribute('class','t-cell')
      cell.addEventListener("click", () => clickhandle(id));
      tableRow.appendChild(cell);
    }
    // add row inside table body
    tableBody.appendChild(tableRow);
  }
  // append table body into table
  table.appendChild(tableBody);
  // append table into board
  board.appendChild(table);
  table.setAttribute("border", "2px");
}
generateTable(n);
