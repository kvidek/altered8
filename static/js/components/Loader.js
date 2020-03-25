import gsap from "gsap";

/**
 * Loader class
 */
export default class Loader {
    constructor() {
        /**
         *
         * @type {{loader: string, background: string, stagingLogo: string, loaderWrapper: string, stagingElement: string, loaderLayer: string}}
         */
        this.DOM = {
            loaderWrapper: ".js-loader-wrapper",
            loader: ".js-loader",
            background: ".js-background",
            loaderLayer: ".js-loader-layer",
            stagingLogo: ".js-staging-logo",
            stagingElement: ".js-staging-element",
        };

        this.loaderWrapper = document.querySelector(this.DOM.loaderWrapper);

        this.loader = document.querySelector(this.DOM.loader);

        this.loaderLayers = document.querySelectorAll(this.DOM.loaderLayer);

        this.stagingLogo = document.querySelector(this.DOM.stagingLogo);

        this.stagingElements = document.querySelectorAll(
            this.DOM.stagingElement,
        );

        this.background = document.querySelector(this.DOM.background);

        this.loaderTl = gsap.timeline({
            paused: true,
            // delay: 0.6,
            onComplete: () => {
                document.documentElement.classList.remove("is-locked");
                this.loaderWrapper.parentNode.removeChild(this.loaderWrapper);
            },
        });
    }

    init() {
        console.log("Navigation init()");

        if (this.loaderWrapper != null) {
            this.initLoader();
        } else {
            console.error(
                `${this.DOM.loaderWrapper} does not exist in the DOM!`,
            );
        }
    }

    /**
     *
     */
    initLoader() {
        const duration = 1.8;

        this.loaderTl
            .add("tlStart")
            .to(
                this.loaderLayers,
                {
                    duration: duration,
                    x: "100%",
                    stagger: {
                        each: 0.015,
                        from: "end",
                    },
                    ease: "power3.inOut",
                },
                "tlStart",
            )
            .fromTo(
                this.stagingElements,
                {
                    x: "-75%",
                    skewX: "-2.5deg",
                    autoAlpha: 0,
                },
                {
                    duration: duration,
                    autoAlpha: 1,
                    x: "0%",
                    skewX: "0deg",
                    stagger: {
                        each: 0.1,
                        from: "start",
                    },
                    ease: "power3.inOut",
                },
                "tlStart+=0.2",
            )
            .fromTo(
                this.stagingLogo,
                {
                    x: "-25%",
                    skewX: "-1.5deg",
                    autoAlpha: 0,
                },
                {
                    duration: duration,
                    autoAlpha: 1,
                    x: "0%",
                    skewX: "0deg",
                    ease: "power3.inOut",
                },
                "tlStart+=0.2",
            )
            .fromTo(
                this.background,
                {
                    scale: 1.25,
                },
                {
                    scale: 1,
                    duration: 2.2,
                    ease: "power3.inOut",
                },
                "tlStart",
            )
            .fromTo(
                this.loader,
                {
                    skewX: "-1.5deg",
                },
                {
                    duration: duration,
                    skewX: "0deg",
                    ease: "power3.inOut",
                },
                "tlStart",
            )
            .to(this.loaderWrapper, {
                duration: 0.2,
                autoAlpha: 0,
            });

        this.playTimeline();
    }

    playTimeline() {
        this.loaderTl.play();
    }
    //endregion
}
