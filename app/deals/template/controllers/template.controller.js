// (function() {
//     'use strict';

//     angular.module('app.deals')
//         .controller('TemplateController', TemplateController);

//     TemplateController.$inject = ['$scope', '$compile', '$document'];

//     /* @ngInject */
//     function TemplateController($scope, $compile, $document) {
//         var hl = this;

//         hl.counter = 0;
//         hl.increCounter = increCounter;
//         hl.openModal = openModal;
//         hl.currModel = {};
//         //hl.addTemplate = addTemplate;
//         //hl.modalContainer = $('#template-modal');

//         //////////////

//         function openModal() {
//             $('#template-modal').modal('show');

//             $("#template-modal").on("hidden.bs.modal", function() {
//                 $scope.$parent.vm.setSelTemplateIndex($scope.$parent.vm.templateCounter);
//             });
//         }



//         function increCounter() {
//             hl.counter++;
//         }
//     }
// })();