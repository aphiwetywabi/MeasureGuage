module powerbi.extensibility.visual {
    declare var Gauge;

    export class Visual implements IVisual {
        private target: HTMLElement;

        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.target = options.element;
        }

        public update(options: VisualUpdateOptions) {

            this.target.innerHTML = "<div id='chart_div'></div>";

            const gaugeOptions = {
                angle: -0.5,
                lineWidth: 0.44,
                radiusScale: 1,
                pointer: {
                },
                limitMax: false,
                limitMin: false,
                colorStart: "#6FADCF",
                colorStop: "#8FC0DA",
                strokeColor: "#E0E0E0",
                generateGradient: true,
                highDpiSupport: true
            };

            debugger;

            try {
                const target = document.querySelector("#chart_div");

                const gauge = new Gauge(target).setOptions(gaugeOptions);
                gauge.maxValue = 3000;
                gauge.setMinValue(0);
                gauge.animationSpeed = 128;
                gauge.set(325);
            } catch (error) {
                console.error(error);
            }
        }
    }
}