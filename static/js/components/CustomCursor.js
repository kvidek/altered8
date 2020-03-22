import gsap from "gsap";

/**
 * CustomCursor class
 */
export default class CustomCursor {
    /**
     *
     * @param {object} options
     */
    constructor(options) {
        const _defaults = {
            //CURSOR
            cursor: ".js-cursor",
            cursorFollower: ".js-cursor-follower",
            link: ".js-link",
            dragContainer: ".js-drag-container",

            //CSS state classes
            activeClass: "is-active",
            hoverClass: "is-hovered",
            dragClass: "is-drag",
            pressClass: "is-pressed",
        };

        this.defaults = Object.assign({}, _defaults, options);

        if (this.cursor) {
            this.init();
        }
    }

    get cursor() {
        return document.querySelector(this.defaults.cursor);
    }

    get cursorFollower() {
        return document.querySelector(this.defaults.cursorFollower);
    }

    get links() {
        return document.querySelectorAll(this.defaults.link);
    }

    get dragContainers() {
        return document.querySelectorAll(this.defaults.dragContainer);
    }

    init() {
        console.log("CustomCursor init()");
        this.cursorController();
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
            this.onMouseDown(ev, this.defaults.pressClass);
        });

        document.addEventListener("mouseup", (ev) => {
            this.onMouseUp(ev, this.defaults.pressClass);
        });

        [...this.links].forEach((link) => {
            link.addEventListener("mouseenter", (ev) => {
                this.onMouseEnter(ev, this.defaults.activeClass);
            });

            link.addEventListener("mouseleave", (ev) => {
                this.onMouseLeave(ev, this.defaults.activeClass);
            });
        });

        [...this.dragContainers].forEach((dragContainer) => {
            dragContainer.addEventListener("mouseenter", (ev) => {
                this.onMouseEnter(ev, this.defaults.dragClass);
            });

            dragContainer.addEventListener("mouseleave", (ev) => {
                this.onMouseLeave(ev, this.defaults.dragClass);
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
        event.currentTarget.classList.add(this.defaults.hoverClass);

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
        event.currentTarget.classList.remove(this.defaults.hoverClass);

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
