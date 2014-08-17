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


            var year = moment().get('year');
            var month = moment().get('month');

            that.html(draw(that,options.mode,{
                formatTitle: settings.formatTitle,
                lang: settings.lang
            }));
            _refreshDayHeight(that);




            that.on('click','.ds-day',function(){
//                console.log(settings.monthNames);

            });
        });

        function draw(element$,mode,options) {
            if(typeof mode === 'undefined')
                mode = 'both';

            if(typeof options === 'undefined')
                return "Can't draw calendar - options in draw is undefined";

            var html = "";
            html += '<div id="'+element$[0].id+'" class="dsJSONEventCalendar">';

            switch (mode) {
                case 'calendar':
                    html += _drawCalendar(options);
                    break;
                case 'list':
                    html += _drawList(options);
                    break;
                default :
                    html += _drawCalendar(options);
                    html += _drawList(options);
                    break;
            }

            html += '</div>';
            return html;
        }



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


        function _drawCalendar(options) {
            var year, month;
            var mom = moment();
            if(options.hasOwnProperty('year'))
                year = options.year;
            else
                year = mom.get('year');

            if(options.hasOwnProperty('month'))
                month = options.month;
            else
                month = mom.get('month');

            console.info(year,month,monthDays(year,month));
            mom.locale(options.lang);

            var calendar = '<div class="ds-calendar">';

            console.log(options);


            calendar += '';
            calendar += '';
            calendar += '';
            calendar += '';
            calendar += '';
            calendar += '';
            calendar += mom.format(options.formatTitle);

            calendar += '</div>';
            return calendar;

            function drawDay(){

            }

            function monthDays(year,month) {
                month++;
                var d = new Date(year,month, 0);
                return d.getDate();
            }

            function firstDayPosition(year,month,offset) {
                month++;
                var mom = moment();
                mom.set('year',year);
                mom.set('month',month);
                return mom.day()+offset;
            }
        }

        function _drawList(){

        }
    }
}( jQuery ));


/*
mode - calendar, list, both
 */
$.fn.JSONEventCalendar.settings = {
    lang: "pl",
//    format: "DD-MM-YYYY",
    formatTitle: "DD MMMM YYYY",
    formatEvent: "DD MMMM YYYY",
    startFrom: "monday",
    eventsInDay: 3,
    mode: 'calendar',
    monthNames: [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ],
    dayNames: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday' ],
    dayNamesShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
};


var data = [];