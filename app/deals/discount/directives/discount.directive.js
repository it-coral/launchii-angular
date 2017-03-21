(function() {
    'use strict';

    angular
        .module('app.deals')
        .directive('addDiscount', addDiscount);

    addDiscount.$inject = ['$compile', '$document'];
    /* @ngInject */
    function addDiscount($compile, $document) {

        var directive = {
            restrict: 'E',
            templateUrl: '/app/deals/discount/discount.html',
            replace: true,
            scope: {
                fieldModel: '=',
                formMode: '=',
                discountsData: '='
            },
            transclude: true,
            link: function(scope, element, attrs) {
                //console.log(scope.fieldModel);
                element.find('button#add-discount-btn').bind('click', function() {
                    openModal();
                });

                function openModal() {
                    $('#discount-modal').modal('show');

                    $("#discount-modal").on("hidden.bs.modal", function() {
                        scope.$parent.vm.setSelDiscountIndex(scope.$parent.vm.discountCounter);
                    });
                }
            }
        };

        return directive;
    }

})();