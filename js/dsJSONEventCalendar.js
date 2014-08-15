/**
 * Author: Damian Szymczuk
 * Website: http://dszymczuk.pl
 * Version: 0.1
 * GitHub: https://github.com/dszymczuk/JSONEventCalendar
 */


(function( $ ) {
    $.fn.JSONEventCalendar = function(options) {
        console.log("JSONEventCalendar");

        var settings = $.extend($.fn.JSONEventCalendar.settings, options );

        function refreshDayHeight(element) {
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

        return this.each( function() {
            var that = $(this);

            refreshDayHeight(that);


            that.on('click','.ds-next-month',function(){
                console.log(settings.monthNames);
            })
        });

    }
}( jQuery ));



$.fn.JSONEventCalendar.settings = {
    monthNames: [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ],
    dayNames: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday' ],
    dayNamesShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
};


var data = [];