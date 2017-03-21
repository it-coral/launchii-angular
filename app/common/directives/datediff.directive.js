(function() {
    'use strict';

    angular
        .module('app')
        .directive('dateDiff', dateDiff);

    function dateDiff() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, ngModel) {
                $log.log(ngModel);
            }
        };
    }

})();