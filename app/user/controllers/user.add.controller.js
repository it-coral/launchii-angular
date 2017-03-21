(function() {
    'use strict';

    angular.module('app.users')
        .controller('UserAddController', UserAddController);

    UserAddController.$inject = ['UserService', '$scope', 'HelperService', '$state'];

    /* @ngInject */
    function UserAddController(UserService, $scope, HelperService, $state) {
        var vm = this;

        vm.mode = "Add";
        vm.response = {};
        vm.form = {};
        vm.defaultRole = 'admin';
        vm.defaultStatus = 'active';
        vm.isDone = true;

        vm.prevState = HelperService.getPrevState();
        vm.submitAction = addPost;

        //activate();

        ///////////////////

        function activate() {
            UserService.find(vm.userId).then(function(data) {
                vm.selectedUser = data;
                vm.form = vm.selectedUser;
            });
        }

        function addPost() {
            vm.isDone = false;
            // $log.log(vm.form);
            // return false;
            UserService.add(vm.form).then(function() {
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Updated user: " + vm.form.name;
                vm.isDone = true;

                $scope.$parent.vm.isDone = true;
                $scope.$parent.vm.response = vm.response;
                $scope.$parent.vm.getUsers();
                $state.go(vm.prevState);

            }).catch(function(err) {
                $log.log(err);
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to update User.";
                vm.isDone = true;

                $scope.$parent.vm.isDone = true;
                HelperService.goToAnchor('msg-info');
            });
        }
    }
})();