angular.module('F1FeederApp.services', []).
  factory('ergastAPIservice', function($http) {

    var ergastAPI = {};
    

    ergastAPI.getDrivers = function(year) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/'+year+'/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverDetails = function(id) {
      return $http ({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/2013/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverRaces = function(year, id) {
      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/'+ year +'/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getSeason = function(id) {
      var url = 'http://ergast.com/api/f1/seasons.json?limit=1000&callback=JSON_CALLBACK';
      if(id != undefined){
        url = 'http://ergast.com/api/f1/drivers/' + id + '/seasons.json?limit=1000&callback=JSON_CALLBACK';
      }
      return $http({
        method: 'JSONP',
        url: url
      });
    }

      return ergastAPI;
  });