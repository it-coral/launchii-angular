(function() {
    'use strict';
    var env = {};

    // Import variables if present (from env.js)
    if (window) {
        Object.assign(env, window.__env);
    }
})();

(function() {
    'use strict';

    angular.module('app.core', [
        'ngResource',
        'ui.router',
        //'ngCookies',
        'satellizer',
        //'ng-token-auth',
        'jcs-autoValidate',
        'ngProgressLite',
        // 'ui.bootstrap',
        'angular-ladda',
        'ngFileUpload',
        'file-model',
        'naif.base64'
    ]);

})();