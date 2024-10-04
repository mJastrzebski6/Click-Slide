import Objects from "./Objects.js";
 
 class Slider {
    
    constructor(){
        this.sliderImage = document.getElementById("slider-image");
        this.leftArrow = document.getElementById("prev-slide");
        this.rightArrow = document.getElementById("next-slide");
        this.currentImageIndex = 0;
        this.images = ['./Images/Pictures/1.png', './Images/Pictures/2.png', './Images/Pictures/3.png'];
        this.image = new Image();
        this.loadImage()
        this.leftArrow.addEventListener('click', () => {
            Objects.timer.stop(false)
            Objects.timer.clear()
            this.currentImageIndex = (this.currentImageIndex === 0) ? this.images.length - 1 : this.currentImageIndex - 1;
            this.loadImage();
        });
        
        this.rightArrow.addEventListener('click', () => {
            Objects.timer.stop(false)
            Objects.timer.clear()
            this.currentImageIndex = (this.currentImageIndex === this.images.length - 1) ? 0 : this.currentImageIndex + 1;
            this.loadImage();
        });
    }
    
    loadImage() {
        this.sliderImage.src = this.images[this.currentImageIndex];
        this.image.src = this.images[this.currentImageIndex];
        this.image.onload = () => {
            Objects.playboard.drawBigImage();
        };
    }
}
export default Slider;