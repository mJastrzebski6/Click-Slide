import Objects from "./Objects.js";

class Timer {
    startTime = 0;
    timerInterval = null;
    timeString = null;

    constructor(){
        this.clear();
    }

    start(){
        clearInterval(this.timerInterval);
        this.startTime = Date.now();
        this.during();
    }

    during(){
        let timerDiv = document.getElementById("timer");
        this.timerInterval = setInterval(() => {
            let nowTime = Date.now();
            let timeInt = nowTime - this.startTime;
            timerDiv.innerHTML = null;
            for(let i=0; i<12; i++){
                if(i == 0){
                    let h1 = Math.floor(timeInt / 36000000);
                    h1 = h1 % 6;
                    this.timeString = h1+"";
                }
                else if(i == 1){
                    let h2 = Math.floor(timeInt / 3600000);
                    h2 = h2 % 10;
                    this.timeString += h2;
                }
                else if(i == 3){
                    let m1 = Math.floor(timeInt / 600000);
                    m1 = m1 % 6;
                    this.timeString += m1;
                }
                else if(i == 4){
                    let m2 = Math.floor(timeInt / 60000);
                    m2 = m2 % 10;
                    this.timeString += m2;
                }
                else if(i == 6){
                    let s1 = Math.floor(timeInt / 10000);
                    s1 = s1 % 6;
                    this.timeString += s1;
                }
                else if(i == 7){
                    let s2 = Math.floor(timeInt / 1000);
                    s2 = s2 % 10;
                    this.timeString += s2;
                }
                else if(i == 9){
                    let ms1 = Math.floor(timeInt / 100);
                    ms1 = ms1 % 10;
                    this.timeString += ms1;
                }
                else if(i == 10){
                    let ms2 = Math.floor(timeInt / 10);
                    ms2 = ms2 % 10;
                    this.timeString += ms2;
                }
                else if(i == 11){
                    let ms3 = Math.floor(timeInt / 1);
                    ms3= ms3 % 10;
                    this.timeString += ms3;            
                }
                else if(i == 2 || i == 5) this.timeString += ":";
                else if(i == 8) this.timeString += ".";
            }
            
            for(let i=0; i<12; i++){
                if(i == 2 || i == 5) timerDiv.innerHTML += '<img src="Images/Numbers/colon.gif">';
                else if(i == 8) timerDiv.innerHTML += '<img src="Images/Numbers/dot.gif">';
                else{
                    let tmp = this.timeString[i];
                    timerDiv.innerHTML += `<img src="Images/Numbers/c${tmp}.gif">`;
                }
            }
        }, 1);
    }
    
    stop(withRecord){
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        if(!withRecord) return

        let info = document.getElementById("info");
        let ts = "";
        for(let i=0; i<12; i++){
            if(i == 2) ts += " godzin ";
            else if(i == 5) ts += " minut ";
            else ts += this.timeString[i];
        }
        ts += " sekund";
        info.innerHTML = `Ułożyłeś w czasie ${ts}.`;
        Objects.cookies.checkForPlace(this.timeString);
        document.getElementById("topParagraph").innerText="TOP10 - " + Objects.playboard.size + "x" + Objects.playboard.size
    }

    clear(){
        let timerDiv = document.getElementById("timer");
        timerDiv.innerHTML = "";
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/colon.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/colon.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/dot.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
        timerDiv.innerHTML += '<img src="Images/Numbers/c0.gif">';
    }
}
export default Timer;