/**
 * Created by shamaz on 09.05.2016.
 */

var app = angular.module('museum', ['ngRoute', 'ngCookies', 'museum.services', 'museum.directives', 'flow']);
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
            .when('/404', {
                templateUrl: '../app/layouts/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });

    }])

