import Objects from "./Objects.js";

class Playboard {
    board = null;
    size = null;

    constructor(){
        document.getElementById("buttonSize3").addEventListener("click", () => this.start(3));
        document.getElementById("buttonSize4").addEventListener("click", () => this.start(4));
        document.getElementById("buttonSize5").addEventListener("click", () => this.start(5));
        document.getElementById("buttonSize6").addEventListener("click", () => this.start(6));
        this.playboard = document.getElementById("playboard");
    }

    start(Size){
        this.size = Size;
        this.clearPlayboard();
    }

    clearPlayboard(){
        if(this.mixingInterval != null) clearInterval(this.mixingInterval);
        if(Objects.timer.timerInterval != null) clearInterval(Objects.timer.timerInterval);
        Objects.timer.clear();
        
        let children = this.playboard.childElementCount;
        for(let i=0; i<children; i++){
            this.playboard.removeChild(this.playboard.childNodes[0]);  
        }
        this.addParts();
    }

    addParts(){
        for(let i=0; i<this.size; i++){
            for(let j=0; j<this.size; j++){
                let div = document.createElement("div");
                if(Objects.slider.currentImageIndex == 4) div.style.backgroundImage = 'url("Images/Pictures/1.png")';
                else div.style.backgroundImage = `url("Images/Pictures/${Objects.slider.currentImageIndex}.png")`; 
                div.style.width = `${1020/this.size}px`;
                div.style.height = `${1020/this.size}px`;
                div.style.backgroundPosition = `left ${-1020/this.size * j}px top ${-1020/this.size * i}px`;

                div.setAttribute("data-x", i);
                div.setAttribute("data-y", j);
                this.playboard.appendChild(div);
            }
        }
        this.playboard.removeChild(this.playboard.childNodes[this.playboard.childElementCount-1]);
        this.createArray();
    }

    createArray(){
        this.board = new Array(this.size+2);

        for(let i=0; i<this.size+2; i++){
           this.board[i] = new Array(this.size+2);
            for(let j = 0; j<this.size+2; j++){
                this.board[i][j] = [i, j];
                if(i == 0 || j == 0 || i == this.size+1 || j == this.size+1) this.board[i][j] = [-1,-1];
            }
        } 
        this.board[this.size][this.size] = [null, null];
        this.mix();
    }

    mix(){
        let blankX = this.size;
        let blankY = this.size;
        let direction;
        let previousDirection = 0;
        let square;
        let boardX;
        let boardY;
        
        let counter = 0;
        this.mixingInterval = setInterval(() => {
            while(true){
                direction = (Math.floor(Math.random()*100)%4)+1;
                
                if(direction == 1 && blankX != this.size && previousDirection != 3){  //1 top
                    boardX = this.board[blankX+1][blankY][0];
                    boardY = this.board[blankX+1][blankY][1]; 

                    square = document.getElementById("playboard").children[(boardX-1)*this.size+boardY-1];
                    Objects.game.move(direction, square, blankX+1, blankY, true);
                    blankX++;
                    break;
                }
                else if(direction == 2 && blankY != 1 && previousDirection != 4){  //2 right
                    boardX = this.board[blankX][blankY-1][0];
                    boardY = this.board[blankX][blankY-1][1]; 

                    square = document.getElementById("playboard").children[(boardX-1)*this.size+boardY-1];
                    Objects.game.move(direction, square, blankX, blankY-1, true);
                    blankY--;
                    break;
                }
                else if(direction == 3 && blankX != 1 && previousDirection !=1 ){  //3 bottom
                    boardX = this.board[blankX-1][blankY][0];
                    boardY = this.board[blankX-1][blankY][1]; 

                    square = document.getElementById("playboard").children[(boardX-1)*this.size+boardY-1];
                    Objects.game.move(direction, square, blankX-1, blankY, true);
                    blankX--;
                    break;
                }
                else if(direction == 4 && blankY != this.size && previousDirection != 2){  //4 left
                    boardX = this.board[blankX][blankY+1][0];
                    boardY = this.board[blankX][blankY+1][1]; 
                    
                    square = document.getElementById("playboard").children[(boardX-1)*this.size+boardY-1];
                    Objects.game.move(direction, square, blankX, blankY+1, true);
                    blankY++;
                    break;
                }
            };
            previousDirection = direction;
            counter++;
            if(counter == this.size*40){
                clearInterval(this.mixingInterval);
                this.addClickListeners();
                Objects.timer.start();
            } 
        }, 5);
        
    }

    addClickListeners(){
        for(let i=0; i<this.playboard.childElementCount; i++){
            this.playboard.children[i].addEventListener("click", Objects.game.click);
        }
    }

    addLastPart(){
        let div = document.createElement("div");
        if(Objects.slider.currentImageIndex == 4) div.style.backgroundImage = 'url("Images/Pictures/1.png")';
        else div.style.backgroundImage = `url("Images/Pictures/${Objects.slider.currentImageIndex}.png")`; 

        div.style.width = 1020/this.size + "px";
        div.style.height = 1020/this.size + "px";
        div.style.backgroundPosition = `left ${-1020/this.size * (this.size-1)}px top ${-1020/this.size * (this.size-1)}px`;

        this.playboard.appendChild(div);
    }
}
export default Playboard;