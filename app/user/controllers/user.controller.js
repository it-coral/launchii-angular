(function() {
    'use strict';

    angular.module('app.users')
        .controller('UserController', UserController);

    UserController.$inject = ['UserService', 'userPrepService'];

    /* @ngInject */
    function UserController(UserService, userPrepService) {
        var vm = this;

        vm.prepBrands = userPrepService;
        vm.users = vm.prepBrands.users;
        vm.getUsers = getUsers;
        vm.hasDeleted = false;
        vm.response = {};
        vm.deleteUser = deleteUser;
        vm.response = {};
        vm.isDone = true;
        vm.search = search;
        vm.searchItem = '';
        vm.isLoading = false;
        vm.isSearch = false;
        vm.clearSearch = clearSearch;
        vm.isUserEmpty = UserService.isEmpty();

        //activate();

        ////////////////

        function activate() {
            return getUsers();
        }

        function clearSearch() {
            vm.searchItem = '';
            search();
        }

        function search() {
            vm.isLoading = true;

            if (vm.searchItem.trim().length > 0) {
                vm.isSearch = true;
            } else {
                vm.isSearch = false;
            }

            UserService.search(vm.searchItem).then(function(resp) {
                vm.users = resp;
                vm.isLoading = false;
            }).catch(function(err) {
                console.log(err);
            });
        }

        function getUsers() {
            return UserService.getAll().then(function(data) {
                vm.prepBrands = data;
                vm.users = vm.prepBrands.users;
                return vm.users;
            });
        }

        function deleteUser(element, user) {
            bootbox.confirm({
                title: "Confirm Delete",
                message: "Are you sure you want to delete user: <b>" + user.name + "</b>?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function(result) {
                    if (result) {
                        Ladda.create(element).start();
                        doDelete(user);
                    }
                }
            });

        }

        function doDelete(user) {
            UserService.delete(user.uid).then(function(resp) {
                vm.hasDeleted = true;
                vm.response['success'] = "alert-success";
                vm.response['alert'] = "Success!";
                vm.response['msg'] = "Deleted user: " + user.name;
                getUsers();
                vm.hasAdded = true;
                vm.isDone = true;
            }).catch(function() {
                vm.response['success'] = "alert-danger";
                vm.response['alert'] = "Error!";
                vm.response['msg'] = "Failed to delete user: " + user.name;
                vm.hasAdded = true;
                vm.isDone = true;
            });
        }
    }
})();