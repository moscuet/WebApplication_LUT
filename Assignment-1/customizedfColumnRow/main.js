
console.log('main.js conncted')
//number of row/colmn
let n=9
let activePlayer = 'player1'
document.getElementById(activePlayer).setAttribute("style", "background-color: green;")
const board = document.getElementById('board');
const rowColmNumber = document.getElementById('rowColmNumber');
const inputDisplay = document.getElementById('inputDisplay');
inputDisplay.innerHTML= rowColmNumber.value
const res = document.getElementById('result')
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

rowColmNumber.addEventListener("change", (e)=>{
   n= Number(e.target.value) + 6
    reSet()
});
function reSet(){
    board.innerHTML=''
    //activePlayer = activePlayer=== 'player1'? 'player2':'player1'
    //document.getElementById(activePlayer).setAttribute("style", "background-color: EFEFEF;")
    generateTable(n)
}
function checkRowColm (p){
    const score = activePlayer==='player1'? 'X' : activePlayer==='player2'? "O" :''
    let isempty
  for( let i=3; i<n-3; i++){
      let win = true
      for (let j=3; j<n-3; j++){
         let id= p === 'row'?`${i}${j}`: p ='colm'? `${j}${i}`:''
          const cell = document.getElementById(id)
          const text = cell.innerHTML
          if(!text) isempty=true
          if(text!==score ) win = false
      }
      if(win) return win
  }
  if(!isempty) {
    alert('draw')
    reSet()
    return
  }
  return false
}

function checkDigonal (){
    const score = activePlayer==='player1'? 'X' : activePlayer==='player2'? "O" :''
    let win = true
    for( let i=3; i<n-3; i++){
        let id = `${i}${i}`
        const cell = document.getElementById(id)
        const text = cell.innerHTML
        if(text!==score) win = false
    }
   if(win) return win
   win = true
   for( let i=3; i<n-3; i++){
    let id = `${i}${n-1-i}`
    const cell = document.getElementById(id)
    const text = cell.innerHTML
    if(text!==score) win = false
   }
   return win
}

function updateScore(){
  if (checkRowColm('colm')) return true
  if (checkRowColm('row')) return true
  if(checkDigonal() ) return true
  return false
}
const clickhandle= (id)=>{
   if(activePlayer){
    document.getElementById(activePlayer).setAttribute("style", "background-color: EFEFEF;")
        let cell = document.getElementById(id)
        if(!cell.innerHTML){
            let text
            if(activePlayer==='player1') text = 'X'
            else if(activePlayer==='player2') text = 'O'
            cell.innerHTML=text
            let result = updateScore(activePlayer)
            if(result){
                res.innerHTML = `Player ${activePlayer} won!!`
                alert(`Player ${activePlayer} won!!`)
                reSet()
            }
            activePlayer = activePlayer=== 'player1'? 'player2':'player1'
        }
        document.getElementById(activePlayer).setAttribute("style", "background-color: green;")
    } 
}



function generateTable (n){
    // create element: table & tbody
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    for(let i= 0; i<n; i++){
        // create element table row: tr
        let tableRow = document.createElement('tr')
        for(let j=0; j<n; j++){
            // create table cell: 'td'
            let cell = document.createElement('td')
            let id = (`${i}${j}`)
            //let cellText= document.createTextNode(`R${i}J${j}`)
           // cell.appendChild(cellText);
            cell.setAttribute('id',id)
            cell.setAttribute('width','30')
            cell.setAttribute('height','30')
           if(i<3 || j<3 || i>n-4 || j>n-4 )cell.setAttribute("style", "background-color: red;");
           if(i>2 && j>2 && i<n-3 && j<n-3) cell.addEventListener('click', ()=>clickhandle(id)) 

            tableRow.appendChild(cell);
        }
        // add row inside table body
        tableBody.appendChild(tableRow);
    }
    // append table body into table
    table.appendChild(tableBody)
    // append table into board
    board.appendChild(table)
    table.setAttribute('border','2px')
}

generateTable(n)
