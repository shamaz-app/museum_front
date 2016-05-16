/**
 * Created by shamaz on 15.05.2016.
 */


'use strict';

app.controller('globalController', ['$scope', '$http', 'globalService', function ($scope, $http, globalService) {

    globalService.getCities().success(function (data, status) {
        $scope.cities = data;
    });

    $scope.refreshMuseums = function (cityId) {
        globalService.getMuseums(cityId).success(function (data, status) {
            $scope.museums = data;
        });
    }

    $scope.refreshMuseums();

    $scope.selectedMuseum = {};

    $scope.changeCity = function () {
        $scope.refreshMuseums($scope.selectedCity.id);
    };
}]);