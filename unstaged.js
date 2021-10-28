const updateDOM = (rawBoard)=>{
    rawBoard.forEach((rawRow)=>{
        let rowEl = document.createElement('tr')
        rowEl.classList.add('board-row')
        rawRow.forEach((node)=>{
            let nodeEl = document.createElement('td')
            nodeEl.classList.add('board-square')
            nodeEl.id = JSON.stringify(node)
            if(!node.isRevealed){
                nodeEl.classList.remove('revealed-false')
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
                } else {
                    let imageEl = document.createElement('img')
                    imageEl.classList.add('minePNG', 'hidden')
                    imageEl.src = 'bomb.png'
                    imageEl.id = JSON.stringify(node)
                    nodeEl.appendChild(imageEl)
                }
            } else {
                nodeEl.classList.add('revealed-false')
            }
            rowEl.appendChild(nodeEl)
        })
        document.querySelector('#board').appendChild(rowEl)
    })
}