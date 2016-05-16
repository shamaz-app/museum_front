/**
 * Created by Анастасия on 13.05.2016.
 */

services.factory('museumService', ['$http', function ($http) {
        return {
            getAllMuseums: function () {
                return $http.get(serverUrl + '/museum').success(function (data, status) {
                    return data;
                })
            },
            getMuseumByCityId: function(cityId) {
                return $http.get(serverUrl + '/museum/', cityId).success(function (data, status) {
                    return data;
                })
            }
        };

    }]);