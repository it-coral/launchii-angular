(function() {
    'use strict';

    angular
        .module('app.deals.templatemodal', [])
        .directive('templateModal', templateModal)
        .controller('TemplateController', TemplateController);

    templateModal.$inject = ['$compile', '$document'];
    /* @ngInject */
    function templateModal($compile, $document) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/deals/template/template-modal.html',
            replace: true,
            scope: {
                fieldModel: '=',
                formMode: '=',
                templatesData: '='
            },
            transclude: true,
            link: function(scope, element, attrs) {
                //console.log(scope.$parent);
                scope.hl.templates = scope.$parent.vm.templateNames;
                scope.hl.types = scope.$parent.vm.templateTypes;

                scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].template_type = scope.hl.templates[0].value;
                scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].template_location = scope.hl.types[0].value;

                scope.$parent.vm.setSelTemplateIndex(scope.$parent.vm.templateCounter);
                scope.addTemplate = addTemplate;

                scope.disableAdd = true;
                //scope.statusChange = statusChange;

                /////////////

                function statusChange() {
                    var status = scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].status;

                    if (status == 'published') {
                        angular.forEach(scope.$parent.vm.form.templates, function(t, index) {
                            if (index != scope.$parent.vm.selTemplateIndex) {
                                if (t.status == 'published') {
                                    t.status = 'draft';
                                }

                            }
                        });

                        if (scope.hl.formMode == 'Edit') {
                            angular.forEach(scope.$parent.vm.templates, function(t, index) {
                                if (t.status == 'published') {
                                    t.status = 'draft';
                                }
                            });
                        }
                    }
                }

                scope.$watch('$parent.vm.form.templates[$parent.vm.selTemplateIndex].name', function(newValue, oldValue) {
                    if (angular.isDefined(newValue)) {
                        if (newValue.trim() == '') {
                            scope.disableAdd = true;
                        } else {
                            scope.disableAdd = false;
                        }
                    } else {
                        scope.disableAdd = true;
                    }

                });

                function addTemplate() {
                    if (!angular.isDefined(scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].name) || scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].name.trim() == '') {
                        return false;
                    }

                    statusChange();

                    var html = '<template-field template-counter="' + scope.$parent.vm.selTemplateIndex + '" field-model="scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex]" ></template-field>';
                    var input = angular.element(html);
                    var compile = $compile(input)(scope);

                    $document.find('#template-container').append(input);
                    $('#template-modal').modal('hide');
                    scope.$parent.vm.increTemplateCounter();
                    scope.$parent.vm.setSelTemplateIndex(scope.$parent.vm.templateCounter);

                    scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex] = {};

                    scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].template_type = scope.hl.templates[0].value;
                    scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].template_location = scope.hl.types[0].value;
                    scope.$parent.vm.form.templates[scope.$parent.vm.selTemplateIndex].status = 'draft';
                }
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