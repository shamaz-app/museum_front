/**
 * Created by shamaz on 15.05.2016.
 */

services
    .factory('securityService', [function () {

        return {
            isAuthenticated: function () {
                return sessionStorage.getItem('access_token') !== null
                    ? sessionStorage.getItem('access_token') !== ''
                    : false;
            },

            getAccessToken: function () {
                return 'Bearer ' + sessionStorage.getItem('access_token');
            },

            getRefreshToken: function () {
                return sessionStorage.getItem('refresh_token');
            },

            hasRole: function (museumId) {
                var museums = JSON.parse(sessionStorage.getItem('authorities'));
                if (museums !== null && museumId !== null && museumId !== undefined) {
                    return museums.indexOf(museumId) !== -1;
                }
                return false;
            }
        }
    }]);