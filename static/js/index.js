import CustomCursor from "./components/CustomCursor";
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
}

/**
 * Document ready callback
 */
ready(function() {
    const cursor = new CustomCursor();

    const loader = new Loader();
    loader.playTimeline();

    const background = new Background();
    background.init();

    const navigation = new NavigationController();
    navigation.init();
});
