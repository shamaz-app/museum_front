/**
 * Created by shamaz on 09.05.2016.
 */

var app = angular.module('museum', ['ngRoute', 'ngCookies', 'museum.services', 'museum.directives', 'flow', 'angularUtils.directives.dirPagination']);
var services = angular.module('museum.services', []);
var directives = angular.module('museum.directives', []);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/welcome'
            })
            .when('/welcome', {
                templateUrl: '../app/layouts/welcome.html',
                uri: '/welcome'
            })
            .when('/showpieces', {
                templateUrl: '../app/layouts/showpiecesTemplate.html',
                controller: 'showpieceController',
                uri: '/showpieces/'
            })
            .when('/museum', {
                templateUrl: '../app/layouts/museum.html',
                controller: 'museumController',
                uri: '/museums/'
            })
            .when('/museumPage/', {
                templateUrl: '../app/layouts/museumPage.html',
                controller: 'museumPageController',
                uri: '/museumPage'
            })
            .when('/museumPage/:museumId', {
                templateUrl: '../app/layouts/museumPage.html',
                controller: 'museumPageController',
                uri: '/museumPage'
            })
            .when('/404', {
                templateUrl: '../app/layouts/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });

    }])

