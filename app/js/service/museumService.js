/**
 * Created by Анастасия on 13.05.2016.
 */

services.factory('museumService', ['$http', function ($http) {
        return {
            submitItem: function (itemForPut) {
                var c = document.getElementById("image");
                if (c != null && c.src.length > 100){
                    delete itemForPut.imageUrl;
                    itemForPut.image = c.src;
                }
                itemForPut.user = null;
                return $http.put(serverUrl + '/museum/', itemForPut).success(function (data, status) {
                    return data;
                });
            },

            getAllMuseums : function () {
                return $http.get(serverUrl + '/museum').success(function (data, status) {
                    return data;
                });
            },

            getContactTypes : function () {
                return $http.get(serverUrl + '/contactType').success(function (data, status) {
                    return data;
                });
            },

            getCountries : function () {
                return $http.get(serverUrl + '/country').success(function (data, status) {
                    return data;
                });
            },

            getCities : function (countryId) {
                if (countryId !== undefined) {
                    return $http.get(serverUrl + '/city/countryId/' + countryId).success(function (data, status) {
                        return data;
                    });
                } else {
                    return $http.get(serverUrl + '/city').success(function (data, status) {
                        return data;
                    });
                }
            },

            getStreets : function (cityId) {
                if (cityId !== undefined) {
                    return $http.get(serverUrl + '/street/cityId/' + cityId).success(function (data, status) {
                        return data;
                    });
                } else {
                    return $http.get(serverUrl + '/street').success(function (data, status) {
                        return data;
                    });
                }
            }
        };

    }]);