const Square = function(value, isMine, id){
    this.value = value
    this.isMine = isMine
    this.isRevealed = false
    this.id = id
}

const generateBoard = (xSize, ySize, freq)=>{
    let arena = []
    let id = 0
    for(let i = 0; i < xSize; i++){
        let arenaRow = []
        for(let j = 0; j < ySize; j++){
            let randomNumber = Math.floor(Math.random()*10)
            if(randomNumber < freq){
                arenaRow.push(new Square(null, true, id))
            } else {
                arenaRow.push(new Square(0, false, id))
            }
            id++
        }
        arena.push(arenaRow)
    }
    return arena
}

const generateNumbers = (rawBoard)=>{
    for(let i = 0; i < rawBoard.length; i++){
        for(let j = 0; j < rawBoard[i].length; j++){
            if(rawBoard[i][j].isMine){
                for(let c = j-1; c <= j+1; c++){
                    try{
                        if(!rawBoard[i-1][c].isMine){
                            rawBoard[i-1][c].value++
                        }
                    } catch(e) {
                        continue
                    }
                }
                for(let x = j-1; x <= j+1; x+=2){
                    try{
                        if(!rawBoard[i][x].isMine){
                            rawBoard[i][x].value++
                        }
                    } catch(e) {
                        continue
                    }
                }
                for(let y = j-1; y <= j+1; y++){
                    try{
                        if(!rawBoard[i+1][y].isMine){
                            rawBoard[i+1][y].value++
                        }
                    } catch(e) {
                        continue
                    }
                }
            } 
        }
    }
    return rawBoard
}

const parseArena = (arena)=>{
    let cleanArena = []
    arena.forEach((row)=>{
        let cleanRow = []
        row.forEach((node)=>{
            cleanRow.push(node.value)
        })
        cleanArena.push(cleanRow)
    })
    return cleanArena
}

const updateDOM = (arena)=>{
    document.querySelector('#board').innerHTML = ''
    arena.forEach((row)=>{
        let rowEl = document.createElement('tr')
        rowEl.classList.add('board-row')
        row.forEach((node)=>{
            let nodeEl = document.createElement('td')
            nodeEl.classList.add('board-square')
            nodeEl.id = JSON.stringify(node)
            if(node.isRevealed){
                if(node.value !== null){
                    if(node.value !== 0){
                        switch(node.value){
                            case 1:
                                nodeEl.classList.add('blue')
                                break;
                            case 2:
                                nodeEl.classList.add('green')
                                break;
                            case 3:
                                nodeEl.classList.add('red')
                                break;
                            case 4: 
                                nodeEl.classList.add('navy')
                                break;
                            case 5: 
                                nodeEl.classList.add('magenta')
                                break;
                            default:
                                nodeEl.classList.add('gold')
                                break;
                        }
                        nodeEl.textContent = node.value
                    }
                }
            }
            rowEl.appendChild(nodeEl)
        })
        document.querySelector('#board').appendChild(rowEl)
    })
}

let globalArena = generateNumbers(generateBoard(10,10,2))

console.log(globalArena[1][1])

updateDOM(globalArena)