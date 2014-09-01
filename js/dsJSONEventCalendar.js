/**
 * Author: Damian Szymczuk
 * Website: http://dszymczuk.pl
 * Version: 0.1
 * GitHub: https://github.com/dszymczuk/JSONEventCalendar
 */


(function( $ ) {
    $.fn.JSONEventCalendar = function(events,options) {

        var settings = $.extend($.fn.JSONEventCalendar.settings, options );
        
        var initMoment = moment();
        initMoment.locale(settings.lang);
        
        var names = {
            monthNames: initMoment._locale._months,
            dayNames: initMoment._locale._weekdays,
            dayNamesShort: initMoment._locale._weekdaysShort,
            dayNamesMin: initMoment._locale._weekdaysMin
        };

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
                ,year: year
                ,month: month
            }));
            _refreshDayHeight(that);




            //next month
            that.on('click','.ds-next-month',function(){
                if(month > 10)
                {
                    month = 0;
                    year++;
                }
                else
                    month++;

//                console.warn(month,year);

                that.html(draw(that,options.mode,{
                    formatTitle: settings.formatTitle,
                    lang: settings.lang
                    ,year: year
                    ,month: month
                }));
                _refreshDayHeight(that);
            });

            //prev month
            that.on('click','.ds-prev-month',function(){
//                console.log("jer: ",year);
                if(month < 1)
                {
                    month=11;
                    year--;
                }
                else
                    month--;

//                console.warn(month,year);
                that.html(draw(that,options.mode,{
                    formatTitle: settings.formatTitle,
                    lang: settings.lang
                    ,year: year
                    ,month: month
                }));
                _refreshDayHeight(that);
            });

            //event click
            that.on('click','.ds-event',function(){
                var elem = $(this);
                var id = elem[0].id;

                var event =  _.find(events, function(e) {
                    return e.id == id;
                });

//                console.warn(event);
                $(".ds-calendar").append(_drawModalEvent(event));
//                $(".ds-event-modal").css('visibility', 'visible');
            });



            that.on('click','.ds-event-modal .close-button',function(){
//                console.log("modal click");
                var elem = $(this);
//                console.log(elem);
//               elem.css('visibility', 'hidden');
                $(".ds-event-modal").remove();
               //elem.css('display', 'none');
            });
            
        });

        function draw(element$,mode,options) {
            if(typeof mode === 'undefined')
                mode = 'both';

            if(typeof options === 'undefined')
                return "Can't draw calendar - options in draw is undefined";

            var html = "";
//            html += '<div id="'+element$[0].id+'" class="dsJSONEventCalendar">';

            switch (mode) {
                case 'calendar':
                    html += _drawCalendar(options);
                    break;
                case 'list':
//                    html += _drawModalEvent(options);
                    break;
                default :
                    html += _drawCalendar(options);
//                    html += _drawModalEvent(options);
                    break;
            }

//            html += _drawModalEvent();
//            html += '</div>';
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

            
//            month = 5;
            
            mom.set('year',year);
            mom.set('month',month);
//            console.info(year,month,monthDays(year,month));
            mom.locale(settings.lang);
            
            
            
            var before = {
                month: month,
                year: year
            };
            before.month--;
            var after = {
                month: month,
                year: year
            };

            /*---------------------------*\
                CALCUALTE BEFORE MONTH
            \*---------------------------*/
            if(month < 0)
            {
                before.month=11;
                before.year--;
            }

            /*---------------------------*\
                CALCUALTE AFTER MONTH
            \*---------------------------*/
            if(month+1 > 11)
            {
                after.month = 0;
                after.year++;
            }
            

            var calendar = '<div class="ds-calendar">';

//            console.log(options);

            //header
            calendar += '<div class="ds-calendar-header-border">';
            calendar += '<div class="ds-calendar-header">';
            calendar += '<div class="ds-prev-month arrow"><span>&lt;</span></div>';
            calendar += '<div class="ds-title-month">'+mom.format(settings.formatTitle)+'</div>';
            calendar += '<div class="ds-next-month arrow"><span>&gt;</span></div>';
            calendar += '</div>';
            calendar += '</div>';

            // name of days
            calendar += '<div class="ds-title">';

            var offset = settings.startFrom;

//            console.log(mom._locale);


//            calendar += '<div class="ds-day ds-new-week">'+settings.dayNames[offset]+'</div>';
            calendar += '<div class="ds-day ds-new-week">'+names.dayNames[offset]+'</div>';
            for(var i = 1 + offset ; i < 7 + offset ; i++)
                calendar += '<div class="ds-day">'+names.dayNames[i%7]+'</div>';
            
            calendar += '</div>';


            
            
            
            /*-----------*\
                MONTH -1
            \*-----------*/
            var daysBefore = monthDays(before.year,before.month);
            var calcBefore = _calcBefore(year,month);
            daysBefore = daysBefore - calcBefore+1;

            for(var b = 0 ; b < calcBefore ; b++)
            {
                calendar += drawDay(daysBefore+b,'before');
            }


            /*-----------------*\
                CUREENT MONTH
            \*-----------------*/
            var currDaysInMonth = monthDays(year,month);
            for(var c = 1 ; c <= currDaysInMonth ; c++)
            {
                calendar += drawDay(c,'current',true);
            }


            /*------------*\
                MONTH +1
            \*------------*/
            var nextMonth = 0;
            var cA = _calcAfter(year,month);
            if(cA !== 1)
            {
                for(var a = 0 ; a <= 7-cA ; a++)
                {
                    nextMonth++;
                    calendar += drawDay(nextMonth,'after');
                }
            }

            //to have 6 rows in calendar
            //@todo to think
//            if(cA !== 2 && cA !== 0)
//            {
//                for(var a = 0 ; a < 7 ; a++)
//                {
//                    nextMonth++;
//                    calendar += drawDay(nextMonth,'super after');
//                }
//            }




            calendar += '';
            calendar += '';
            calendar += '';
            calendar += '';
            calendar += '';

            calendar += '</div>';
            return calendar;

            function drawDay(day,elementClass,drawEvents){
                drawEvents = typeof drawEvents !== 'undefined' ? drawEvents : false;
                
                if(typeof elementClass === 'undefined')
                    elementClass = '';
                var dD = '';
                dD += '<div class="ds-day '+elementClass+'">';
                dD += '<div class="ds-day-header">'+day+'</div>';
                dD += '<div class="ds-events">';

                if(drawEvents)
                {
                    var events = _getEvents(day,month,year);
                    for(var e = 0 ; e < events.length ; e++)
                    {
                        dD += '<div class="ds-event" id="'+events[e].id+'">'+events[e].title+'</div>';
                    }

                }

                dD += '</div>';
                dD += '</div>';
                return dD;
            }
            
            function _calcBefore(year,month){
//                console.log("Before: ",month,year);
                
//                if(month < 0)
//                {
//                    month=11;
//                    year--;
//                }

                var f = firstDayPosition(year,month,0)-1;

               
                if(f < 0)
                    return 6;
                else
                    return f;
            }

            function _calcAfter(year,month){
//                console.log("After: ",month,year);
                
                month++;
//                if(month > 11)
//                {
//                    month = 0;
//                    year++;
//                }
                

                return firstDayPosition(year,month,0);
            }
            
            function _getEvents(day,month,year){
                return _.filter(sampleEvents, function (sE) {
                    return moment(new Date(year, month, day)) < new Date(sE.date) 
                        && new Date(sE.date) < moment(new Date(year, month, day)).add(1, 'd');
                });
            }

            function monthDays(year,month) {
                month++;
                var d = new Date(year,month, 0);
//                console.log(d.getDate());
                return d.getDate();
            }

            function firstDayPosition(year,month,offset) {
                var mom = moment();
                mom.set('year',year);
                mom.set('month',month);
                mom.date(1);
//                console.log(mom.format('DD MM YYYY'));
                return mom.day()+offset;
            }
        }

        function _drawModalEvent(event){
            console.warn(event);
            var eventDetails = "";

            eventDetails += '<div class="ds-event-modal">';
            eventDetails += '<div class="container">';
            eventDetails += '<div class="header">';
            eventDetails += '<p class="title">'+event.title+'</p>';
            eventDetails += '<p class="date">'+moment(event.date).locale(settings.lang).format(settings.formatEvent)+'</p>';
            eventDetails += '</div>';
            eventDetails += '<div class="content">';
            eventDetails += '<p class="type">'+event.type+'</p>';
            eventDetails += '<p class="description">'+event.description+'</p>';
            eventDetails += '<p class="url">'+event.url+'</p>';
            eventDetails += '</div>';
            eventDetails += '<div class="footer">';
            eventDetails += '<div class="close-button">';
            eventDetails += settings.closeText;
            eventDetails += '</div>';
            eventDetails += '</div>';
            eventDetails += '</div>';
            eventDetails += '</div>';
            
            return eventDetails;
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
    startFrom: 1, //0 - Sunday, 1 - Monday etc.
    eventsInDay: 3,
    mode: 'calendar',
    closeText: 'close'
};


var data = [];