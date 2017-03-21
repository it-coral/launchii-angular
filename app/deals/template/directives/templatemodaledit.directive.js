(function() {
    'use strict';

    angular
        .module('app.deals.templatemodaledit', [])
        .directive('templateModalEdit', templateModalEdit);

    templateModalEdit.$inject = ['$compile', '$document'];
    /* @ngInject */
    function templateModalEdit($compile, $document) {

        var directive = {
            restrict: 'E',
            templateUrl: '/app/deals/template/template-modal-edit.html',
            replace: true,
            scope: {
                fieldModel: '=',
                formMode: '=',
                templatesData: '='
            },
            transclude: true,
            link: function(scope, element, attrs) {
                scope.templates = scope.$parent.vm.templateNames;
                scope.types = scope.$parent.vm.templateTypes;
                scope.closeModal = closeModal;

                scope.$parent.vm.setSelTemplateIndex(scope.$parent.vm.templateCounter);

                //////////////////////////

                function statusChange() {
                    var tobj = scope.$parent.vm.selTemplateObj;

                    if (tobj.status == 'published') {
                        angular.forEach(scope.$parent.vm.form.templates, function(t, index) {
                            if (t.uid != tobj.uid) {
                                if (t.status == 'published') {
                                    t.status = 'draft';
                                }
                            }

                        });

                        angular.forEach(scope.$parent.vm.templates, function(t, index) {
                            if (t.uid != tobj.uid) {
                                if (t.status == 'published') {
                                    t.status = 'draft';
                                }

                            }
                        });
                    }
                }

                $("#template-modal-edit").on("hidden.bs.modal", function() {
                    statusChange();
                });

                function closeModal() {
                    $('#template-modal-edit').modal('hide');
                }
            }
        };

        return directive;
    }

})();