/**
 * Created by shamaz on 15.05.2016.
 */


'use strict';

services
    .factory('globalService', ['$http', function ($http) {

        return {
            getCities: function () {
                return $http.get(serverUrl + '/city').success(function (data, status) {
                    return data;
                })
            },

            getMuseums: function (cityId) {
                if (cityId !== undefined) {
                    return $http.get(serverUrl + '/museum/cityId/' + cityId).success(function (data, status) {
                        return data;
                    });
                } else {
                    return $http.get(serverUrl + '/museum').success(function (data, status) {
                        return data;
                    });
                }
            }
        };
    }]);