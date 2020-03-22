import gsap from "gsap";

export default class MobileMotion {
    /**
     *
     * @param {object} options
     */
    constructor(options) {
        const _defaults = {
            mobileMotionLayer: ".js-mobile-motion-layer",
        };

        this.defaults = Object.assign({}, _defaults, options);
    }

    get mobileMotionLayer() {
        return document.querySelector(this.defaults.mobileMotionLayer);
    }

    init() {
        console.log("MobileMotion init()");

        if (window.DeviceOrientationEvent) {
            this.mobileMove();
        }
    }

    mobileMove() {
        window.addEventListener(
            "deviceorientation",
            (ev) => {
                const deviceRotateX = ev.gamma.toFixed(2);
                const deviceRotateY = ev.beta.toFixed(2);

                gsap.to(this.mobileMotionLayer, {
                    duration: 0.6,
                    rotationY: 0.25 * deviceRotateX,
                    x: 0.5 * deviceRotateX,
                    y: 0.15 * deviceRotateY,
                    ease: "quad.out",
                    transformPerspective: 500,
                    transformOrigin: "center",
                });
            },
            false,
        );
    }
}
