class Event {
    constructor() {
      this.listeners = [];
    }
  
    addListener(listener) {
      this.listeners.push(listener);
    }
  
    trigger(params) {
      this.listeners.forEach(listener => { listener(params); });
    }
  }

class Model {
    constructor() {
        this.board = this.generateBoard()
        this.currentPlayer = "RED";
        this.finished = false;

        this.updateCellEvent = new Event();
        this.victoryEvent = new Event();
        this.drawEvent = new Event();
    }

    findPoistion(move) {
        const column = move%7;
        let row = 0;
        while (row < 7 && this.board[row][column] !== undefined) {
            row += 1;
        }
        if (row < 7) {
            this.board[row][column] = this.currentPlayer
            return 49 - (row*7 + 7 - column);
        }
        
    }

    play(move) {
        if (this.finished || move < 0 || move > 48 || this.board === "RED" || this.board === "BLUE") {
             return false;
        }
        move = (this.findPoistion(move))
        this.updateCellEvent.trigger({ move , player: this.currentPlayer });
        if (!this.finished && move >= 0) {
            this.switchPlayer()
            this.finished = this.victory(move) || this.draw();
        }
        return true;
    }

    draw() {
        let draw = true;
        for (let i=0; i<7; i++) {
            for (let k=0; k<7; k++) {
                if (this.board[i][k] !== "RED" && this.board[i][k] !== "BLUE") {
                    draw = false;
                }
            }
        } 
        if (draw) {
            this.drawEvent.trigger()
        }
        return draw;
    }

    generateBoard() {
        const arrR = [[] , [] , []  , [] , [] , [] , []]
        for (let i =0; i<7; i++){
            arrR[i] = [,,,,,,,]
        }
        return arrR;
    }


    victory(move) {
        console.log(move)
        let sequence = 0;
        let victory=false
        
        if (victory) {
            this.victoryEvent.trigger(this.currentPlayer)
        }
        return victory;

    }

    rowChecks(move) {
        const exactRow = Math.floor(move/7)
        let sequence = 1;
        if (6-exactRow === 0 || 6-exactRow === 6) {
                const operation = exactRow > 4 ? "+" : "-"
                
            }
        }
        //this.r
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "RED" ? "BLUE" : "RED"
    }
    
}

class View{
    constructor() {
        this.playEvent = new Event();
        this.board = this.defaultBoard()
    }
    defaultBoard() {
        const root = document.getElementById("root")
        const parentDiv = this.createElement("div" , [] , ["parent"])
        for (let i = 0; i<49; i++) {
            const div = this.createElement("div" , [] , [`div${i+1}`])
            div.addEventListener('click', () => {
                this.playEvent.trigger(i)
            })
            parentDiv.append(div)
        }
        root.append(parentDiv)
    }
    createElement(tagName, children = [], classes = [], attributes = {}) { // create new element in more comfortable
        const el = document.createElement(tagName); 
        for (let child of children) { // append childs of element
            el.append(child)
        }
        for (let cls of classes) { // add all the classes to the element
            el.classList.add(cls)
        }
        for (let attr in attributes) { // add all attributes to the element
            el.setAttribute(attr , attributes[attr])
        }
        return el
    }

    updateCell(data) {
        if (data.move || data.move===0) {
            document.querySelector(`.div${data.move +1}`).style.backgroundColor = data.player;
        }
      }
    
      victory(winner) {
        alert(`${winner} wins!`);
      }
    
      draw() {
        this.message.innerHTML = "It's a draw!";
    }   
}

class Controller{
    constructor(model , view) {
        this.model = new Model;
        this.view = new View;
        
        this.view.playEvent.addListener(move => { this.model.play(move); });

        this.model.updateCellEvent.addListener(data => { this.view.updateCell(data); });
        this.model.victoryEvent.addListener(winner => { this.view.victory(winner); });
        this.model.drawEvent.addListener(() => { this.view.draw(); });
    }
}

const app = new Controller();
