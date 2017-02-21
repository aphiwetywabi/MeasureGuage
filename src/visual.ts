module powerbi.extensibility.visual {
    declare var google;

    interface DataPoint {
        axis: string;
        value: PrimitiveValue;
    }

    interface ViewModel {
        dataPoints: DataPoint[];
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
                axis: category.values[i] + '',
                value: dataValues.values[i]
            }

            viewModel.dataPoints.push(dataPoint);
        }

        return viewModel;
    }

    export class Visual implements IVisual {
        private target: HTMLElement;

        private greenStart: string;
        private greenEnd: string;
        private greenColorText: string;

        private yellowStart: string;
        private yellowEnd: string;
        private yellowColorText: string;

        private redStart: string;
        private redEnd: string;
        private redColorText: string;

        private maximum: string;
        private minimum: string;

        private title: string;

        private height: number;
        private width: number;

        private tickValue: string;

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
        }

        public update(options: VisualUpdateOptions) {

            this.target.innerHTML = "<div id='chart_div'></div>";

            this.loadParameters(options);

            // if there is no data, show placerholder
            if (options.dataViews.length === 0) {
                this.loadPlaceholderGauge(options);
            }
            else {
                this.loadGauge(options);
            }

        }

        loadParameters(options: VisualUpdateOptions) {

        }

        loadGauge(options: VisualUpdateOptions) {

            let data = transformData(options);

            if (data.dataPoints.length === 0) {
                this.target.innerHTML = "<p>Missing data</p>";
                return;
            }

            let sortedDataPoints = data.dataPoints.sort((a, b) => (a > b) ? -1 : 1);
            var displayDataPoint = data.dataPoints[0];

            this.loadScript("https://www.gstatic.com/charts/loader.js",
                function () {
                    google.charts.load('current', { packages: ['gauge'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Label', 'Value'],
                            [displayDataPoint.axis, displayDataPoint.value]
                        ]);

                        /*
                                            var options = {
                                                width: width, height: height,
                                                redFrom: redStartInt, redTo: redEndInt,
                                                redColor: redColorValue,
                                                yellowFrom: yellowStartInt, yellowTo: yellowEndInt,
                                                yellowColor: yellowColorValue,
                                                greenFrom: greenStartInt, greenTo: greenEndInt,
                                                greenColor: greenColorValue,
                                                minorTicks: numberTicks,
                                                max: maximumInt,
                                                min: minimumInt
                        
                                            };
                                            */

                        var chart = new google.visualization.Gauge(document.querySelector('#chart_div'));
                        chart.draw(data, options);
                    }
                });

        }

        loadPlaceholderGauge(options: VisualUpdateOptions) {
            const height = options.viewport.height;
            const width = options.viewport.width;

            this.loadScript("https://www.gstatic.com/charts/loader.js",
                function () {
                    google.charts.load('current', { packages: ['gauge'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable([
                            ['Label', 'Value'],
                            ["Placeholder", 30]
                        ]);

                        var options = {
                            width: width,
                            height: height,
                            min: 0,
                            max: 100
                        };

                        var chart = new google.visualization.Gauge(document.querySelector('#chart_div'));
                        chart.draw(data, options);
                    }
                });
        }

        loadScript(url: string, callback: () => void) {

            // is the script loaded?
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
        /*
                public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
                    let objectName = options.objectName;
                    let objectEnumeration: VisualObjectInstance[] = [];
        
        
                    if (objectName === "customProperties") {
                        objectEnumeration.push({
                            objectName: objectName,
                            properties: {
                                gaugeTitle: this.title,
                                maximumValue: this.maximum,
                                minimumValue: this.minimum,
                                redStartValue: this.redStart,
                                redEndValue: this.redEnd,
                                redColor: this.redColorText,
                                yellowStartValue: this.yellowStart,
                                yellowEndValue: this.yellowEnd,
                                yellowColor: this.yellowColorText,
                                greenStartValue: this.greenStart,
                                greenEndValue: this.greenEnd,
                                greenColor: this.greenColorText,
                                minorTickValue: this.tickValue
                            },
                            selector: null
                        });
                    }
        
                    return objectEnumeration;
                }
                */
    }
}