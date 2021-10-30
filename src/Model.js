import Event from "./Event.js";
export default class Model {
    constructor() {
      this.board = this.generateBoard();
      this.currentPlayer = "RED";
      this.finished = false;
  
      this.updateCellEvent = new Event();
      this.victoryEvent = new Event();
      this.drawEvent = new Event();
    }
  
    findPoistion(move) {
      const column = move % 7;
      let row = 0;
      while (row < 7 && this.board[row][column] !== undefined) {
        row += 1;
      }
      if (row < 7) {
        this.board[row][column] = this.currentPlayer;
        return 49 - (row * 7 + 7 - column);
      }
    }
  
    play(move) {
      if (
        this.finished ||
        move < 0 ||
        move > 48 ||
        this.board === "RED" ||
        this.board === "BLUE"
      ) {
        return false;
      }
      move = this.findPoistion(move);
      this.updateCellEvent.trigger({ move, player: this.currentPlayer });
      if (!this.finished && move >= 0) {
        this.switchPlayer();
        this.finished = this.victory(move) || this.draw();
      }
      return true;
    }
  
    draw() {
      let draw = true;
      for (let i = 0; i < 7; i++) {
        for (let k = 0; k < 7; k++) {
          if (this.board[i][k] !== "RED" && this.board[i][k] !== "BLUE") {
            draw = false;
          }
        }
      }
      if (draw) {
        this.drawEvent.trigger();
      }
      return draw;
    }
  
    generateBoard() {
      const arrR = [[], [], [], [], [], [], []];
      for (let i = 0; i < 7; i++) {
        arrR[i] = [, , , , , , ,];
      }
      return arrR;
    }
  
    victory(move) {
      const victory =
        this.rowChecks(move) ||
        this.columnChecks(move) ||
        this.slantChecksForward(move) ||
        this.slantChecksBackward(move);
      if (victory) {
        this.switchPlayer();
        this.victoryEvent.trigger(this.currentPlayer);
      }
      return victory;
    }
  
    slantChecksBackward(move) {
      const exactColumn = move % 7;
      const exactRow = 6 - Math.floor(move / 7);
      let row = exactRow + exactColumn > 6 ? 6 : exactRow + exactColumn;
      let sequence = 1;
      let column =
        exactColumn - 6 + exactRow < 0 ? 0 : exactColumn - 6 + exactRow;
      console.log(column);
  
      while (this.board[row - 1]) {
        this.board[row][column] === this.board[row - 1][column + 1] &&
        this.board[row][column] !== undefined
          ? (sequence += 1)
          : (sequence = 1);
        if (sequence === 4) {
          return true;
        }
        row -= 1;
        column += 1;
      }
      return false;
    }
  
    slantChecksForward(move) {
      let exactColumn = move % 7;
      let exactRow = 6 - Math.floor(move / 7);
      let sequence = 1;
  
      let slant = exactColumn > exactRow ? exactRow : exactColumn;
  
      exactColumn -= slant;
      exactRow -= slant;
      while (this.board[exactRow + 1]) {
        this.board[exactRow][exactColumn] ===
          this.board[exactRow + 1][exactColumn + 1] &&
        this.board[exactRow][exactColumn] !== undefined
          ? (sequence += 1)
          : (sequence = 1);
        if (sequence === 4) {
          return true;
        }
        exactRow += 1;
        exactColumn += 1;
      }
      return false;
    }
  
    columnChecks(move) {
      const exactColumn = move % 7;
      let sequence = 1;
      for (let i = 0; i < 6; i++) {
        this.board[i][exactColumn] === this.board[i + 1][exactColumn] &&
        this.board[i][exactColumn] !== undefined
          ? (sequence += 1)
          : (sequence = 1);
        if (sequence === 4) {
          return true;
        }
      }
      return false;
    }
  
    rowChecks(move) {
      const exactRow = 6 - Math.floor(move / 7);
      let sequence = 1;
      for (let i = 0; i < 6; i++) {
        this.board[exactRow][i] === this.board[exactRow][i + 1] &&
        this.board[exactRow][i] !== undefined
          ? (sequence += 1)
          : (sequence = 1);
        if (sequence === 4) {
          return true;
        }
      }
      return false;
    }
  
    switchPlayer() {
      this.currentPlayer = this.currentPlayer === "RED" ? "BLUE" : "RED";
    }
  }