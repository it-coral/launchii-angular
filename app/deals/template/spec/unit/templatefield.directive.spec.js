(function() {
    'use strict';

    describe('Template field directive', function() {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module('app.deals.templatefield'));
        beforeEach(module('app/deals/template/template-field.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Replaces the element with template model object', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<template-field template-counter="0" field-model="" ></template-field>')($rootScope.$new());
            $rootScope.$digest();
            expect(element.html()).toContain('ng-model="fieldModel.name"');
        });

    });
})();