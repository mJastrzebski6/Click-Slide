import Cookies from "./Cookies.js";
import Overlay from "./Overlay.js";
import Playboard from "./Playboard.js";
import Slider from "./Slider.js";
import Timer from "./Timer.js";

class Objects{
    static slider = new Slider();
    static cookies = new Cookies();
    static overlay = new Overlay();
    static playboard = new Playboard();
    static timer = new Timer();
}

export default Objects;
