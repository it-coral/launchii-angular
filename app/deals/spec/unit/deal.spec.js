(function() {
    'use strict';

    describe('Deals service', function() {
        var $controller, DealService;

        beforeEach(angular.mock.module('ui.router'));
        beforeEach(angular.mock.module('app.deals.highlightadd'));
        beforeEach(angular.mock.module('app.deals.highlightedit'));
        beforeEach(angular.mock.module('app.deals.highlightfield'));
        beforeEach(angular.mock.module('app.deals'));

        beforeEach(function() {

            module(function($provide) {
                $provide.value('CONST', jasmine.createSpy('CONST'));
                $provide.value('brandPrepService', { brands: [] });
                $provide.value('HelperService', { getPrevState: jasmine.createSpy('getPrevState') });
                $provide.value('prepSelBrand', jasmine.createSpy('prepSelBrand'));
                $provide.value('BrandService', jasmine.createSpy('BrandService'));
                $provide.value('dealPrepService', jasmine.createSpy('dealPrepService'));
                $provide.value('prepTemplateNames', jasmine.createSpy('prepTemplateNames'));
                $provide.value('prepTemplateTypes', jasmine.createSpy('prepTemplateNames'));
                $provide.value('prepSelDeal', jasmine.createSpy('prepSelDeal'));
                $provide.value('prepSelHighlights', jasmine.createSpy('prepSelHighlights'));
                $provide.value('prepSelTemplates', jasmine.createSpy('prepSelTemplates'));
                $provide.value('prepStandardD', { concat: Array.prototype.concat });
                $provide.value('prepEarlyBirdD', jasmine.createSpy('prepEarlyBirdD'));
                $provide.value('prepDealImages', jasmine.createSpy('prepDealImages'));
            });

        });

        beforeEach(inject(function(_DealService_) {
            DealService = _DealService_;
        }));

        it('should exist', function() {
            expect(DealService).toBeDefined();
        });

        describe('Deal dashboard controller', function() {

            var scope, controller, httpBackend;

            beforeEach(inject(function($controller, $rootScope, $httpBackend) {

                scope = $rootScope.$new();
                httpBackend = $httpBackend;

                controller = $controller('DealController', {
                    $scope: scope,
                    $http: $httpBackend
                });
            }));

            it('should exist', function() {
                expect(controller).toBeDefined();
            });

        });

        describe('Deal add controller', function() {

            var scope, controller, httpBackend;

            beforeEach(inject(function($controller, $rootScope, $httpBackend) {

                scope = $rootScope.$new();
                httpBackend = $httpBackend;

                controller = $controller('DealAddController', {
                    $scope: scope,
                    $http: $httpBackend
                });
            }));

            it('should exist', function() {
                expect(controller).toBeDefined();
            });

        });

        describe('Deal edit controller', function() {

            var scope, controller, httpBackend;

            beforeEach(inject(function($controller, $rootScope, $httpBackend) {

                scope = $rootScope.$new();
                httpBackend = $httpBackend;

                controller = $controller('DealEditController', {
                    $scope: scope,
                    $http: $httpBackend
                });
            }));

            it('should exist', function() {
                expect(controller).toBeDefined();
            });

        });

        describe('Deal view controller', function() {

            var scope, controller, httpBackend;

            beforeEach(inject(function($controller, $rootScope, $httpBackend) {

                scope = $rootScope.$new();
                httpBackend = $httpBackend;

                controller = $controller('DealViewController', {
                    $scope: scope,
                    $http: $httpBackend
                });
            }));

            it('should exist', function() {
                expect(controller).toBeDefined();
            });

        });

    });
})();