import Objects from "./Objects.js";

class Playboard {
    board = []
    canvas = document.getElementById('game-canvas');
    ctx = document.getElementById('game-canvas').getContext('2d');
    size = 3
    emptyTile = {}
    mixingInterval = null

    constructor(){
        this.initializeCanvas()
        document.getElementById('grid-3x3').addEventListener('click', () => this.initializeGame(3));
        document.getElementById('grid-4x4').addEventListener('click', () => this.initializeGame(4));
        document.getElementById('grid-5x5').addEventListener('click', () => this.initializeGame(5));
        document.getElementById('grid-6x6').addEventListener('click', () => this.initializeGame(6));
    }

    addClickListeners(){
        this.canvas.addEventListener('click', (event) => this.handleClick(event))    
    }

    initializeGame(size) {
        Objects.timer.stop(false)
        Objects.timer.clear()
        if(this.mixingInterval !== null) return
        this.size = size;
        this.createBoard(size);
        this.shuffleBoard();
    }

    initializeCanvas() {
        this.canvas.width = 1200;
        this.canvas.height = 1200;
    }

    drawBigImage(){
        this.ctx.drawImage(
            Objects.slider.image,
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );
    }

    createBoard(size){
        this.board = []
        for(let i=0; i<size; i++) this.board.push([])

        for(let i=0; i<size; i++){
            for(let j=0; j<size; j++){
                this.board[i].push({})
                this.board[i][j] = {row: i, col:j}
            }
        }
        this.board[size-1][size-1] = null
        this.emptyTile = {col: size-1, row: size-1}
    }

    checkWin(){
        for(let i=0; i<this.size; i++){
            for(let j=0; j<this.size; j++){
                if(this.board[i][j] === null) continue
                if(this.board[i][j].row !== i || this.board[i][j].col !== j) return false
            }
        }
        return true
    }

    moveTile(row, col) {
        this.board[this.emptyTile.row][this.emptyTile.col] = this.board[row][col]
        this.board[row][col] = null
        this.emptyTile = {row: row, col:col}
        this.drawGrid()
    }

    handleClick(event){
        const bounds = this.canvas.getBoundingClientRect();
        let x = event.pageX - bounds.left - scrollX;
        let y = event.pageY - bounds.top - scrollY;

        x /= bounds.width;
        y /= bounds.height;

        x *= this.canvas.width;
        y *= this.canvas.height;

        const col = Math.floor(x / (this.canvas.width / this.size));
        const row = Math.floor(y / (this.canvas.height / this.size));
    
        if (this.isAdjacentToEmptyTile(row, col)) {
            this.moveTile(row, col);
            this.drawGrid();
            if(this.checkWin()){
                this.board[this.size-1][this.size-1] = {col: this.size-1, row:this.size-1}
                this.emptyTile = {col: 100, row:100}
                this.drawBigImage()
                Objects.overlay.on()
                Objects.timer.stop(true)
            }
        }
        
    }

    isAdjacentToEmptyTile(row, col){
        return (Math.abs(row - this.emptyTile.row) === 1 && col === this.emptyTile.col) ||
           (Math.abs(col - this.emptyTile.col) === 1 && row === this.emptyTile.row);
    }

    shuffleBoard() {
        let direction = 1;
        let previousDirection = 0;
        let counter = 0;

        this.mixingInterval = setInterval(() => {
            while(true){
                direction = (Math.floor(Math.random()*4))+1;
                if(direction === 1 && previousDirection === 3) continue
                else if(direction === 2 && previousDirection === 4) continue
                else if(direction === 3 && previousDirection === 1) continue
                else if(direction === 4 && previousDirection === 2) continue

                if(direction === 1 && this.emptyTile.row != 0){
                    [this.board[this.emptyTile.row][this.emptyTile.col], this.board[this.emptyTile.row-1][this.emptyTile.col]] = [this.board[this.emptyTile.row-1][this.emptyTile.col],this.board[this.emptyTile.row][this.emptyTile.col]]
                    this.emptyTile.row = this.emptyTile.row-1
                }
                else if(direction === 2 && this.emptyTile.col != this.size-1){
                    [this.board[this.emptyTile.row][this.emptyTile.col], this.board[this.emptyTile.row][this.emptyTile.col+1]] = [this.board[this.emptyTile.row][this.emptyTile.col+1],this.board[this.emptyTile.row][this.emptyTile.col]]
                    this.emptyTile.col = this.emptyTile.col+1
                }
                else if(direction === 3 && this.emptyTile.row != this.size-1){
                    [this.board[this.emptyTile.row][this.emptyTile.col], this.board[this.emptyTile.row+1][this.emptyTile.col]] = [this.board[this.emptyTile.row+1][this.emptyTile.col],this.board[this.emptyTile.row][this.emptyTile.col]]
                    this.emptyTile.row = this.emptyTile.row+1
                }
                else if(direction === 4 && this.emptyTile.col != 0){
                    [this.board[this.emptyTile.row][this.emptyTile.col], this.board[this.emptyTile.row][this.emptyTile.col-1]] = [this.board[this.emptyTile.row][this.emptyTile.col-1],this.board[this.emptyTile.row][this.emptyTile.col]]
                    this.emptyTile.col = this.emptyTile.col-1
                }
                else continue

                previousDirection = direction;
                counter++;
                break
            };
            this.drawGrid()
            if(counter == this.size * 30){
                clearInterval(this.mixingInterval);
                this.mixingInterval = null;
                this.addClickListeners();
                Objects.timer.start();
            } 
        }, 5);
        
    }

    drawGrid() {
        const tileSize = this.canvas.width / this.size;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(let i=0; i<this.size; i++){
            for(let j=0; j<this.size; j++){
                let tile = this.board[i][j]
                if (!tile) continue

                this.ctx.drawImage(
                    Objects.slider.image,
                    tile.col * Objects.slider.image.width / this.size,
                    tile.row * Objects.slider.image.height / this.size,
                    Objects.slider.image.width / this.size,
                    Objects.slider.image.height / this.size,
                    j * tileSize,
                    i * tileSize,
                    tileSize,
                    tileSize
                );
            }
        }
    }

}
export default Playboard;