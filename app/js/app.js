/**
 * Created by shamaz on 09.05.2016.
 */

var app = angular.module('museum', ['ngRoute', 'ngCookies', 'museum.services', 'museum.directives', 'flow',
    'angularUtils.directives.dirPagination']);

var services = angular.module('museum.services', []);
var directives = angular.module('museum.directives', []);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/welcome'
            })
            .when('/login', {
                templateUrl: '../app/layouts/login.html',
                controller: 'loginController',
                uri: '/login/'
            })
            .when('/welcome', {
                templateUrl: '../app/layouts/welcome.html',
                uri: '/welcome'
            })
            .when('/showpiece/:showpieceId', {
                templateUrl: '../app/layouts/showpiecePage.html',
                controller: 'showpiecePageController',
                uri: '/showpiece/'
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
            .when('/showroom/', {
                templateUrl: '../app/layouts/showrooms.html',
                controller: 'showroomController'
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
            .when('/dictionaries', {
                templateUrl: '../app/layouts/dictionaries.html',
                controller: 'dictionaryController',
                uri: '/dictionaries'
            })
            .when('/404', {
                templateUrl: '../app/layouts/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });

    }])
    .run(['$rootScope', '$location', 'securityService', function ($rootScope, $location, securityService) {

        $rootScope.$on("$routeChangeStart", function (event, next) {
            if (next.requires && next.requires.login) {
                if (!securityService.isAuthenticated()) {
                    $location.path('/login');
                }
                if (next.requires.museum && !securityService.hasRole(next.requires.museum)) {
                    $location.path('/404');
                }
            }
        });
    }]);

