/**
 * Created by Анастасия on 13.05.2016.
 */

'use strict';

app.controller('museumController', ['$scope', '$http', function ($scope, $http) {

    $http.get(serverUrl + '/museum').success(function (data, status) {
        $scope.museums =  data;
    });

    $scope.haveImageUrl = function (item) {
        if (item !== undefined && item.imageUrl !== undefined && item.imageUrl !== null){
            return true;
        }
        return false;
    }
}]);
