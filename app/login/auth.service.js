(function() {
    'use strict';

    angular.module('app.auth', [])
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$auth', '$rootScope', '$http', '$q', '$injector', '$state', 'CONST'];

    /* @ngInject */
    function AuthService($auth, $rootScope, $http, $q, $injector, $state, CONST) {
        var api = CONST.api_domain;

        var service = {
            login: login,
            errors: [],
            isAuthenticated: isAuthenticated,
            createAuthUser: createAuthUser,
            destroyAuthUser: destroyAuthUser,
            getAuthUser: getAuthUser,
            logout: logout,
            setHeaders: setHeaders,
            removeUserStorage: removeUserStorage,
            redirectIfUnauthorized: redirectIfUnauthorized
        }

        return service;

        ////////////////

        function logout() {
            $auth.logout().then(function() {
                destroyAuthUser().then(function() {
                    $state.go('auth');
                }).catch(function() {
                    console.error("Can't logout user. Something went wrong.");
                });
            });
        }

        function login(credentials) {
            $rootScope.loginError = null;
            var d = $q.defer();

            // var credentials = {
            //     email: email,
            //     password: password
            // }

            // $auth.submitLogin(credentials).then(function(response) {
            //     $log.log(response);
            //     if (typeof response === 'undefined' || response === false) {
            //         d.reject();
            //     } else {
            //         var user = JSON.stringify(response.data.user);

            //         localStorage.setItem('user', user);
            //         $rootScope.authenticated = true;
            //         $rootScope.currentUser = response.data.user;

            //         d.resolve(response);
            //     }
            // }).catch(function(err) {
            //     $log.log(err);
            //     service.errors = err.errors;
            //     d.reject(service.errors);
            //     //throw (service.errors);
            //     d.reject();
            // });


            $auth.login(credentials).then(function(data) {
                if (angular.isDefined(data)) {
                    var headers = data.headers();

                    $auth.setToken(headers["access-token"]);
                    localStorage.setItem("client", headers["client"]);
                    localStorage.setItem("access-token", headers["access-token"]);
                    localStorage.setItem("cache-control", headers["cache-control"]);
                    localStorage.setItem("content-type", headers["content-type"]);
                    localStorage.setItem("expiry", headers["expiry"]);
                    localStorage.setItem("token-type", headers["token-type"]);
                    localStorage.setItem("uid", headers["uid"]);

                    $rootScope.$broadcast('authorized');

                    var user = JSON.stringify(data.data.user);

                    localStorage.setItem('user', user);
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = data.data.user;

                    d.resolve(data);
                } else {
                    d.reject(data);
                }
            }).catch(function(err) {
                d.reject(err);
            });

            // $auth.login(credentials).then(function(r) {
            //     $log.log(r);
            // }).catch(function(e) {
            //     $log.log(e)
            // });

            return d.promise;
        }

        function isAuthenticated() {
            // var d = $q.defer();
            // //var $state = $injector.get('$state');
            // if ($auth.isAuthenticated()) {
            //     //if ($auth.validateUser()) {
            //     d.resolve();
            // } else {
            //     d.reject();
            //     //$state.go('auth');
            // }

            // return d.promise;
            return $auth.isAuthenticated();
        }

        function createAuthUser() {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user && $auth.isAuthenticated()) {
                $rootScope.authenticated = true;
                $rootScope.currentUser = user;
            }
        }

        function destroyAuthUser() {
            var d = $q.defer();

            if (typeof $rootScope.currentUser != 'undefined' && $rootScope.currentUser != null) {
                var url = api + '/auth/sign_out';
                var client = localStorage.getItem('client');
                var uid = $rootScope.currentUser.email;
                var token = localStorage.getItem('access-token');

                var params = {};
                params['uid'] = uid;
                params['access-token'] = token;
                params['client'] = client;

                var data = { params };

                $http.delete(url, data)
                    .then(function(resp) {
                        removeUserStorage();
                        d.resolve(true);

                    }).catch(function(error) {
                        $log.log(error);
                        d.reject(false);
                    });
            }

            d.resolve(true);

            return d.promise;
        }

        function removeUserStorage() {
            $auth.logout();
            localStorage.clear();
            // localStorage.removeItem('user');
            // localStorage.removeItem('client');
            // localStorage.removeItem('access-token');
            $rootScope.authenticated = false;
            $rootScope.currentUser = null;
        }

        function getAuthUser() {
            if (service.isAuthenticated) {
                return JSON.parse(localStorage.getItem('user'));
            }

            return null;
        }

        function setHeaders() {
            var headers = {};

            if (localStorage.getItem("access-token") !== null) {
                headers["access-token"] = localStorage.getItem("access-token");
                headers["client"] = localStorage.getItem("client");
                headers["cache-control"] = localStorage.getItem("cache-control");
                headers["content-type"] = localStorage.getItem("content-type");
                headers["expiry"] = localStorage.getItem("expiry");
                headers["token-type"] = localStorage.getItem("token-type");
                headers["uid"] = localStorage.getItem("uid");
            }

            $http.defaults.headers.common = headers;
        }

        function redirectIfUnauthorized(event, toState, ngProgressLite) {

            //if (localStorage.getItem('user') != 'undefined') {
            //var user = JSON.parse(localStorage.getItem('user'));
            if ($auth.isAuthenticated() && toState.name === "auth") {
                event.preventDefault();
                $log.log('11111111');
                $state.go('dashboard');
                return false;
            } else if (!$auth.isAuthenticated() && toState.name === "auth") {
                ngProgressLite.done();
                event.preventDefault();
                $log.log('22222222');
                $state.go('auth');
                return false;
            } else if (!$auth.isAuthenticated() && toState.name !== "auth") {
                event.preventDefault();
                $log.log(toState.name);
                $log.log('00000000');
                $state.go('auth');
                return false;
            }
            //}
            event.preventDefault();
            $log.log('test');
            $state.go(toState.name);
            return true;
        }
    }

})();