(function() {
    'use strict';

    angular
        .module('app.deals')
        .directive('discountEdit', discountEdit);

    discountEdit.$inject = ['$compile'];
    /* @ngInject */
    function discountEdit($compile) {

        var directive = {
            restrict: 'E',
            templateUrl: '/app/deals/discount/discount-edit-field.html',
            replace: true,
            scope: {
                discountCounter: '=',
                fieldModel: '='
            },
            link: function(scope, element, attrs) {
                $('[data-toggle="tooltip"]').tooltip();
                //scope.fieldModel = scope.$parent.$parent.vm.form.discounts[scope.discountCounter];
                //console.log(scope);
                scope.openModal = openModal;
                scope.remove = remove;


                ///////////////////

                function openModal() {
                    //scope.$parent.$parent.vm.setSelDiscountIndex(scope.discountCounter);
                    $('#discount-modal-edit').modal('show');
                    scope.$parent.$parent.$parent.$parent.vm.setSelDiscountObj(scope.fieldModel);
                    // $("#discount-modal-edit").on("hidden.bs.modal", function() {
                    //     console.log(scope.$parent.$parent.vm.discountCounter);
                    //     scope.$parent.$parent.vm.setSelDiscountIndex(scope.$parent.$parent.vm.discountCounter);
                    // });
                }

                function remove(target) {
                    var parent = $(target).parent();
                    parent.remove();
                    scope.$parent.$parent.$parent.$parent.vm.removeDiscount(scope.fieldModel);
                }
            },
            // controller: 'DiscountController',
            // controllerAs: 'hl',
            // bindToController: true
        };

        return directive;
    }

})();