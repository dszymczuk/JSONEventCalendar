/**
 * Author: Damian Szymczuk
 * Website: http://dszymczuk.pl
 * Version: 0.1
 * GitHub: https://github.com/dszymczuk/JSONEventCalendar
 */


(function( $ ) {
    $.fn.JSONEventCalendar = function(options) {
        console.log("JSONEventCalendar");

        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white"
        }, options );


        return this.each( function() {
//            $(this).html(text);
            var that = $(this);
            console.log(that);
            that.on('click','.ds-next-month',function(){
                console.log(".ds-next-month");
            })
        });

    }
}( jQuery ));






var data = [];