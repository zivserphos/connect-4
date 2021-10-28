class Model {
    constructor() {
        this.board = generateBoard()
        this.index = 0;
    }

    // set board(arr) {
    //     const [x,y] = arr;
    //     if (this.index % 2 === 0) {
    //         this.board[x][y] = "RED"
    //         return this.board
    //     }
    //     this.board[x][y] = "BLUE"
    //     return this.board    
    // }
    
}

class View{
    constructor() {
        this.board = this.defaultBoard()
    }
    defaultBoard() {
        const root = document.getElementById("root")
        for (let i = 0; i<49; i++) {
            const div = this.createElement("div" , "sqr")
            root.append(div)
        }

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

function generateBoard() {
    const arrR = [[] , [] , []  , [] , [] , [] , []]
    console.log(arrR[3]);
    for (let i =1; i<8; i++){
        for (let k=1; k<8; k++) {
            arrR[i-1].push([i , k])
        }
    }
}

const app = new Controller(new Model() , new View());
