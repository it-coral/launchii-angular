(function() {
    'use strict';

    angular
        .module('app')
        .directive('initDatePicker', initDatePicker);

    function initDatePicker() {

        return {
            restrict: 'A',
            scope: {
                varModel: '='
            },
            link: function(scope, element) {
                // angular.element(element).datepicker({
                //     rtl: App.isRTL(),
                //     orientation: "left",
                //     autoclose: true
                // });
                // angular.element(element).datepicker({
                //     //autoclose: true
                // });

                // element.bind('click', function() {
                //     angular.element(element).datepicker({
                //         autoclose: true
                //     });
                // });
            }
        };
    }

})();