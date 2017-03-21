(function() {
    'use strict';

    angular
        .module('app.deals')
        .filter('discountStatus', discountStatus);

    discountStatus.$inject = ['$filter'];
    /* @ngInject */
    function discountStatus($filter) {
        return function(discount, isReverse) {
            var status = null;

            if (angular.isDefined(discount) && discount != null) {
                if (angular.isDefined(discount.status)) {
                    status = $filter('ucFirst')(discount.status);
                    if (isReverse && status == 'Active') {
                        status = 'Suspended';
                    } else
                    if (isReverse && status == 'Suspended') {
                        status = 'Active';
                    }
                } else {
                    if (discount.is_active || discount.status == 'active') {
                        status = 'Active';
                        if (isReverse) {
                            status = 'Suspended';
                        }
                    } else if (discount.is_suspended || discount.status == 'suspended') {
                        status = 'Suspended';
                        if (isReverse) {
                            status = 'Active';
                        }
                    }
                }
            }

            return status;
        }

    }

})();