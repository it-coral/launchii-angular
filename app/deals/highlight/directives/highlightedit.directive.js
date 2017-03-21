(function() {
    'use strict';

    angular
        .module('app.deals.highlightedit', [])
        .directive('highlightEdit', highlightEdit);

    highlightEdit.$inject = ['$compile'];
    /* @ngInject */
    function highlightEdit($compile) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/deals/highlight/highlight-edit-field.html',
            replace: true,
            scope: {
                highlightItem: '=',
                formMode: '='
            },
            link: function(scope, element, attrs) {
                $('[data-toggle="tooltip"]').tooltip();
                scope.fieldModel = scope.$parent.fieldModel;
                scope.counter = scope.$parent.counter;
                //console.log(scope.formMode);
                //scope.formMode = scope.$parent.formMode ? scope.$parent.formMode : 'Edit';

                scope.remove = remove;

                function remove(target, highlight) {
                    var parent = $(target).parent();
                    scope.$parent.$parent.$parent.$parent.vm.removeHighlight(highlight);
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