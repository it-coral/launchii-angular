(function() {
    'use strict';

    describe('Highlight add directive', function() {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module('app.deals.highlightadd'));
        beforeEach(module('app/deals/highlight/highlight.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Replaces the element with highlight container div', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<add-highlight field-model="" form-mode="Add" highlights-data="" counter="0" ></add-highlight>')($rootScope.$new());
            $rootScope.$digest();
            expect(element.html()).toContain("highlight-container");
        });

    });
})();