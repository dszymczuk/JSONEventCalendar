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
//                ,year: 2014
//                ,month: 8
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
            mom.locale(settings.lang);

            var calendar = '<div class="ds-calendar">';

            console.log(options);

            //header
            calendar += '<div class="ds-calendar-header">';
            calendar += '<div class="ds-prev-month"><span>&lt;</span></div>';
            calendar += '<div class="ds-title-month">'+mom.format(settings.formatTitle)+'</div>';
            calendar += '<div class="ds-next-month"><span>&gt;</span></div>';
            calendar += '</div>';

            // name of days
            calendar += '<div class="ds-title">';

            var offset = calcStartFrom(settings.startFrom);


            calendar += '<div class="ds-day ds-new-week">'+settings.dayNames[offset]+'</div>';
            for(var i = 1 + offset ; i < 7 + offset ; i++)
                calendar += '<div class="ds-day">'+settings.dayNames[i%7]+'</div>';
            calendar += '</div>';

//            for(var i = 0 ; i < 12 ; i++)
//            {
//                console.warn(i+1,settings.dayNames[firstDayPosition(2014,i,0)]);
//                console.info(firstDayPosition(2014,i,0));
//            }

//            month++;

            for(var b = 0 ; b < firstDayPosition(2014,month,0)-1 ; b++)
            {
                calendar += drawDay('b'+b);
            }


            for(var c = 1 ; c <= monthDays(2014,month) ; c++)
            {
                calendar += drawDay('c'+c);
            }

            console.log(b,c);


            if(firstDayPosition(2014,month+1,0) !== 1)
            {
                for(var a = 0 ; a <= 7-firstDayPosition(2014,month+1,0) ; a++)
                {
                    calendar += drawDay('a'+a);
                }
            }



            calendar += '';
            calendar += '';
            calendar += '';
            calendar += '';
            calendar += '';

            calendar += '</div>';
            return calendar;

            function drawDay(date){
                var dD = '';
                dD += '<div class="ds-day">';
                dD += '<div class="ds-day-header">'+date+'</div>';
                dD += '<div class="ds-events"></div>';
                dD += '</div>';
                return dD;
            }

            function monthDays(year,month) {
                month++;
                var d = new Date(year,month, 0);
                return d.getDate();
            }

            function calcStartFrom(dayName)
            {
                return settings.dayNames.indexOf(dayName);
            }

            function firstDayPosition(year,month,offset) {
                var mom = moment();
                mom.set('year',year);
                mom.set('month',month);
                mom.date(1);
                console.log(mom.format('DD MM YYYY'));
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
    formatTitle: "MMMM YYYY",
    formatEvent: "DD MMMM YYYY",
    startFrom: "Monday",
    eventsInDay: 3,
    mode: 'calendar',
    monthNames: [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ],
    dayNames: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday' ],
    dayNamesShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
};


var data = [];