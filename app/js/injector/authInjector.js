


services
    .factory('authInjector', ['securityService', 'authService', function(securityService, authService) {

        return {
            request: function (config) {
                var requestOnAuthUrl = config.url.indexOf(serverUrl + '/login') !== -1;
                if (securityService.isAuthenticated() && !requestOnAuthUrl) {
                    config.headers['Authorization'] = securityService.getAccessToken();
                }
                return config;
            },
            'responseError': function(rejection) {
                var requestOnAuthUrl = rejection.config.url.indexOf(serverUrl + '/login') !== -1;
                if (rejection.status == 401 && !requestOnAuthUrl) {
                    authService.refresh();
                }
                return {};
            }
        };
    }]);