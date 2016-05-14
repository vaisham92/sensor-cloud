/**
 * Created by Vaishampayan Reddy on 4/19/2016.
 */
var sensorcloud = angular.module('sensorcloud', [ 'ngRoute' ]);

sensorcloud.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'projects/default.html',
        controller: 'defaultController'
    }).when('/login', {
        templateUrl: 'projects/login.html',
        controller: 'loginController'
    }).when('/signup', {
        templateUrl : 'projects/signup.html',
        controller : 'signupController'
    }).when('/home', {
        templateUrl : 'projects/home.html',
        controller : 'homeController'
    }).when('/home/sensors', {
        templateUrl : 'projects/sensor.html',
        controller : 'sensorController'
    }).otherwise({
        redirectTo : '/'
    });
    //$locationProvider.html5Mode(true);
}
]);

sensorcloud.directive( 'goClick', function ( $location ) {
    return function ( scope, element, attrs ) {
        var path;

        attrs.$observe( 'goClick', function (val) {
            path = val;
        });

        element.bind( 'click', function () {
            scope.$apply( function () {
                $location.path( path );
            });
        });
    };
});

sensorcloud.controller('defaultController', function($scope, $routeParams, $http) {
    var chart = AmCharts.makeChart("demoOne", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [ {
            "country": "USA",
            "visits": 2025
        }, {
            "country": "China",
            "visits": 1882
        }, {
            "country": "Japan",
            "visits": 1809
        }, {
            "country": "UK",
            "visits": 1122
        }, {
            "country": "France",
            "visits": 1114
        }, {
            "country": "India",
            "visits": 984
        }, {
            "country": "Russia",
            "visits": 580
        } ],
        "valueAxes": [ {
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
        } ],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [ {
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "visits"
        } ],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20
        },
        "export": {
            "enabled": true
        }

    } );

    var chart2 = AmCharts.makeChart("demoTwo", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [ {
            "country": "USA",
            "litres": 2025
        }, {
            "country": "China",
            "litres": 1882
        }, {
            "country": "Japan",
            "litres": 1809
        }, {
            "country": "UK",
            "litres": 1122
        }, {
            "country": "France",
            "litres": 1114
        }, {
            "country": "India",
            "litres": 984
        }, {
            "country": "Russia",
            "litres": 580
        } ],
        "valueField": "litres",
        "titleField": "country",
        "balloon":{
            "fixedPosition":true
        },
        "export": {
            "enabled": true
        }
    });

    var chart3 = AmCharts.makeChart("demoThree", {
        "type": "serial",
        "theme": "light",
        "marginRight":80,
        "autoMarginOffset":20,
        "dataDateFormat": "YYYY-MM-DD HH:NN",
        "dataProvider": [ {
            "date": "2012-01-02",
            "color":"#CC0000",
            "value": 10
        }, {
            "date": "2012-01-03",
            "value": 12
        }, {
            "date": "2012-01-04",
            "value": 14
        }, {
            "date": "2012-01-05",
            "value": 11
        }, {
            "date": "2012-01-06",
            "value": 6
        }, {
            "date": "2012-01-07",
            "value": 7
        }, {
            "date": "2012-01-08",
            "value": 9
        }, {
            "date": "2012-01-09",
            "value": 13
        }, {
            "date": "2012-01-10",
            "value": 15
        }, {
            "date": "2012-01-11",
            "color":"#CC0000",
            "value": 19
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "guides": [{
                "fillAlpha": 0.1,
                "fillColor": "#888888",
                "lineAlpha": 0,
                "toValue": 16,
                "value": 10
            }],
            "position": "left",
            "tickLength": 0
        }],
        "graphs": [{
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>value:[[value]]</span></b>",
            "bullet": "round",
            "dashLength": 3,
            "colorField":"color",
            "valueField": "value"
        }],
        "trendLines": [{
            "finalDate": "2012-01-11 12",
            "finalValue": 19,
            "initialDate": "2012-01-02 12",
            "initialValue": 10,
            "lineColor": "#CC0000"
        }, {
            "finalDate": "2012-01-22 12",
            "finalValue": 10,
            "initialDate": "2012-01-17 12",
            "initialValue": 16,
            "lineColor": "#CC0000"
        }],
        "chartScrollbar": {
            "scrollbarHeight":2,
            "offset":-1,
            "backgroundAlpha":0.1,
            "backgroundColor":"#888888",
            "selectedBackgroundColor":"#67b7dc",
            "selectedBackgroundAlpha":1
        },
        "chartCursor": {
            "fullWidth":true,
            "valueLineEabled":true,
            "valueLineBalloonEnabled":true,
            "valueLineAlpha":0.5,
            "cursorAlpha":0
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisAlpha": 0,
            "gridAlpha": 0.1,
            "minorGridAlpha": 0.1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
    });

    chart.addListener("dataUpdated", zoomChart);

    function zoomChart(){
        chart.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
    }
});

sensorcloud.controller('loginController', function($scope, $routeParams, $http) {
    $scope.login = function() {
        window.location = "#/home";
    };
});

sensorcloud.controller('signupController', function($scope, $routeParams, $http) {
    $scope.signup = function() {
        window.location = "#/home";
    };
});

sensorcloud.controller('homeController', function($scope, $routeParams, $http) {
    var amsterdam1=new google.maps.LatLng(40.293210, -121.939071);
    var amsterdam2=new google.maps.LatLng(36.8502863, -119.8259927);
    var amsterdam3=new google.maps.LatLng(33.7648594, -116.1897527);
    function initialize()
    {
        var mapProp = {
            center:amsterdam2,
            zoom:5,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("googleMap2"),mapProp);

        var myCity1 = new google.maps.Circle({
            center:amsterdam1,
            radius:210000,
            strokeColor:"#0000FF",
            strokeOpacity:0.8,
            strokeWeight:2,
            fillColor:"#0000FF",
            fillOpacity:0.4
        });

        var myCity2 = new google.maps.Circle({
            center:amsterdam2,
            radius:240000,
            strokeColor:"#0000FF",
            strokeOpacity:0.8,
            strokeWeight:2,
            fillColor:"#0000FF",
            fillOpacity:0.4
        });

        var myCity3 = new google.maps.Circle({
            center:amsterdam3,
            radius:270000,
            strokeColor:"#0000FF",
            strokeOpacity:0.8,
            strokeWeight:2,
            fillColor:"#0000FF",
            fillOpacity:0.4
        });

        myCity1.setMap(map);
        myCity2.setMap(map);
        myCity3.setMap(map);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});

sensorcloud.controller('sensorController', function($scope, $routeParams, $http) {
    var chartData = generateChartData();

    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
        "marginRight": 80,
        "dataProvider": chartData,
        "valueAxes": [{
            "position": "left",
            "title": "Unique visitors"
        }],
        "graphs": [{
            "id": "g1",
            "fillAlphas": 0.4,
            "valueField": "visits",
            "balloonText": "<div style='margin:5px; font-size:19px;'>Visits:<b>[[value]]</b></div>"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount": true,
            "color": "#AAAAAA"
        },
        "chartCursor": {
            "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
            "cursorPosition": "mouse"
        },
        "categoryField": "date",
        "categoryAxis": {
            "minPeriod": "mm",
            "parseDates": true
        },
        "export": {
            "enabled": true,
            "dateFormat": "YYYY-MM-DD HH:NN:SS"
        }
    });

    chart.addListener("dataUpdated", zoomChart);
// when we apply theme, the dataUpdated event is fired even before we add listener, so
// we need to call zoomChart here
    zoomChart();
// this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 250, chartData.length - 100);
    }

// generate some random data, quite different range
    function generateChartData() {
        var chartData = [];
        // current date
        var firstDate = new Date();
        // now set 500 minutes back
        firstDate.setMinutes(firstDate.getDate() - 1000);

        // and generate 500 data items
        for (var i = 0; i < 500; i++) {
            var newDate = new Date(firstDate);
            // each time we add one minute
            newDate.setMinutes(newDate.getMinutes() + i);
            // some random number
            var visits = Math.round(Math.random() * 40 + 10 + i + Math.random() * i / 5);
            // add data item to the array
            chartData.push({
                date: newDate,
                visits: visits
            });
        }
        return chartData;
    }
});
