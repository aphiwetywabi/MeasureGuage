var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5;
            (function (PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5) {
                var Visual = (function () {
                    function Visual(options) {
                        this.target = options.element;
                        this.updateCount = 0;
                        this.customTitle = "Aphiwe sucks";
                        this.gaugeMaxValue = "MyName";
                    }
                    Visual.prototype.update = function (options) {
                        var dataView = options.dataViews[0];
                        var categorical = dataView.categorical;
                        this.height = options.viewport.height;
                        this.width = options.viewport.width;
                        var height = parseInt(this.width.toString());
                        var width = parseInt(this.height.toString());
                        var redColorInitial;
                        var yellowColorInitial;
                        var greenColorInitial;
                        try {
                            redColorInitial = '#DC3912';
                            yellowColorInitial = '#FF9900';
                            greenColorInitial = '#109618';
                        }
                        catch (err) {
                        }
                        this.redColorText = redColorInitial;
                        this.yellowColorText = yellowColorInitial;
                        this.greenColorText = greenColorInitial;
                        this.title = "Title";
                        try {
                            var properties = dataView.metadata.objects["customProperties"];
                            this.yellowStart = properties["yellowStartValue"];
                            this.yellowEnd = properties["yellowEndValue"];
                            this.redStart = properties["redStartValue"];
                            this.redEnd = properties["redEndValue"];
                            this.greenStart = properties["greenStartValue"];
                            this.greenEnd = properties["greenEndValue"];
                            this.maximum = properties["maximumValue"];
                            this.minimum = properties["minimumValue"];
                            this.tickValue = properties["minorTickValue"];
                            this.temperature = properties["temperatureValue"];
                            this.title = properties["gaugeTitle"];
                            this.redColorText = (properties["redColor"]["solid"]["color"]);
                            this.yellowColorText = (properties["yellowColor"]["solid"]["color"]);
                            this.greenColorText = (properties["greenColor"]["solid"]["color"]);
                        }
                        catch (r) {
                        }
                        var redColorValue = this.redColorText;
                        var yellowColorValue = this.yellowColorText;
                        var greenColorValue = this.greenColorText;
                        var titleValue = this.title;
                        var maximumInt = 100;
                        var minimumInt = 0;
                        var redEndInt = 0;
                        var redStartInt = 0;
                        var yellowEndInt = 0;
                        var yellowStartInt = 0;
                        var greenEndInt = 0;
                        var greenStartInt = 0;
                        var temperatureInt = 0;
                        var numberTicks = 10;
                        debugger;
                        this.target.innerHTML = "<div id='chart_div'></div>";
                        if (Number(parseInt(this.maximum))) {
                            maximumInt = parseInt(this.maximum);
                        }
                        if (Number(parseInt(this.minimum))) {
                            minimumInt = parseInt(this.minimum);
                        }
                        if (Number(parseInt(this.tickValue.trim())) && parseInt(this.tickValue.trim()) >= 0) {
                            numberTicks = parseInt(this.tickValue.trim());
                        }
                        if (Number(parseInt(this.redStart)) && Number(parseInt(this.redEnd))) {
                            redStartInt = parseInt(this.redStart);
                            redEndInt = parseInt(this.redEnd);
                        }
                        if (Number(parseInt(this.yellowStart)) && (Number(parseInt(this.yellowEnd)))) {
                            yellowStartInt = parseInt(this.yellowStart);
                            yellowEndInt = parseInt(this.yellowEnd);
                        }
                        if (Number(parseInt(this.greenStart)) && Number(parseInt(this.greenEnd))) {
                            greenStartInt = parseInt(this.greenStart);
                            greenEndInt = parseInt(this.greenEnd);
                        }
                        if (Number(parseInt(this.temperature))) {
                            temperatureInt = parseInt(this.temperature);
                        }
                        if (redColorValue === 'undefined') {
                            redColorValue = redColorInitial;
                        }
                        if (yellowColorValue === 'undefined') {
                            yellowColorValue = yellowColorInitial;
                        }
                        if (greenColorValue.toString() === 'undefined') {
                            greenColorValue = greenColorInitial;
                        }
                        this.loadScript("https://www.gstatic.com/charts/loader.js", function () {
                            google.charts.load('current', { packages: ['gauge'] });
                            var data = google.visualization.arrayToDataTable([
                                ['Label', 'Value'],
                                [titleValue, temperatureInt]
                            ]);
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
                            var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
                            chart.draw(data, options);
                        });
                    };
                    Visual.prototype.loadScript = function (url, callback) {
                        var head = document.getElementsByTagName("head")[0];
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = url;
                        script.onload = callback;
                        head.appendChild(script);
                    };
                    Visual.prototype.enumerateObjectInstances = function (options) {
                        var objectName = options.objectName;
                        var objectEnumeration = [];
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
                    };
                    return Visual;
                }());
                PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5.Visual = Visual;
            })(PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5 = visual.PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5 || (visual.PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5 = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5_DEBUG = {
                name: 'PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5_DEBUG',
                displayName: 'ObjTest',
                class: 'Visual',
                version: '1.0.0',
                apiVersion: '1.3.0',
                create: function (options) { return new powerbi.extensibility.visual.PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5.Visual(options); },
                custom: true
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=visual.js.map