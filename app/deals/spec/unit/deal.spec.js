(function() {
    'use strict';

    describe('Deals service', function() {
        var $controller, DealService, UserService;

        beforeEach(angular.mock.module('ui.router'));
        // beforeEach(angular.mock.module('app.deals.highlightadd'));
        // beforeEach(angular.mock.module('app.deals.highlightedit'));
        // beforeEach(angular.mock.module('app.deals.highlightfield'));
        beforeEach(angular.mock.module('app.deals'));
        beforeEach(angular.mock.module('app.users'));

        beforeEach(function() {

            module(function($provide) {
                $provide.value('CONST', jasmine.createSpy('CONST'));
                $provide.value('brandPrepService', { brands: [] });
                $provide.value('categoryPrepService', { categories: [] });
                $provide.value('HelperService', { getPrevState: jasmine.createSpy('getPrevState') });
                $provide.value('prepSelBrand', jasmine.createSpy('prepSelBrand'));
                $provide.value('BrandService', jasmine.createSpy('DealService'));
                $provide.value('CategoryService', jasmine.createSpy('DealService'));
                $provide.value('prepTemplateNames', jasmine.createSpy('prepTemplateNames'));
                $provide.value('prepTemplateTypes', jasmine.createSpy('prepTemplateNames'));
                $provide.value('prepSelDeal', jasmine.createSpy('prepSelDeal'));
                $provide.value('prepSelHighlights', jasmine.createSpy('prepSelHighlights'));
                $provide.value('prepSelTemplates', jasmine.createSpy('prepSelTemplates'));
                $provide.value('prepStandardD', { concat: Array.prototype.concat });
                $provide.value('prepDealImages', jasmine.createSpy('prepDealImages'));
                $provide.value('prepUpsellDeals', jasmine.createSpy('prepUpsellDeals'));
            });

        });

        beforeEach(inject(function(_UserService_) {
            UserService = _UserService_;
        }));

        it('should exist', function() {
            expect(UserService).toBeDefined();
        });

        beforeEach(inject(function(_DealService_) {
            DealService = _DealService_;
        }));

        it('should exist', function() {
            expect(DealService).toBeDefined();
        });

        it('should have the required attributes', function() {
            expect(DealService.search).toBeDefined();
            expect(DealService.add).toBeDefined();
            expect(DealService.edit).toBeDefined();
            expect(DealService.delete).toBeDefined();
            expect(DealService.getById).toBeDefined();
        });

        describe('Deal dashboard controller', function() {

            var scope, DealController, httpBackend;

            beforeEach(inject(function($controller, $rootScope, $httpBackend) {

                scope = $rootScope.$new();
                httpBackend = $httpBackend;

                DealController = $controller('DealController', {
                    $scope: scope,
                    $http: $httpBackend
                });
            }));

            it('should exist', function() {
                expect(DealController).toBeDefined();
            });

            it('should have the required attributes', function() {
                expect(DealController.deals).toBeDefined();
                expect(DealController.response).toBeDefined();
                expect(DealController.deleteDeal).toBeDefined();
                expect(DealController.search).toBeDefined();
                expect(DealController.clearSearch).toBeDefined();
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
