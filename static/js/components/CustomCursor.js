import gsap from "gsap";

/**
 * CustomCursor class
 */
export default class CustomCursor {
    constructor() {
        /**
         * Cursor DOM selectors
         * @type {{cursor: string, cursorFollower: string, link: string}}
         */
        this.DOM = {
            cursor: ".js-cursor",
            cursorFollower: ".js-cursor-follower",
            link: ".js-link",
        };

        /**
         * Cursor states
         * @type {{cursorHovered: string, cursorActive: string, cursorPressed: string}}
         */
        this.states = {
            cursorActive: "is-active",
            cursorHovered: "is-hovered",
            cursorPressed: "is-pressed",
        };

        /**
         *
         * @type {Element}
         */
        this.cursor = document.querySelector(this.DOM.cursor);

        /**
         *
         * @type {Element}
         */
        this.cursorFollower = document.querySelector(this.DOM.cursorFollower);

        /**
         *
         * @type {NodeListOf<Element>}
         */
        this.links = document.querySelectorAll(this.DOM.link);
    }

    init() {
        console.log("CustomCursor init()");

        if (this.cursor != null) {
            this.cursorController();
        } else {
            console.error(`${this.DOM.cursor} does not exist in the DOM!`);
        }
    }

    //CURSOR
    /**
     *
     */
    cursorController() {
        document.addEventListener("mousemove", (ev) => {
            this.onMouseMove(ev);
        });

        document.addEventListener("mousedown", (ev) => {
            this.onMouseDown(ev, this.states.cursorPressed);
        });

        document.addEventListener("mouseup", (ev) => {
            this.onMouseUp(ev, this.states.cursorPressed);
        });

        [...this.links].forEach((link) => {
            link.addEventListener("mouseenter", (ev) => {
                this.onMouseEnter(ev, this.states.cursorActive);
            });

            link.addEventListener("mouseleave", (ev) => {
                this.onMouseLeave(ev, this.states.cursorActive);
            });
        });
    }

    /**
     *
     * @param event
     */
    onMouseMove(event) {
        gsap.to(this.cursor, 0.25, {
            x: event.clientX,
            y: event.clientY,
        });

        gsap.to(this.cursorFollower, 0.5, {
            x: event.clientX,
            y: event.clientY,
            ease: "power3.easeOut",
        });
    }

    /**
     *
     * @param event
     * @param stateClass
     */
    onMouseEnter(event, stateClass) {
        this.cursor.classList.add(stateClass);
        this.cursorFollower.classList.add(stateClass);
        event.currentTarget.classList.add(this.states.cursorHovered);

        gsap.to(this.cursorFollower, 0.25, {
            scale: 1.25,
            ease: "power2.out",
        });
    }

    /**
     *
     * @param event
     * @param stateClass
     */
    onMouseLeave(event, stateClass) {
        this.cursor.classList.remove(stateClass);
        this.cursorFollower.classList.remove(stateClass);
        event.currentTarget.classList.remove(this.states.cursorHovered);

        gsap.to(this.cursorFollower, 0.25, {
            scale: 1,
            ease: "power2.out",
        });
    }

    /**
     *
     * @param event
     * @param stateClass
     */
    onMouseDown(event, stateClass) {
        this.cursor.classList.add(stateClass);
        this.cursorFollower.classList.add(stateClass);

        gsap.to(this.cursorFollower, 0.25, {
            scale: 0.7,
            ease: "power3.easeOut",
        });
    }

    /**
     *
     * @param event
     * @param stateClass
     */
    onMouseUp(event, stateClass) {
        this.cursor.classList.remove(stateClass);
        this.cursorFollower.classList.remove(stateClass);

        gsap.to(this.cursorFollower, 0.25, {
            scale: 1,
            ease: "power3.easeOut",
        });
    }
}
