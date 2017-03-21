(function() {
    'use strict';

    describe('Template add directive', function() {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module('app.deals.templateadd'));
        beforeEach(module('app/deals/template/template.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Replaces the element with template container div', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<add-template field-model="" form-mode="Add" templates-data="" counter="0" ></add-highlight>')($rootScope.$new());
            $rootScope.$digest();
            expect(element.html()).toContain("template-container");
        });

    });
})();