/**
 * Created by shamaz on 11.05.2016.
 */

'use strict';

var itemTemplate = {};

app.controller('showpieceController', ['$scope', '$http', function ($scope, $http) {

    $http.get('http://localhost:8182/showpieces').success(function (data) {
        $scope.showpieces = data;
    });

    $scope.showrooms = [];
    $scope.stateTypes = [];
    $scope.thematicSections = [];
    $scope.originSources = [];

    $scope.showpieceDescriptionToString = function (showpiece) {
        var result = '';
        if (showpiece !== null && showpiece !== undefined) {
            if (showpiece.age !== null && showpiece.age !== undefined) {
                result += 'Возраст: ' + showpiece.age + 'лет, ';
            }
            result += "Тематика: " + showpiece.thematicSection.name + ", ";
            result += "Происхождение: " + showpiece.originSource.name;

            if (showpiece.originSource.note !== undefined && showpiece.originSource.note.length > 0) {
                result += "(" + showpiece.originSource.note + "), "
            } else {
                result += ", "
            }

            result += "Состояние: " + showpiece.state.stateType.name + "(" + showpiece.state.description + "), ";
            result += "Нужда в реставрации: ";

            if (showpiece.state.isNeedRestoration) {
                result += "да";
            } else {
                result += "нет"
            }
        }
        return result;
    };

    $scope.addOrEdit = false;

    $scope.onActionAddOrEditItem = function (item) {
        $scope.addOrEdit = true;
        if (item !== undefined) {
            $scope.item = item;
        } else {
            $scope.item = itemTemplate;
        }
    };

    var httpRequest = $http.get(serverUrl + '/showroom/').success(function (data, status) {
        $scope.showrooms = data;
    });
    var httpRequest = $http.get(serverUrl + '/stateType/').success(function (data, status) {
        $scope.stateTypes = data;
    });

    var httpRequest = $http.get(serverUrl + '/thematicSection/').success(function (data, status) {
        $scope.thematicSections = data;
    });
    var httpRequest = $http.get(serverUrl + '/originSource/').success(function (data, status) {
        $scope.originSources = data;
    });

    $scope.haveImageUrl = function (showpiece) {
        if (showpiece.imageUrl !== undefined && showpiece.imageUrl !== null){
            return true;
        }
        return false;
    }

    $scope.submitItem = function (itemForPut) {
        var c = document.getElementById("image");
        if (c != null && c.src.length > 100){
            delete $scope.item.imageUrl;
            $scope.item.image = c.src;
        }
        itemForPut.user = null;
        var httpRequest = $http.put(serverUrl + '/showpieces/', itemForPut).success(function (data, status) {
            $scope.backToShowpieces();
        });
    };

    $scope.deleteItem = function (itemForDelete) {
        if (confirm('Вы действительно хотите удалить ' + itemForDelete.name + '?')) {
            var httpRequest = $http.delete(serverUrl + '/showpieces/' + itemForDelete.id, itemForDelete).success(function (data, status) {
                $http.get(serverUrl + '/showpieces').success(function (data) {
                    $scope.showpieces = data;
                });
            });
        }
    }

    $scope.backToShowpieces = function () {
        $scope.item = itemTemplate;
        $scope.addOrEdit = false;
    }
}]);