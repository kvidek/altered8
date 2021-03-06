import "mailgo";

import CustomCursor from "./components/CustomCursor";
import MobileMotion from "./components/MobileMotion";
import Loader from "./components/Loader";
import NavigationController from "./components/NavigationController";
import Background from "./components/Background";

function ready(callbackFunc) {
    if (document.readyState !== "loading") {
        /**
         * Document is already ready, call the callback directly
         */
        callbackFunc();
    } else if (document.addEventListener) {
        /**
         * All modern browsers to register DOMContentLoaded
         */
        document.addEventListener("DOMContentLoaded", callbackFunc);
    } else {
        /**
         * Old IE browsers
         */
        document.attachEvent("onreadystatechange", function() {
            if (document.readyState === "complete") {
                callbackFunc();
            }
        });
    }

    var consoleLogStyle = [
        "background-color: #000000",
        "color: white",
        "display: block",
        "line-height: 24px",
        "text-align: center",
        "border: 1px solid #ffffff",
        "border-radius: 3px",
        "font-weight: bold",
    ].join(";");

    console.log("dev by: %c ALTRD ∞ ", consoleLogStyle);
}

/**
 * Document ready callback
 */
ready(function() {
    const cursor = new CustomCursor();
    cursor.init();

    const mobileMotion = new MobileMotion();
    mobileMotion.init();

    const loader = new Loader();
    loader.init();

    const background = new Background();
    background.init();

    const navigation = new NavigationController();
    navigation.init();
});
