/**
 * Author: Damian Szymczuk
 * Website: http://dszymczuk.pl
 * Version: 0.1
 * GitHub: https://github.com/dszymczuk/JSONEventCalendar
 */


var dsJSONEventCalendar = (function dsJSONEventCalendar() {
    var _language = {
        lang: "en"
    };
    
    function _private(){
        return "private";
    }

    // Return the constructor
    return function dsJSONEventCalendar() {
        var that = this;

        that.someMethod = function () {
            return _privateVars.someVar;
        };

        that.someOtherMethod = function () {
            console.log(_private());
        };
    };
}());