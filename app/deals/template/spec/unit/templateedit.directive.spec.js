(function() {
    'use strict';

    describe('Template edit directive', function() {
        var $compile,
            $rootScope;

        beforeEach(angular.mock.module('app.deals.templateedit'));
        beforeEach(module('app/deals/template/template-edit-field.html'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('Replaces the element with edit template model object', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<template-edit field-model="" ></template-edit>')($rootScope.$new());
            $rootScope.$digest();
            expect(element.html()).toContain('ng-model="fieldModel.name"');
        });

    });
})();