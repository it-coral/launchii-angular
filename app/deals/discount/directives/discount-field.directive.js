(function() {
    'use strict';

    angular
        .module('app.deals')
        .directive('discountField', discountField);

    discountField.$inject = ['$compile', '$filter', 'HelperService', '$rootScope', 'DealService'];
    /* @ngInject */
    function discountField($compile, $filter, HelperService, $rootScope, DealService) {

        var directive = {
            restrict: 'E',
            templateUrl: '/app/deals/discount/discount-field.html',
            replace: true,
            scope: {
                selFieldModel: '=',
                fieldModelIndex: '@',
                fieldModel: '=',
                discountsData: '=',
                formMode: '@'
            },
            link: function(scope, element, attrs) {
                $('[data-toggle="tooltip"]').tooltip();
                //scope.fieldModel = scope.$parent.$parent.scope.selFieldModel[scope.discountCounter];
                scope.index = scope.fieldModelIndex;
                //$log.log(scope.selFieldModel[scope.index]);
                //$log.log(scope.fieldModelIndex)
                scope.openModal = openModal;
                scope.remove = remove;
                scope.setActive = setActive;

                ///////////////////

                // function setActive() {
                //     //statusChange()

                // }

                function setActive() {
                    DealService.setActive(scope.selFieldModel[scope.index], scope.selFieldModel, scope.discountsData, scope.selFieldModel[scope.index].discount_type, scope.formMode);
                }

                function _setActive(selFieldModel, type) {
                    if (type == 'standard' && scope.formMode == 'Edit') {
                        var existingCount = HelperService.countModelLength($filter('getActiveStandard')(scope.discountsData));
                        var newCount = HelperService.countModelLength($filter('getActiveStandard')(scope.selFieldModel));
                        //$log.log(scope.discountsData);
                        //$log.log($filter('getActiveStandard')(scope.selFieldModel));
                        if (selFieldModel.status == 'active') { //Set to suspended
                            bootbox.alert('There must be one active standard discount.');
                        } else { //set to active

                            bootbox.confirm({
                                title: "Confirm Active Standard",
                                message: "You have set this standard discount as \"Active\". You have an active standard discount running at the moment.<br ><br >Press \"Yes\" to proceed and the current active standard discount will be suspended.<br ><br >Press \"No\" and the new standard discount will be set to \"Suspended\".",
                                buttons: {
                                    confirm: {
                                        label: 'Yes',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },
                                callback: function(result) {
                                    if (result) {
                                        //$log.log('test');
                                        reverseStatus(type);
                                        $rootScope.$digest();
                                    }
                                }
                            });

                        }
                    } else {
                        if (type == 'standard' && scope.formMode == 'Add') {
                            reverseStatus(type);
                        } else {
                            //Existing discounts
                            angular.forEach($filter('whereAttr')(scope.discountsData, 'discount_type', type), function(discount, index) {
                                if (discount == selFieldModel) {
                                    discount.status = $filter('reverseStatus')(discount);
                                }
                            });
                            //New discounts
                            angular.forEach($filter('whereAttr')(scope.selFieldModel, 'discount_type', type), function(discount, index) {
                                if (discount == selFieldModel) {
                                    discount.status = $filter('reverseStatus')(discount);
                                }
                            });
                        }

                    }
                }

                function reverseStatus(type) {
                    //Existing discounts
                    angular.forEach($filter('whereAttr')(scope.discountsData, 'discount_type', type), function(discount, index) {
                        discount.status = $filter('reverseStatus')(discount);
                    });
                    //New discounts
                    angular.forEach($filter('whereAttr')(scope.selFieldModel, 'discount_type', type), function(discount, index) {
                        discount.status = $filter('reverseStatus')(discount);
                    });
                }

                function countActiveStandard() {
                    var dobj = scope.selFieldModel[scope.index];
                    var countStandard = 0;
                    $log.log('---------');
                    $log.log(scope.fieldModel);
                    angular.forEach(scope.fieldModel, function(discount, index) {
                        if (discount != null && discount.discount_type == 'standard') {
                            if (discount.status == 'active') {
                                countStandard++;
                            }
                        }
                    });
                    $log.log(scope.discountsData);
                    angular.forEach(scope.discountsData, function(discount, index) {
                        if (discount != null && discount.discount_type == 'standard' && dobj != discount) {
                            if (discount.status == 'active') {
                                countStandard++;
                            }
                        }
                    });

                    $log.log(countStandard);
                    $log.log('---------');

                    return countStandard;
                }

                function statusChange() {
                    if (scope.selFieldModel[scope.index].status == 'active') {
                        scope.selFieldModel[scope.index].status = 'suspended';
                    } else {
                        scope.selFieldModel[scope.index].status = 'active';
                    }

                    var selDiscount = scope.selFieldModel[scope.index];
                    var status = selDiscount.status;
                    var countStandard = 0;
                    //$log.log(selDiscount);
                    var activeStandard = countActiveStandard();
                    //$log.log(activeStandard);
                    if (status == 'active') {
                        for (var attr in scope.fieldModel) {
                            if (scope.fieldModel[attr] != null && scope.fieldModel[attr] != selDiscount && scope.fieldModel[attr].discount_type == 'standard') {
                                countStandard++;
                                if (scope.fieldModel[attr].status == 'active') {
                                    scope.fieldModel[attr].status = 'suspended';
                                }
                            }
                        }

                        if (scope.formMode == 'Edit' && selDiscount.discount_type == 'standard') {
                            for (var attr in scope.discountsData) {
                                countStandard++;
                                if (scope.discountsData[attr] != null && scope.discountsData[attr].discount_type == 'standard') {
                                    if (scope.discountsData[attr].status == 'active') {
                                        scope.discountsData[attr].status = 'suspended';
                                    }

                                }
                            }
                        }
                        if (countStandard == 0 && selDiscount.discount_type == 'standard') {
                            scope.selFieldModel[scope.index].status = 'active';
                        }
                    } else if (selDiscount.discount_type == 'standard' && activeStandard == 0) {
                        bootbox.alert('There must be one active standard discount.');
                        scope.selFieldModel[scope.index].status = 'active';
                    }


                }

                function openModal(fieldModel) {
                    $('#discount-modal-edit').modal('show');
                    scope.$parent.$parent.vm.setSelDiscountObj(fieldModel);
                }

                function remove(target, selectedModel) {
                    if (selectedModel.discount_type == 'standard' && selectedModel.status == 'active') {
                        bootbox.alert("You can't remove an active standard discount!");
                    } else {
                        angular.element(target).parents('.discount-row').remove();
                        scope.$parent.$parent.vm.removeDiscount(selectedModel);
                    }

                }
            }
        };

        return directive;
    }

})();