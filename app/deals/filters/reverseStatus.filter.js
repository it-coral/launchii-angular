(function() {
    'use strict';

    angular
        .module('app.deals')
        .filter('reverseStatus', reverseStatus);

    function reverseStatus() {
        return function(discount) {
            var status = null;

            if (angular.isDefined(discount) && discount != null) {
                if (angular.isDefined(discount.status)) {
                    if (discount.status == 'active') {
                        status = 'suspended';
                    } else
                    if (discount.status == 'suspended') {
                        status = 'active';
                    }
                } else {
                    if (discount.is_active) {
                        status = 'suspended';
                    } else if (discount.is_suspended) {
                        status = 'active';
                    }
                }
            }
            //console.log(discount);
            //console.log(status);
            return status;
        }

    }

})();