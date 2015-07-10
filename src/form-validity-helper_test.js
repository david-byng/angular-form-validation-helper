describe("byng.module.validation.service.form-validity-helper", function() {
    "use strict";

    var FormValidityHelper;
    var form;

    beforeEach(function() {
        Logdown.disable("*");
        module("byng.module.validation.service.form-validity-helper");
        inject(function(_FormValidityHelper_) {
            FormValidityHelper = _FormValidityHelper_;
        });
    });

    it("should be a function", function() {
        expect(FormValidityHelper).toEqual(jasmine.any(Function));
    });

    describe("new instance", function() {
        var formValidityHelper;
        var setValue;

        beforeEach(function() {
            form = {
                foo: jasmine.createSpyObj("foo", [ "$setValidity" ])
            };

            setValue = jasmine.createSpy("setValue");

            formValidityHelper = new FormValidityHelper({
                foo: setValue
            });
        });

        it("should make the form invalid if something is thrown in the setter", function() {
            var value = "foo";

            setValue.and.throwError(new Error());

            formValidityHelper.setFoo(form, value);

            expect(form.foo.$setValidity).toHaveBeenCalledWith(jasmine.any(String), false);
        });

        it("should make the form valid if the setter succeeds", function() {
           var value = "foo";

            formValidityHelper.setFoo(form, value);

            expect(form.foo.$setValidity).toHaveBeenCalledWith(jasmine.any(String), true);
        });
    });
});
