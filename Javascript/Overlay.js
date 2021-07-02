import Objects from "./Objects.js";

class Overlay {
    constructor(){
        this.playAgainButton = document.getElementById("play-again-button");
        this.playAgainButton.addEventListener("click", () => {
            Objects.overlay.off();
            Objects.overlay.recordsOff();
            Objects.timer.clear();
        });
        this.form = document.getElementById("nick-input-button");
        this.form.addEventListener("click", () => {
            Objects.cookies.getNick();
            return false;
        });
    }
    on() {
        document.getElementById("overlay").style.display = "block";
    }

    off() {
        document.getElementById("overlay").style.display = "none";
    }

    inputOn(){
        document.getElementById("nick-input").style.display = "block";
        document.getElementById("nick-input-button").style.display = "block";
    }

    inputOff(){
        document.getElementById("nick-input").style.display = "none";
        document.getElementById("nick-input-button").style.display = "none";
    }

    recordsOn(){
        document.getElementById("records").style.display = "block";
    }
    
    recordsOff(){
        document.getElementById("records").style.display = "none";
    }
}
export default Overlay;