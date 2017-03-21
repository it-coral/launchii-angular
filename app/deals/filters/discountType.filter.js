(function() {
    'use strict';

    angular
        .module('app.deals')
        .filter('discountType', discountType);

    function discountType() {
        return function(discount) {
            if (angular.isDefined(discount) && discount != null) {
                if (discount.is_unit || discount.value_type == 'unit') {
                    return '$';
                } else if (discount.is_percentage || discount.value_type == 'percentage') {
                    return '%';
                }
            }

            return null;
        }

    }

})();