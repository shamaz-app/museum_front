/**
 * Created by shamaz on 15.05.2016.
 */


'use strict';

app.controller('globalController', ['$scope', '$http', 'globalService', function ($scope, $http, globalService) {

    var http = $http.get(serverUrl + '/city').success(function (data, status) {
        $scope.cities = data;
    });


    $scope.refreshMuseums = function (cityId) {
        if (cityId !== undefined) {
            $http.get(serverUrl + '/museum/cityId/' + cityId).success(function (data, status) {
                $scope.museums = data;
            });
        } else {
            $http.get(serverUrl + '/museum').success(function (data, status) {
                $scope.museums = data;
            });
        }
    }

    var http = $http.get(serverUrl + '/museum').success(function (data, status) {

        $scope.museums = data;
    });
    $scope.selectedMuseum = {};

    $scope.changeCity = function () {
        $scope.refreshMuseums($scope.selectedCity.id);
    };
}]);