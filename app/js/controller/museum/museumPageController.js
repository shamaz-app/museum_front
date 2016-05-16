/**
 * Created by Анастасия on 13.05.2016.
 */


'use strict';

app.controller('museumPageController', ['$scope', '$http', '$routeParams', 'museumService', function ($scope, $http, $routeParams, museumService) {


    $scope.addOrEditContactMode = false;
    $scope.editAddressMode = false;

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

    $scope.onActionEditAddress = function () {
        if ($scope.museum !== undefined) {
            museumService.getCountries().success(function (data, status) {
                $scope.countries = data;
            });
            museumService.getCities().success(function (data, status) {
                $scope.cities = data;
            });
            museumService.getStreets().success(function (data, status) {
                $scope.streets = data;
            });
            $scope.addressEdit = {};
            $scope.addressEdit.country = $scope.museum.street.city.country;
            $scope.addressEdit.city = $scope.museum.street.city;
            $scope.addressEdit.street = $scope.museum.street;
            $scope.editAddressMode = true;
        }
    };

    $scope.changeCountry = function () {
        museumService.getCities($scope.addressEdit.country.id).success(function (data, status) {
            $scope.cities = data;
        });
    };

    $scope.changeCity = function () {
        museumService.getStreets($scope.addressEdit.city.id).success(function (data, status) {
            $scope.streets = data;
        });
    };

    $scope.submitAddress = function () {
        $scope.museum.street = $scope.addressEdit.street;
        $scope.editAddressMode = false;
    };

    $scope.museumContactToString = function (contact) {
        if (contact !== undefined) {
            return contact.contactType.name + ': ' + contact.contact;
        } else {
            return '-';
        }
    };

    $scope.addOrEditContact = function (item) {
        $scope.addOrEditContactMode = true;
        if (item !== undefined) {
            $scope.contact = item;
        } else {
            $scope.contact = {};
        }
        museumService.getContactTypes().success(function (data, status) {
            $scope.contactTypes = data;
        });
    };

    $scope.deleteContact = function (item) {
        if (item !== undefined) {
            $scope.museum.contacts.forEach(function (contact, i, arr) {
                if (item.id == contact.id) {
                    $scope.museum.contacts.splice(i, 1);
                }
            });
        }
    };


    $scope.submitContact = function (item) {
        if (item === undefined) {
            $scope.addOrEditContactMode = false;
        } else {
            if (item.id !== undefined) {
                $scope.museum.contacts.forEach(function (contact, i, arr) {
                    if (item.id == contact.id) {
                        $scope.museum.contacts[i].contact = item.contact;
                        $scope.museum.contacts[i].contactType = item.contactType;
                    }
                });

                $scope.addOrEditContactMode = false;
            } else {
                $scope.museum.contacts.push(item);

                $scope.addOrEditContactMode = false;
            }
        }
    };

    $scope.submitItem = function (itemForPut) {
        museumService.submitItem(itemForPut).success(function (data, status) {
            museumService.getAllMuseums().success(function (data, status) {
                $scope.museums = data;
                $scope.backToMuseum();
            });
        });
    };

    $scope.backToMuseum = function () {
        window.location.href = "#/museum";
    };
}]);
