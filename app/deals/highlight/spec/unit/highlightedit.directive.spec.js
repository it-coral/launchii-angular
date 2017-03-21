(function() {
    'use strict';

    describe('Highlight edit directive', function() {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module('app.deals.highlightedit'));
        beforeEach(module('app/deals/highlight/highlight-edit-field.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Replaces the element with input text', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<highlight-edit field-model="fieldModel" form-mode="\'Edit\'" ></highlight-edit>')($rootScope.$new());
            $rootScope.$digest();
            expect(element.html()).toContain('ng-model="highlightItem.title"');
        });

    });
})();