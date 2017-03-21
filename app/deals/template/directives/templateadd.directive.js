(function() {
    'use strict';

    angular
        .module('app.deals.templateadd', [])
        .directive('addTemplate', addTemplate)
        .controller('TemplateController', TemplateController);

    addTemplate.$inject = ['$compile', '$document'];
    /* @ngInject */
    function addTemplate($compile, $document) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/deals/template/template.html',
            replace: true,
            scope: {
                fieldModel: '=',
                formMode: '=',
                templatesData: '='
            },
            transclude: true,
            link: function(scope, element, attrs) {
                element.find('button#add-template-btn').bind('click', function() {
                    // var html = '<template-field field-model="hl.fieldModel" ></template-field>';

                    // var input = angular.element(html);

                    // var compile = $compile(input)(scope);

                    // element.find('#template-container').append(input);

                    scope.hl.openModal();
                    scope.hl.increCounter();
                    //scope.$parent.vm.increTemplateCounter();
                });

            },
            controller: 'TemplateController',
            controllerAs: 'hl',
            bindToController: true
        };

        return directive;
    }


    TemplateController.$inject = ['$scope', '$compile', '$document'];

    /* @ngInject */
    function TemplateController($scope, $compile, $document) {
        var hl = this;

        hl.counter = 0;
        hl.increCounter = increCounter;
        hl.openModal = openModal;
        hl.currModel = {};
        //hl.addTemplate = addTemplate;
        //hl.modalContainer = $('#template-modal');

        //////////////

        function openModal() {
            $('#template-modal').modal('show');

            $("#template-modal").on("hidden.bs.modal", function() {
                $scope.$parent.vm.setSelTemplateIndex($scope.$parent.vm.templateCounter);
            });
        }



        function increCounter() {
            hl.counter++;
        }
    }
})();