angular.module('F1FeederApp.controllers', []).

controller('driversController', function($scope, $location, ergastAPIservice) {
    $scope.SelectedYear = $location.search().targetYear;
    $scope.nameFilter = "";
    $scope.driversList = [];
    $scope.init = function () {
        if ($scope.SelectedYear != null) {
            getDriversData($scope.SelectedYear)
        };        
    };

    $scope.navDriver = function (driver) {
        // /drivers/{{driver.Driver.driverId}}
        $location.path('/drivers/' + driver.Driver.driverId);
    };

    $scope.searchFilter = function (driver) {
        var keyword = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };    

    
    function getDriversData(year){
        ergastAPIservice.getDrivers(year).success(function(response) {
            $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });
    };

    $scope.onUpdateOfYear = function(_year){
        $location.search('targetYear', _year);
        getDriversData(_year);

    };
}).

controller('driverController', function($scope, $routeParams, $location, ergastAPIservice) {
    $scope.SelectedYear = $location.search().targetYear;
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;
    $scope.init = function () {
        if ($scope.SelectedYear != null) {
            getRaces($scope.SelectedYear)
        }; 

        ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
    });       
    };

    

    function getRaces (year) {
        ergastAPIservice.getDriverRaces(year, $scope.id).success(function(response) {
            $scope.races = response.MRData.RaceTable.Races;
        });
    };

    $scope.onUpdateOfYear = function(_year){
        getRaces(_year);
    };
}).

controller('seasonController', function($scope, $routeParams, ergastAPIservice){
    $scope.init = function(){
        $scope.seasons = [];
        ergastAPIservice.getSeason($routeParams.id).success(function (response) {
            $scope.seasons = response.MRData.SeasonTable.Seasons;
        });
    };


});