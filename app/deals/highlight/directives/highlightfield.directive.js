(function() {
    'use strict';

    angular
        .module('app.deals.highlightfield', [])
        .directive('highlightField', highlightField);

    highlightField.$inject = ['$compile'];
    /* @ngInject */
    function highlightField($compile) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/deals/highlight/highlight-field.html',
            replace: true,
            scope: {
                fieldModel: '='
            },
            link: function(scope, element, attrs) {
                $('[data-toggle="tooltip"]').tooltip();

                scope.fieldModel = scope.$parent.fieldModel;
                scope.counter = scope.$parent.counter;
                scope.formMode = scope.$parent.formMode;

                scope.remove = remove;

                function remove(target) {
                    var parent = $(target).parent();
                    parent.remove();
                }
            },
            // controller: 'HighlightController',
            // controllerAs: 'hl',
            // bindToController: true
        };

        return directive;
    }

})();