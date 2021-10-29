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
        console.log(this.board)
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
            console.log("into the while");
            row += 1;
        }
        if (row < 7) {
            this.board[row][column] = this.currentPlayer
        }
    }

    play(move) {
        console.log("Model Play function")
        if (this.finished || move < 0 || move > 48 || this.board === "RED" || this.board === "BLUE") {
             return false;
        }
        //this.board[Math.floor(move/7)][move%7] = this.currentPlayer;
        this.findPoistion(move)
        console.log(this.board)
        this.updateCellEvent.trigger({ move , player: this.currentPlayer });
        this.finished = this.victory() || this.draw();
        if (!this.finished) {
            this.switchPlayer()
        }
        return true;
    }

    draw() {
        console.log("check draw in model")
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
            // for (let k=1; k<8; k++) {
            //     arrR[i-1].push([i , k])
            // }
            arrR[i] = [,,,,,,,]
        }
        return arrR;
    }


    victory() {
        console.log("check victory in model")
        console.log(this.currentPlayer)
        let sequence = 0;
        let victory=false
        // for (let i =0; i<7; i++) { // win by 4 in a row
        //     for (let k=0; k<7; k++) {
        //         console.log(this.board[i][k] !== undefined)
        //         if (this.board[i][k] === this.board[i][k+1] && this.board[i][k] !== undefined) {
        //             sequence+=1;
        //         }
        //         else {
        //             sequence =0;
        //         }
        //         if (sequence === 3) {
        //             victory = true;
        //         }
        //     }
        // }
        // for (let i =0; i<7; i++) { // win by 4 in a column
        //     for (let k=0; k<6; k++) {
        //         if (this.board[k][i] === this.board[k+1][i]) {
        //             sequence+=1;
        //         }
        //         else {
        //             sequence =0;
        //         }
        //         if (sequence === 3) {
        //             victory = true;
        //         }
        //     }
        // }
        // for (let i =0; i<7; i++) { // win by 4 in a
        //     for (let k=0; k<7; k++) {
        //         while (this.board[i][k] === this.board[i+1][k+1])  {
        //             sequence+=1;
        //             i+=1;
        //             k+=1;
        //         }
        //         if (sequence === 3) {
        //             victory = true;
        //         }
        //         else { 
        //             i-=sequence;
        //             k-= sequence;
        //         }
        //     }
        // }
        if (victory) {
            this.victoryEvent.trigger(this.currentPlayer)
        }
        return victory;

    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "RED" ? "BLUE" : "RED"
    }
    
}

class View{
    constructor() {
        console.log("view created")
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
        let position = 49 - (6 -data.move % 7)
        let columnButtom = document.querySelector(`.div${position}`)
        while (columnButtom.style.backgroundColor !== "") {
            position-=7;
            if (position<1){
                return;
            }
            columnButtom = document.querySelector(`.div${position}`)
        }
        if (position < 50){
            console.log("update cell in View")
            document.querySelector(`.div${position}`).style.backgroundColor = data.player;
        }
        // console.log("update cell in View")
        // document.querySelector(`.div${data.move +1}`).style.backgroundColor = data.player;
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
        console.log("controller constructor")
        this.model = new Model;
        this.view = new View;

        console.log("play event")
        
        this.view.playEvent.addListener(move => { this.model.play(move); });

        this.model.updateCellEvent.addListener(data => { this.view.updateCell(data); });
        this.model.victoryEvent.addListener(winner => { this.view.victory(winner); });
        this.model.drawEvent.addListener(() => { this.view.draw(); });
    }
}

const app = new Controller();
