(function() {
    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);

    //DashboardController.$inject = ['HelperService'];

    /* @ngInject */
    function DashboardController() {
        var vm = this;

        //vm.users = usersPrepService;

        vm.getUsers = getUsers;

        activate();

        //////////////

        function activate() {
            vm.page_title = "Dashboard";
        }

        function setPageTitle(title) {
            HelperService.setPageTitle(title);
        }

        function getUsers() {
            // return UserService.getUsers().then(function(data) {
            //     vm.users = data;
            //     return vm.users;
            // });
        }
    }
})();