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

    $scope.haveImageUrl = function (item) {
        if (item !== undefined && item.imageUrl !== undefined && item.imageUrl !== null) {
            return true;
        }
        return false;
    };

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
    };

    $scope.museumContactsToString = function () {
        var result = '';
        if ($scope.museum !== undefined && $scope.museum.contacts !== undefined) {
            $scope.museum.contacts.forEach(function(contact, i, arr) {
                result += contact.contactType.name + ' ' + contact.contact;
                if (arr[i+1] !== undefined) {
                    result += '; '
                }
            });
        }
        if (result == '') {
            return '-';
        }
        return result;
    };

    $scope.submitItem = function (itemForPut) {
        var c = document.getElementById("image");
        if (c != null && c.src.length > 100){
            delete itemForPut.imageUrl;
            itemForPut.image = c.src;
        }
        itemForPut.user = null;
        var httpRequest = $http.put(serverUrl + '/museum/', itemForPut).success(function (data, status) {
            $scope.backToMuseum();
        });
    };

    $scope.backToMuseum = function () {
        window.location.href = "#/museum";
    };
}]);
