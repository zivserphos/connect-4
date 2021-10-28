class Model {
    constructor() {
        this.board = this.generateBoard()
        console.log(this.board)
        this.currentPlayer = "RED";
        this.finished = false;
    }

    play(move) {


    }

    draw() {
        for (let i=0; i<7; i++) {
            for (let k=0; k<7; k++) {
                if (arrR[i][k] !== "RED" && arr[i][k] !== "BLUE") {
                    return false;
                }
            }
        }
        return true;
    }

    generateBoard() {
        const arrR = [[] , [] , []  , [] , [] , [] , []]
        for (let i =1; i<8; i++){
            for (let k=1; k<8; k++) {
                arrR[i-1].push([i , k])
            }
        }
        return arrR;
    }


    victory() {
        let sequence = 0;
        for (let i =0; i<7; i++) { // win by 4 in a row
            for (let k=0; k<7; k++) {
                if (this.arrR[i][k] === this.arrR[i][k+1]) {
                    sequence+=1;
                }
                else {
                    sequence =0;
                }
                if (sequence === 4) {
                    return true;
                }
            }
        }
        for (let i =0; i<7; i++) { // win by 4 in a column
            for (let k=0; k<7; k++) {
                if (this.arrR[k][i] === this.arrR[k+1][i]) {
                    sequence+=1;
                }
                else {
                    sequence =0;
                }
                if (sequence === 4) {
                    return true;
                }
            }
        }
        for (let i =0; i<7; i++) { // win by 4 in a
            for (let k=0; k<7; k++) {
                while (this.arrR[i][k] === this.arrR[i+1][k+1])  {
                    sequence+=1;
                    i+=1;
                    k+=1;
                }
                if (sequence === 4) {
                    return true;
                }
                else { 
                    i-=sequence;
                    k-= sequence;
                }
            }
        }
        return false;

    }

    switchPlayer() {
        this.currentPlayer === "RED" ? "BLUE" : "RED"
    }
    
}

class View{
    constructor() {
        this.board = this.defaultBoard()
    }
    defaultBoard() {
        const root = document.getElementById("root")
        const parentDiv = this.createElement("div" , [] , ["parent"])
        for (let i = 0; i<49; i++) {
            const div = this.createElement("div" , ["boolbool"] , [`div${i+1}`])
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
    
    
}

class Controller{
    #model
    #view
    constructor(model , view) {
        this.#model = model;
        this.#view = view
    }

    set coin(coin){
        this.#model.board(coin)
    }
}

const app = new Controller(new Model() , new View());
