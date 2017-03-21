(function() {
    'use strict';

    angular.module('app.deals')
        .factory('TemplateService', TemplateService);

    TemplateService.$inject = ['$scope'];

    /* @ngInject */
    function TemplateService($scope) {

        var service = {
            lists: [],
            setList: setList
        }

        return service;

        //////// SERIVCE METHODS ////////

        function setList(list) {
            service.lists = list;
        }
    }

})();