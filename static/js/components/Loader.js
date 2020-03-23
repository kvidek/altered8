import gsap from "gsap";
/**
 * Loader class
 */
export default class Loader {
    /**
     *
     * @param options
     */
    constructor(options) {
        /**
         *
         * @type {{navigationSlideUp: string, navigation: string, activeClass: string, navigationScrolled: string, navigationFixed: string}}
         * @private
         */
        let _defaults = {
            //
            loaderWrapper: ".js-loader-wrapper",
            loader: ".js-loader",
            background: ".js-background",
            loaderLayer: ".js-loader-layer",
            stagingLogo: ".js-staging-logo",
            stagingElement: ".js-staging-element",
        };

        this.loaderTl = gsap.timeline({
            paused: true,
            // delay: 0.6,
            onComplete: () => {
                document.documentElement.classList.remove("is-locked");
                this.loaderWrapper.parentNode.removeChild(this.loaderWrapper);
            },
        });

        //loader config
        this.defaults = Object.assign({}, _defaults, options);

        if (this.loader) {
            this.init();
            this.initLoader();
        }
    }

    //region getters
    /**
     *
     * @returns {Element}
     */

    get loaderWrapper() {
        return document.querySelector(this.defaults.loaderWrapper);
    }

    get loader() {
        return document.querySelector(this.defaults.loader);
    }

    get loaderLayers() {
        return document.querySelectorAll(this.defaults.loaderLayer);
    }

    get stagingLogo() {
        return document.querySelector(this.defaults.stagingLogo);
    }

    get stagingElements() {
        return document.querySelectorAll(this.defaults.stagingElement);
    }

    get background() {
        return document.querySelector(this.defaults.background);
    }

    //endregion

    //region methods
    /**
     *
     */
    init() {
        console.log("Navigation init()");
    }

    //LOADER
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
    }

    playTimeline() {
        this.loaderTl.play();
    }
    //endregion
}
