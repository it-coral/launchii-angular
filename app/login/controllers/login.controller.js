(function() {
    'use strict';

    angular.module('app.auth')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$state', '$rootScope'];

    /* @ngInject */
    function LoginController(AuthService, $state, $rootScope) {
        var vm = this;

        //vm.email = "";
        //vm.password = "";
        vm.form;
        vm.login = login;
        vm.loggingIn = false;

        activate();

        ///////////

        function activate() {
            $rootScope.authenticated = AuthService.isAuthenticated();
            $rootScope.hasLoginView = true;
        }

        function login() {
            vm.loggingIn = true;
            AuthService.login(vm.form).then(function(response) {

                vm.loggingIn = false;
                if ($rootScope.authenticated) {
                    $state.go('dashboard');
                }

            }).catch(function(error) {
                vm.loggingIn = false;
                vm.loginError = true;
                vm.loginErrorText = error.data.errors[0];
            });
        }
    }
})();