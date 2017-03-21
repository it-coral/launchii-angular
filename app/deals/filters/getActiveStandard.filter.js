(function() {
    'use strict';

    angular
        .module('app.deals')
        .filter('getActiveStandard', getActiveStandard);

    function getActiveStandard() {
        return function(discounts) {
            var obj = [];

            angular.forEach(discounts, function(discount, index) {
                if (discount != null) {
                    if (angular.isDefined(discount.status) && discount.discount_type == 'standard' && discount.status == 'active') {
                        obj.push(discount);
                    } else if (discount.discount_type == 'standard' && discount.is_active) {
                        obj.push(discount);
                    }
                }

            });

            return obj;
        }

    }

})();