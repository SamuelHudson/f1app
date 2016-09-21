'use strict';

// Declare app level module which depends on views, and components
angular.module('F1FeederApp', [
  'ngRoute',

  'F1FeederApp.controllers',
  'F1FeederApp.services'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.
  	when("/drivers", {templateUrl: "partials/drivers.html", controller: "driversController", reloadOnSearch: false}).
	when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController", reloadOnSearch: false}).
	otherwise({redirectTo: '/drivers'});
}])