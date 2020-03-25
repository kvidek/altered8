import * as PIXI from "pixi.js";
import gsap from "gsap";

window.PIXI = PIXI;

export default class Background {
    constructor(options) {
        let _defaults = {
            //
            canvasWidth: 1600,
            canvasHeight: 900,
            canvasContainer: ".js-background",
        };

        this.defaults = Object.assign({}, _defaults, options);

        //PIXI stuff
        //PIXI.utils.skipHello();

        this.canvasWidth =
            innerWidth > 800
                ? this.defaults.canvasWidth
                : this.defaults.canvasWidth / 2;
        // this.canvasWidth = window.innerWidth;
        this.canvasHeight =
            innerHeight > 800
                ? this.defaults.canvasHeight
                : this.defaults.canvasHeight / 2;
        // this.canvasHeight = window.innerWidth * 0.5625;
    }

    get canvasContainer() {
        return document.querySelector(this.defaults.canvasContainer);
    }

    init() {
        console.log("Background init()");

        let rt = [],
            bg,
            bgs = [],
            rts = [],
            containers = [],
            channelsContainer = [],
            displacementFilters = [],
            brushes = [];

        // CHANNEL FILTERS
        let redChannelFilter = new PIXI.filters.ColorMatrixFilter();
        redChannelFilter.matrix = [
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
        ];

        let greenChannelFilter = new PIXI.filters.ColorMatrixFilter();
        greenChannelFilter.matrix = [
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
        ];

        let blueChannelFilter = new PIXI.filters.ColorMatrixFilter();
        blueChannelFilter.matrix = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
        ];

        channelsContainer.push(
            redChannelFilter,
            greenChannelFilter,
            blueChannelFilter,
        );

        let app = new PIXI.Application({
            width: this.canvasWidth,
            height: this.canvasHeight,
            autoStart: false,
            transparent: true,
            //resizeTo: this.canvasContainer,
        });

        // ADD CANVAS TO CANVAS WRAPPER ELEMENT
        this.canvasContainer.appendChild(app.view);

        for (var i = 0; i < 3; i++) {
            rt.push(
                PIXI.RenderTexture.create(app.screen.width, app.screen.height),
            );
            rts.push(rt);
        }

        // CONTAINERS //
        let containerRed = new PIXI.Container();
        containerRed.position.x = 0;

        let containerGreen = new PIXI.Container();
        containerGreen.position.x = 0;

        let containerBlue = new PIXI.Container();
        containerBlue.position.x = 0;

        containers.push(containerRed, containerGreen, containerBlue);

        // LOAD TEXTURES //
        app.loader.add("bg", this.canvasContainer.getAttribute("data-image"));
        app.loader.add(
            "one",
            this.canvasContainer.getAttribute("data-displacement-image"),
        );

        // LOADER //
        app.loader.load((loader, resources) => {
            var tempBg = new PIXI.Sprite(resources.bg.texture);
            tempBg.width = app.screen.width;
            tempBg.height = app.screen.height;

            app.renderer.render(tempBg, rt[0]);

            for (var i = 0, len = containers.length; i < len; i++) {
                app.stage.addChild(containers[i]);
                brushes.push(new PIXI.Sprite(resources.one.texture));
                displacementFilters.push(
                    new PIXI.filters.DisplacementFilter(brushes[i]),
                );

                bg = new PIXI.Sprite(rts[0][0]);
                bgs.push(bg);
                containers[i].filters = [
                    channelsContainer[i],
                    displacementFilters[i],
                ];
                containers[i].addChild(bgs[i], brushes[i]);
            }

            brushes[0].anchor.set(0.5);
            brushes[1].anchor.set(0.6);
            brushes[2].anchor.set(0.4);
            containers[1].filters[1].blendMode = PIXI.BLEND_MODES.ADD;
            containers[2].filters[1].blendMode = PIXI.BLEND_MODES.ADD;

            app.stage.interactive = true;

            if (this.canvasWidth > 800) {
                app.stage.on("pointermove", onPointerMove);
            }

            app.start();
        });

        function onPointerMove(event) {
            let x = event.data.global.x;
            let y = event.data.global.y;

            for (var i = 0, len = containers.length; i < len; i++) {
                gsap.to(displacementFilters[i].scale, {
                    duration: 0.2,
                    x: Math.atan(x - brushes[i].x) * 40,
                    y: Math.atan(y - brushes[i].y) * 40,
                    ease: "power2.out",
                });

                brushes[i].position = event.data.global;
            }
        }
    }
}
