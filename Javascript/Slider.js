 import Objects from "./Objects.js";
 
 class Slider {
    
    constructor(){
        this.picture = document.getElementById("photo");
        this.leftArrow = document.getElementById("leftArrow");
        this.rightArrow = document.getElementById("rightArrow");
        this.currentImageIndex = 1;
        
        this.leftArrow.addEventListener("click", () => this.slideLeft());
        this.rightArrow.addEventListener("click", () => this.slideRight());
        this.picture.scrollLeft = 0;
    }

    slideRight(){
        this.leftArrow.style.pointerEvents = 'none';
        this.rightArrow.style.pointerEvents = 'none';

        if(this.currentImageIndex == 4){
            this.currentImageIndex = 1;
            this.picture.scrollLeft = 0;
        } 
        this.currentImageIndex++;

        let end = this.picture.scrollLeft + 120;

        let toRightInterval = setInterval(() => {
            this.picture.scrollLeft += 10;
            if(this.picture.scrollLeft == end){
                clearInterval(toRightInterval);
                this.leftArrow.style.pointerEvents = 'auto'; 
                this.rightArrow.style.pointerEvents = 'auto'; 
            } 
        }, 1);    
    }

    slideLeft(){
        this.leftArrow.style.pointerEvents = 'none';
        this.rightArrow.style.pointerEvents = 'none';

        if(this.currentImageIndex == 1){
            this.currentImageIndex = 4;
            this.picture.scrollLeft = 360;
        } 
        this.currentImageIndex--;

        let end = this.picture.scrollLeft - 120;
        let toLeftInterval = setInterval(() => {
            this.picture.scrollLeft -= 10;
            if(this.picture.scrollLeft == end){
                clearInterval(toLeftInterval);
                this.leftArrow.style.pointerEvents = 'auto'; 
                this.rightArrow.style.pointerEvents = 'auto'; 
            } 
        }, 1);
    }
}
export default Slider;