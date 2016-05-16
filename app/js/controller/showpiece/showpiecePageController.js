/**
 * Created by shamaz on 15.05.2016.
 */

'use strict';

app.controller('showpiecePageController', ['$scope', '$http', function ($scope, $http) {

    $scope.init = function () {
        $scope.showpieceId = $routeParams.showpieceId;
        if ($scope.showpieceId != null) {
            $http.get(serverUrl + '/showpiece/' + $scope.showpieceId).success(function (data, status) {
                $scope.showpiece = data;
            });
        }
    };



}]);