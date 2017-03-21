(function() {
    'use strict';

    angular.module('app.users')
        .controller('UserEditController', UserEditController);

    UserEditController.$inject = ['UserService', '$stateParams', '$scope', 'prepSelUser', 'HelperService', '$state'];

    /* @ngInject */
    function UserEditController(UserService, $stateParams, $scope, prepSelUser, HelperService, $state) {
        var vm = this;

        vm.mode = "Edit";
        vm.response = {};
        vm.userId = $stateParams.id;
        vm.selectedUser = prepSelUser;
        vm.form = vm.selectedUser;
        vm.defaultRole = vm.selectedUser.role;
        vm.defaultStatus = vm.selectedUser.is_active ? 'active' : 'inactive';
        vm.isDone = true;

        vm.prevState = HelperService.getPrevState();
        vm.submitAction = editPost;

        //activate();

        ///////////////////

        function activate() {
            UserService.find(vm.userId).then(function(data) {
                vm.selectedUser = data;
                vm.form = vm.selectedUser;
            });
        }

        function editPost() {
            vm.isDone = false;
            // $log.log(vm.form);
            // return false;
            UserService.edit(vm.userId, vm.form).then(function() {
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