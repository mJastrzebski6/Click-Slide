import Objects from "./Objects.js";

class Cookies{
    scoreboardArray = {
        3: [], 4: [], 5: [], 6: []
    };

    constructor(){
        this.getCookie();
    }

    getCookie() {
        const cookieName = "scoreboard=";
        const cookieValue = document.cookie
          .split("; ")
          .find(row => row.startsWith(cookieName))
          ?.split("=")[1];
    
        if (cookieValue) {
          try {
            this.scoreboardArray = JSON.parse(decodeURIComponent(cookieValue));
          } catch (error) {
            console.error("Błąd przy parsowaniu ciasteczka: ", error);
            this.scoreboardArray = { 3: [], 4: [], 5: [], 6: [] }; 
          }
        } else {
          this.setCookie();
        }
      }
    
    setCookie() {
        const cookieName = "scoreboard=";
        const cookieValue = encodeURIComponent(JSON.stringify(this.scoreboardArray));
        const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString(); // 365 dni ważności
        document.cookie = `${cookieName}${cookieValue}; expires=${expires}; path=/; SameSite=Strict`;
    }

    checkForPlace(time){
        this.time = time;
        let isPlace = false;
        if(this.scoreboardArray[Objects.playboard.size].length < 10) isPlace = true;
        else{
            this.scoreboardArray[Objects.playboard.size].forEach(element => {
                if(((element.time > time) - (element.time < time)) > 0) isPlace = true;
            });
        }
        if(isPlace) Objects.overlay.inputOn();
        else{
            Objects.overlay.recordsOn();
        }
    }

    updateScoreboard(nick){
        if(nick=="") nick="anonymous";
        let score = {
            nick: nick,
            time: this.time
        }
        this.scoreboardArray[Objects.playboard.size].sort(function(a, b) {
            return (a.time > b.time) - (a.time < b.time);
        });
        if(this.scoreboardArray[Objects.playboard.size].length < 10) this.scoreboardArray[Objects.playboard.size].push(score);
        else{
            this.scoreboardArray[Objects.playboard.size][this.scoreboardArray[Objects.playboard.size].length-1] = score;
        }
        this.scoreboardArray[Objects.playboard.size].sort(function(a, b) {
            return (a.time > b.time) - (a.time < b.time);
        });
        this.setCookie();
    }

    getNick(){
        let nick = document.getElementById('nick-input').value;
        Objects.overlay.inputOff();
        this.updateScoreboard(nick);
        this.displayRecords();
    }
    
    displayRecords(){
        let nicks = "";
        let times = "";
        for(let i=0; i<this.scoreboardArray[Objects.playboard.size].length; i++){
            nicks += `${this.scoreboardArray[Objects.playboard.size][i].nick}</br>`;
            times += `${this.scoreboardArray[Objects.playboard.size][i].time}</br>`;
        }
        let nicksDiv = document.getElementById("nicks");
        nicksDiv.innerHTML = nicks;
        let timesDiv = document.getElementById("times");
        timesDiv.innerHTML = times;
        Objects.overlay.recordsOn();
    }
}
export default Cookies;