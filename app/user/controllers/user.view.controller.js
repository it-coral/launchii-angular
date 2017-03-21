(function() {
    'use strict';

    angular.module('app.users')
        .controller('UserViewController', UserViewController);

    UserViewController.$inject = ['UserService', '$stateParams', 'prepSelUser', 'HelperService'];

    /* @ngInject */
    function UserViewController(UserService, $stateParams, prepSelUser, HelperService) {
        var vm = this;

        vm.mode = "View";
        vm.response = {};
        vm.userId = $stateParams.id;
        vm.user = prepSelUser;
        vm.isDone = false;
        vm.prevState = HelperService.getPrevState();

        //activate();

        ///////////////////

        function activate() {
            DealService.find(vm.dealId).then(function(data) {
                vm.deal = data;
            });
        }
    }
})();