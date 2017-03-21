(function() {
    'use strict';

    angular
        .module('app')
        .directive('enableDatetimePicker', enableDatetimePicker);

    enableDatetimePicker.$inject = ['HelperService'];
    /* @ngInject */
    function enableDatetimePicker(HelperService) {
        var directive = {
            restrict: 'A',
            scope: {
                enableDatetimePicker: '=enableDatetimePicker',

            },
            link: function(scope, element) {

                // document.querySelectorAll('input.date-picker').forEach(function(el) {
                //     el.value = HelperService.getDateNow();
                // });
                scope.enableDatetimePicker.$pristine;
                ComponentsDateTimePickers.init();
            }
        };

        return directive;
    }

})();