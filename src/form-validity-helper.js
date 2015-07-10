angular.module(
    "byng.module.validation.service.form-validity-helper",
    [
        "aanimals.module.logdown.service.logdown"
    ]
)
    .factory("FormValidityHelper", function(
        Logdown
    ) {
        var logger = new Logdown({prefix: "FormValidityHelper"});
        var ucfirst = function(input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };

        return function FormValidityHelper(map) {
            var that = this;

            Object.keys(map)
                .forEach(function(key) {
                    that["set" + ucfirst(key)] = function(form, value) {
                        var valid = true;
                        try {
                            map[key](value);
                        } catch (e) {
                            valid = false;
                        }
                        form[key].$setValidity(key, valid);
                        logger.log("*" + key + "* set as `" + value + "` " + (valid ? "successfully" : "*unsuccessfully*"));
                    };
                })
            ;
        };
    })
;
