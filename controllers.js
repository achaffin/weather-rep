//controllers
weatherApp.controller('homeController', ['$scope', 'cityService', 'dayService', '$location', function($scope, cityService, dayService, $location){
    
    $scope.city = cityService.city;
    
    $scope.days = dayService.days;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
    
    $scope.$watch('days', function(){
        dayService.days = $scope.days;
    })
    
    $scope.submit = function(){
        $location.path('/forecast');
    }
    
}]);

weatherApp.controller('forecastController',['$scope', '$resource', '$routeParams', 'cityService', 'dayService', function($scope, $resource, $routeParams, cityService, dayService){
    
    $scope.city = cityService.city;
    
    $scope.days = dayService.days;
    
    $scope.weatherAPI=$resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=ff589719ad0806c9271ce6dc0ffe4548',{callback:'JSON_CALLBACK'},{get: {method:'JSONP'}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt: $scope.days});
    
    //$scope.description = $scope.weatherResult(weather[0].main);
    
    console.log($scope.weatherResult);
    
    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8*(degK-273))+32);
    }
    
    $scope.convertToDate = function(dt){
        return new Date(dt*1000);
    }
    
}]);
