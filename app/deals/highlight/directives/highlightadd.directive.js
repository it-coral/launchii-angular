(function() {
    'use strict';

    angular
        .module('app.deals.highlightadd', [])
        .directive('addHighlight', addHighlight);

    addHighlight.$inject = ['$compile'];
    /* @ngInject */
    function addHighlight($compile) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/deals/highlight/highlight.html',
            replace: true,
            scope: {
                fieldModel: '=',
                formMode: '=',
                highlightsData: '=',
                counter: '='
            },
            transclude: true,
            link: function(scope, element, attrs) {
                //scope.counter = 0;
                scope.increCounter = increCounter;
                element.find('button#add-highlight-btn').bind('click', function() {
                    var html = '<highlight-field field-model="fieldModel" ></highlight-field>';
                    var input = angular.element(html);
                    var compile = $compile(input)(scope);

                    element.find('#highlight-container').append(input);

                    increCounter();
                });

                //////////////

                function increCounter() {
                    scope.counter++;
                }

            },
            // controller: 'HighlightController',
            // controllerAs: 'hl',
            // bindToController: true
        };

        return directive;
    }

})();