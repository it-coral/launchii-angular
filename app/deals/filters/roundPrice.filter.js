(function() {
    'use strict';

    angular
        .module('app.deals')
        .filter('roundPrice', roundPrice);

    function roundPrice() {
        return function(price) {
            if (price) {
                var num = parseFloat(price);
                var currency = num.toFixed(2);

                return currency;
            }

            return null;
        }

    }

})();