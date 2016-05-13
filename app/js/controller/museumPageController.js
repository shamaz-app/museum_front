/**
 * Created by Анастасия on 13.05.2016.
 */


'use strict';

app.controller('museumPageController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {


    $scope.init = function () {
        $scope.museumId = $routeParams.museumId;
        if ($scope.museumId != null) {
            $http.get(serverUrl + '/museum/' + $scope.museumId).success(function (data, status) {
                $scope.museum = data;
            });
        }
    };

    $scope.init();

    $scope.haveImageUrl = function (item) {
        if (item !== undefined && item.imageUrl !== undefined && item.imageUrl !== null) {
            return true;
        }
        return false;
    }

    $scope.museumAddressToString = function () {
        var result = '';
        if ($scope.museum !== undefined) {
            result += $scope.museum.street.city.country.name;
            result += ', ' + $scope.museum.street.city.cityType.abbrev + ' ' + $scope.museum.street.city.name;
            result += ', ' + $scope.museum.street.streetType.abbrev + ' ' + $scope.museum.street.name;
            if ($scope.museum.houseNumber !== undefined && $scope.museum.houseNumber.length > 0) {
                result += ' ' + $scope.museum.houseNumber;
            }
        }
        return result;
    }
}]);
