(function() {
    'use strict';

    angular
        .module('app.deals.templatefield', [])
        .directive('templateField', templateField);

    templateField.$inject = ['$compile'];
    /* @ngInject */
    function templateField($compile) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/deals/template/template-field.html',
            replace: true,
            scope: {
                templateCounter: '=',
                //fieldModel: '='
            },
            link: function(scope, element, attrs) {
                $('[data-toggle="tooltip"]').tooltip();
                //console.log(scope);
                //if (angular.isDefined(scope.$parent.$parent.vm)) {
                scope.fieldModel = scope.$parent.$parent.vm ? scope.$parent.$parent.vm.form.templates[scope.templateCounter] : {};
                //}

                scope.openModal = openModal;
                scope.remove = remove;

                ///////////////////

                function openModal() {
                    //scope.$parent.$parent.vm.setSelTemplateIndex(scope.templateCounter);
                    $('#template-modal-edit').modal('show');
                    scope.$parent.$parent.vm.setSelTemplateObj(scope.fieldModel);
                    // $("#template-modal-edit").on("hidden.bs.modal", function() {
                    //     console.log(scope.$parent.$parent.vm.templateCounter);
                    //     scope.$parent.$parent.vm.setSelTemplateIndex(scope.$parent.$parent.vm.templateCounter);
                    // });
                }

                function remove(target) {
                    var parent = $(target).parent();
                    parent.remove();
                    scope.$parent.$parent.vm.removeTemplate(scope.templateCounter);
                }
            },
            // controller: 'TemplateController',
            // controllerAs: 'hl',
            // bindToController: true
        };

        return directive;
    }

})();