/**
 * Author: Damian Szymczuk
 * Website: http://dszymczuk.pl
 * Version: 0.1
 * GitHub: https://github.com/dszymczuk/JSONEventCalendar
 */


(function( $ ) {
    $.fn.JSONEventCalendar = function(events,options) {

        var settings = $.extend($.fn.JSONEventCalendar.settings, options );

        return this.each( function() {
            var that = $(this);
//            var m = moment();

//            m.locale(settings.lang);
//            m.format(settings.format);

            _refreshDayHeight(that);
//            console.log(_monthDays(m.get('year'), m.get('month')));


            that.on('click','.ds-day',function(){
//                console.log(settings.monthNames);
//                var now = moment();
//                console.warn(m.format(settings.format));
            })


        });



        /**
         * Refresh height of element to equal size
         *
         * @param element
         * @private
         */
        function _refreshDayHeight(element) {
            var maxHeight = 0;
            element.find('.ds-events').each(function(){
                var that = $(this);
                if(that.height() > maxHeight)
                    maxHeight = that.height();
            }).each(function(){
                var that = $(this);
                that.css('height',maxHeight + "px");
            });
        }

        /**
         * Return number of days in ponth
         *
         * @param year
         * @param month
         * @returns {number}
         * @private
         */
        function _monthDays(year,month) {
            month++;
            var d = new Date(year,month, 0);
            return d.getDate();
        }

        /**
         * Return number of day in week
         * Default sunday is first
         *
         * @param year
         * @param month
         * @param offset
         * @returns {*}
         * @private
         */
        function _firstDayPosition(year,month,offset) {
            month++;
            var mom = moment();
            mom.set('year',year);
            mom.set('month',month);
            return mom.day()+offset;
        }


        function _drawCalendar() {
            var calendar = "";


            return "";
        }

        function _drawList(){

        }
    }
}( jQuery ));



$.fn.JSONEventCalendar.settings = {
    lang: "pl",
//    format: "DD-MM-YYYY",
    format: "DD MMMM YYYY",
    startFrom: "monday",
    monthNames: [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ],
    dayNames: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday' ],
    dayNamesShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
};


var data = [];