(function() {
    'use strict';

    angular
        .module('app.deals.templateedit', [])
        .directive('templateEdit', templateEdit);

    templateEdit.$inject = ['$compile'];
    /* @ngInject */
    function templateEdit($compile) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/deals/template/template-edit-field.html',
            replace: true,
            scope: {
                templateCounter: '=',
                fieldModel: '='
            },
            link: function(scope, element, attrs) {
                $('[data-toggle="tooltip"]').tooltip();
                //scope.fieldModel = scope.$parent.$parent.vm.form.templates[scope.templateCounter];
                //console.log(scope);
                scope.openModal = openModal;
                scope.remove = remove;


                ///////////////////

                function openModal() {
                    //scope.$parent.$parent.vm.setSelTemplateIndex(scope.templateCounter);
                    $('#template-modal-edit').modal('show');
                    scope.$parent.$parent.$parent.$parent.vm.setSelTemplateObj(scope.fieldModel);
                    // $("#template-modal-edit").on("hidden.bs.modal", function() {
                    //     console.log(scope.$parent.$parent.vm.templateCounter);
                    //     scope.$parent.$parent.vm.setSelTemplateIndex(scope.$parent.$parent.vm.templateCounter);
                    // });
                }

                function remove(target) {
                    var parent = $(target).parent();
                    parent.remove();
                    scope.$parent.$parent.$parent.$parent.vm.removeTemplate(scope.fieldModel);
                }
            },
            // controller: 'TemplateController',
            // controllerAs: 'hl',
            // bindToController: true
        };

        return directive;
    }

})();