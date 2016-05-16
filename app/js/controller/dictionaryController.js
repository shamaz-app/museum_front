/**
 * Created by shamaz on 14.05.2016.
 */

'use strict';

app.controller('dictionaryController', ['$scope', '$http', function ($scope, $http) {

    $scope.originSourceUrl = '/originSource/';
    $scope.thematicSectionUrl = '/thematicSection/';

    $scope.loadOriginSources = function () {
        $http.get(serverUrl + '/originSource').success(function (data, status) {
            $scope.originSources = data;
        });
    }

    $scope.loadThematicSections = function () {
        $http.get(serverUrl + '/thematicSection').success(function (data, status) {
            $scope.thematicSections = data;
        });
    }

    $scope.originSourceMode = false;
    $scope.item = {};

    $scope.onActionAddOrEditItem = function (item) {
        if (item !== undefined) {
            $scope.item = item;
        } else {
            $scope.item = {};
        }
        $scope.mode = true;
    };

    $scope.backToTable = function () {
        $scope.item = {};
        $scope.mode = false;
    }

    $scope.submitItem = function (item, url) {
        var httpRequest = $http.put(serverUrl + url, item).success(function (data, status) {
            $scope.backToTable();
            url == $scope.originSourceUrl ? $scope.loadOriginSources() : $scope.thematicSectionUrl ? $scope.loadThematicSections() : '';
        });
    }

    $scope.deleteItem = function (itemForDelete, url) {
        if (confirm('Вы действительно хотите удалить ' + itemForDelete.name + '?')) {
            var httpRequest = $http.delete(serverUrl + url + itemForDelete.id, itemForDelete).success(function (data, status) {
                $http.get(serverUrl + '/originSource').success(function (data, status) {
                    $scope.originSources = data;
                });
            });
        }
    }

    $scope.openTab = function (tabName) {
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tabName == "originSourceTab" ? $scope.loadOriginSources() : tabName == "thematicSectionTab" ? $scope.loadThematicSections() : '';
        $scope.mode = false;
        document.getElementById(tabName).style.display = "block";
    };

    $scope.openTab("originSourceTab");

    $scope.filterFunction = function (city, museum) {
        return
    }
}]);
