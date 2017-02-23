module powerbi.extensibility.visual {
    declare var google;

    interface DataPoint {
        axis: string;
        value: number;
    }

    interface ViewModel {
        dataPoints: DataPoint[];
    }

    interface Parameters {
        gaugeLabel: string;
        minimum: number;
        maximum: number;
    }

    function transformData(options: VisualUpdateOptions): ViewModel {

        let viewModel: ViewModel = {
            dataPoints: []
        };

        if (!options.dataViews ||
            !options.dataViews[0] ||
            !options.dataViews[0].categorical ||
            !options.dataViews[0].categorical.categories ||
            !options.dataViews[0].categorical.categories[0].source ||
            !options.dataViews[0].categorical.values) {
            return viewModel;
        }

        const dataView = options.dataViews[0];
        const categorical = dataView.categorical;
        let category = categorical.categories[0];
        let dataValues = categorical.values[0];

        for (var i = 0; i < category.values.length; i++) {
            let dataPoint: DataPoint = {
                axis: <string>category.values[i],
                value: <number>dataValues.values[i]
            }

            viewModel.dataPoints.push(dataPoint);
        }

        return viewModel;
    }

    export class Visual implements IVisual {
        private target: HTMLElement;

        private parameters: Parameters;

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
        }

        public update(options: VisualUpdateOptions) {

            this.loadParameters(options);
            const data = transformData(options);

            this.target.innerHTML = "<div id='chart_div'></div>";

            const width = options.viewport.width;
            const height = options.viewport.height;

            if (data.dataPoints.length === 0) {
                this.drawGauge(0, width, height, this.parameters);
            }
            else {
                const sortedDataPoints = data.dataPoints.sort((a, b) => (a > b) ? -1 : 1);
                const displayDataPoint = data.dataPoints[0];

                this.drawGauge(displayDataPoint.value, width, height, this.parameters);
            }
        }

        loadParameters(options: VisualUpdateOptions) {

            let defaultParameters: Parameters = {
                gaugeLabel: "",
                minimum: 0,
                maximum: 100
            };
            
            debugger;

            if (!options.dataViews ||
                !options.dataViews[0] ||
                !options.dataViews[0].metadata ||
                !options.dataViews[0].metadata.objects) {
                this.parameters = defaultParameters;
                return;
            }

            const properties = options.dataViews[0].metadata.objects["customProperties"];

            defaultParameters.gaugeLabel = <string>properties["gaugeLabel"];
            defaultParameters.minimum = <number>properties["minimum"];
            defaultParameters.maximum = <number>properties["maximum"];

            debugger;

            this.parameters = defaultParameters;
        }

        drawGauge(value: number, width: number, height: number, parameters: Parameters) {

            this.loadScript("https://www.gstatic.com/charts/loader.js",
                function () {
                    google.charts.load('current', { packages: ['gauge'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        const data = google.visualization.arrayToDataTable([
                            ['Label', 'Value'],
                            [parameters.gaugeLabel, value]
                        ]);

                        const options = {
                            width: width,
                            height: height,
                            min: parameters.minimum,
                            max: parameters.maximum
                        };

                        const chart = new google.visualization.Gauge(document.querySelector('#chart_div'));
                        chart.draw(data, options);
                    }
                });
        }

        loadScript(url: string, callback: () => void) {

            const scripts = document.querySelectorAll("script");
            const sources = [];

            for (var i = 0; i < scripts.length; i++) {
                sources.push(scripts[i].getAttribute("src"));
            }

            const existingScripts = sources.filter(source => source === url);

            if (existingScripts.length === 0) {
                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script.onload = callback;
                head.appendChild(script);
            }
            else {
                callback();
            }
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let objectName = options.objectName;
            let objectEnumeration: VisualObjectInstance[] = [];

            if (objectName === "customProperties") {
                objectEnumeration.push({
                    objectName: objectName,
                    properties: {
                        gaugeLabel: this.parameters.gaugeLabel,
                        minimum: this.parameters.minimum,
                        maximum: this.parameters.maximum
                        // maximumValue: this.maximum,
                        // minimumValue: this.minimum,
                        // redStartValue: this.redStart,
                        // redEndValue: this.redEnd,
                        // redColor: this.redColorText,
                        // yellowStartValue: this.yellowStart,
                        // yellowEndValue: this.yellowEnd,
                        // yellowColor: this.yellowColorText,
                        // greenStartValue: this.greenStart,
                        // greenEndValue: this.greenEnd,
                        // greenColor: this.greenColorText,
                        // minorTickValue: this.tickValue
                    },
                    selector: null
                });
            }

            return objectEnumeration;
        }
    }
}