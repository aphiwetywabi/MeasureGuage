

module powerbi.extensibility.visual.PBI_CV_7E0C75FC_084D_40C1_838D_881B1B88E6F5  {
    declare var google;
    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private customTitle: string;
        private gaugeColor: string;
        private gaugeMaxValue: string;
        private testText: string;
        private textColor:string;
        private time: number;
        private temperature: string;
        private yellowStart: string;
        private redStart: string;
        private maximum: string;
        private minimum: string;
        private title: string;
        private greenStart: string;
        private redEnd: string;
        private yellowEnd: string;
        private greenEnd: string;
        private height: number;
        private width: number;
        private redColorText: string;
        private yellowColorText: string;
        private greenColorText: string;
        private tickValue: string;
        
        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
            this.updateCount = 0;
            this.customTitle = "Aphiwe sucks";
            this.gaugeMaxValue = "MyName";
        }

        public update(options: VisualUpdateOptions) {
            let dataView = options.dataViews[0];
            let categorical = dataView.categorical;
            this.height = options.viewport.height;
            this.width = options.viewport.width;
            var height = parseInt(this.width.toString());
            var width = parseInt(this.height.toString());
            var redColorInitial: string;
            var yellowColorInitial: string;
            var greenColorInitial: string;

            try {
             redColorInitial = '#DC3912';
             yellowColorInitial = '#FF9900';
             greenColorInitial = '#109618';

            } catch(err) {

            }

            this.redColorText = redColorInitial;
            this.yellowColorText = yellowColorInitial;
            this.greenColorText = greenColorInitial;
            this.title = "Title";

            try {
                
            let properties = dataView.metadata.objects["customProperties"];
            this.yellowStart = <string>properties["yellowStartValue"];
            this.yellowEnd = <string>properties["yellowEndValue"];
            this.redStart  = <string>properties["redStartValue"];
            this.redEnd = <string>properties["redEndValue"];
            this.greenStart = <string>properties["greenStartValue"];
            this.greenEnd = <string>properties["greenEndValue"];
            this.maximum = <string>properties["maximumValue"];
            this.minimum = <string>properties["minimumValue"];
            this.tickValue = <string>properties["minorTickValue"];
            this.temperature = <string>properties["temperatureValue"];
            this.title = <string>properties["gaugeTitle"];
            this.redColorText = <string>(properties["redColor"]["solid"]["color"]);
            this.yellowColorText = <string>(properties["yellowColor"]["solid"]["color"]);
            this.greenColorText = <string>(properties["greenColor"]["solid"]["color"]);
            }catch(r) {
                    
            }

            var redColorValue = this.redColorText;
            var yellowColorValue = this.yellowColorText;
            var greenColorValue = this.greenColorText;
            var titleValue: string = this.title; 
            var maximumInt: number = 100;
            var minimumInt: number = 0;
            var redEndInt: number = 0;
            var redStartInt: number = 0;
            var yellowEndInt: number = 0;
            var yellowStartInt: number = 0;
            var greenEndInt: number = 0;
            var greenStartInt: number = 0;
            var temperatureInt: number = 0;
            var numberTicks: number = 10;
            debugger;

            this.target.innerHTML = "<div id='chart_div'></div>";
        
            if(Number(parseInt(this.maximum))) {
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
            
            if (Number(parseInt(this.yellowStart)) && (Number(parseInt(this.yellowEnd)))){
              yellowStartInt = parseInt(this.yellowStart);
              yellowEndInt = parseInt(this.yellowEnd);
            }
            
            if (Number(parseInt(this.greenStart)) && Number(parseInt(this.greenEnd))){
              greenStartInt = parseInt(this.greenStart);
              greenEndInt = parseInt(this.greenEnd);
            }
            
            
            if (Number(parseInt(this.temperature))) {
                temperatureInt = parseInt(this.temperature);
            }

            if(redColorValue === 'undefined') {
                redColorValue = redColorInitial;
            }
             
             if(yellowColorValue === 'undefined') {
                yellowColorValue = yellowColorInitial;

             }

             if(greenColorValue.toString() === 'undefined') {
                 greenColorValue = greenColorInitial;
             }

           this.loadScript("https://www.gstatic.com/charts/loader.js",
                function() {
                    google.charts.load('current', {packages: ['gauge']});
                    var data = google.visualization.arrayToDataTable([
                        ['Label', 'Value'],
                        [titleValue, temperatureInt]
                        
                    ]);

                    var options = {
                       width: width , height: height,
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
           
        }
        loadScript(url: string, callback: () => void) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = callback;
            head.appendChild(script);
        }
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration  {
             let objectName = options.objectName;
             let objectEnumeration : VisualObjectInstance[] = [];
             

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
    }
}