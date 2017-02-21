var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5;
            (function (PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5) {
                function transformData(options) {
                    var viewModel = {
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
                    var dataView = options.dataViews[0];
                    var categorical = dataView.categorical;
                    var category = categorical.categories[0];
                    var dataValues = categorical.values[0];
                    for (var i = 0; i < category.values.length; i++) {
                        var dataPoint = {
                            axis: category.values[i] + '',
                            value: dataValues.values[i]
                        };
                        viewModel.dataPoints.push(dataPoint);
                    }
                    return viewModel;
                }
                var Visual = (function () {
                    function Visual(options) {
                        this.target = options.element;
                    }
                    Visual.prototype.update = function (options) {
                        this.target.innerHTML = "<div id='chart_div'></div>";
                        this.loadParameters(options);
                        // if there is no data, show placerholder
                        if (options.dataViews.length === 0) {
                            this.loadPlaceholderGauge(options);
                        }
                        else {
                            this.loadGauge(options);
                        }
                    };
                    Visual.prototype.loadParameters = function (options) {
                    };
                    Visual.prototype.loadGauge = function (options) {
                        var data = transformData(options);
                        if (data.dataPoints.length === 0) {
                            this.target.innerHTML = "<p>Missing data</p>";
                            return;
                        }
                        var sortedDataPoints = data.dataPoints.sort(function (a, b) { return (a > b) ? -1 : 1; });
                        var displayDataPoint = data.dataPoints[0];
                        this.loadScript("https://www.gstatic.com/charts/loader.js", function () {
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
                    };
                    Visual.prototype.loadPlaceholderGauge = function (options) {
                        var height = options.viewport.height;
                        var width = options.viewport.width;
                        this.loadScript("https://www.gstatic.com/charts/loader.js", function () {
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
                    };
                    Visual.prototype.loadScript = function (url, callback) {
                        // is the script loaded?
                        var scripts = document.querySelectorAll("script");
                        var sources = [];
                        for (var i = 0; i < scripts.length; i++) {
                            sources.push(scripts[i].getAttribute("src"));
                        }
                        var existingScripts = sources.filter(function (source) { return source === url; });
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