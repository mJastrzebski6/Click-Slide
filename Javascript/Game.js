import Objects from "./Objects.js";

class Game {
    constructor(){
        
    }

    isFinish(){
        let bool = true;
        for(let i = 1; i<Objects.playboard.size+1; i++){
            for(let j = 1; j<Objects.playboard.size+1; j++){
                if(i != Objects.playboard.size || j != Objects.playboard.size){
                    if(Objects.playboard.board[i][j][0] != i || Objects.playboard.board[i][j][1] != j) bool = false;
                }
            }
        } 
        if(bool == true){
            Objects.overlay.inputOff(); 
            Objects.timer.stop();
            Objects.playboard.addLastPart();
            Objects.overlay.on();
        }
    }

    click(){
        let x1 = parseInt(this.getAttribute("data-x"));
        let y1 = parseInt(this.getAttribute("data-y"));
        
        Game.checkAvailability(this, x1+1, y1+1);
    }

    static checkAvailability(square, X, Y){
        for(let i = 1; i<Objects.playboard.size+1; i++){
            for(let j = 1; j<Objects.playboard.size+1; j++){
                if(Objects.playboard.board[i][j][0] == X && Objects.playboard.board[i][j][1] == Y){
                    var tmpx = i;
                    var tmpy = j;
                }
            } 
        } 

        let direction = 0;
        
             if(Objects.playboard.board[tmpx-1][tmpy][0] == null) direction = 1; //top
        else if(Objects.playboard.board[tmpx][tmpy+1][0] == null) direction = 2; //right
        else if(Objects.playboard.board[tmpx+1][tmpy][0] == null) direction = 3; //bottom
        else if(Objects.playboard.board[tmpx][tmpy-1][0] == null) direction = 4; //left
        else direction = 0;
        if(direction != 0) Objects.game.move(direction, square, tmpx, tmpy, false);
        
    }

    move(direction, square, tmpx, tmpy, isMixing){
        if(direction == 1){ //top
            let lastLength = square.style.top;
            if(lastLength != 0){
                lastLength = lastLength.substring(0, lastLength.length - 2);
                lastLength = parseInt(lastLength);
            }
            square.style.top = lastLength - 1020/Objects.playboard.size + "px";
            
            Objects.playboard.board[tmpx-1][tmpy] = Objects.playboard.board[tmpx][tmpy];
        }
        else if(direction == 2){ //right
            let lastLength = square.style.left;
            if(lastLength != 0){
                lastLength = lastLength.substring(0, lastLength.length - 2);
                lastLength = parseInt(lastLength);
            }
            square.style.left = lastLength + 1020/Objects.playboard.size + "px";

            Objects.playboard.board[tmpx][tmpy+1] = Objects.playboard.board[tmpx][tmpy];
        }
        else if(direction == 3){ //bottom
            let lastLength = square.style.top;
            if(lastLength != 0){
                lastLength = lastLength.substring(0, lastLength.length - 2);
                lastLength = parseInt(lastLength);
            }
            square.style.top = lastLength + 1020/Objects.playboard.size + "px";

            Objects.playboard.board[tmpx+1][tmpy] = Objects.playboard.board[tmpx][tmpy];
        }
        else if(direction == 4){ //left
            let lastLength = square.style.left;
            if(lastLength != 0){
                lastLength = lastLength.substring(0, lastLength.length - 2);
                lastLength = parseInt(lastLength);
            }
            square.style.left = lastLength - 1020/Objects.playboard.size + "px";

            Objects.playboard.board[tmpx][tmpy-1] = Objects.playboard.board[tmpx][tmpy];
        }
        Objects.playboard.board[tmpx][tmpy] = [null, null];
        if(isMixing == false) Objects.game.isFinish();
    }
}
export default Game;