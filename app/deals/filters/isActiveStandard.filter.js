(function() {
    'use strict';

    angular
        .module('app.deals')
        .filter('isActiveStandard', isActiveStandard);

    function isActiveStandard() {
        return function(discount) {
            if (discount != null && discount.discount_type == 'standard' && discount.status == 'active') {
                return true;
            }

            return false;
        }

    }

})();