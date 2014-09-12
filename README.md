JSONEventCalendar
=================

Description
-----------

JSONEventCalendar is jQuery plugin to create calendar which shows events in JSON format.
Each event has element like: title, date and time, type, link and more.

You can set own date format to show on list of events, choose colors of events and more - check feature list.

index.html is example

Progress
-----------

![progress of project](http://dszymczuk.pl/progressbar/jsonevent?id=1)



Features
-----------

 - Events are JSON objects of event
 - Date format for event and title of calendar
 - Colors for event type


How to use
-----------
Call JSONEventCalendar on element in HTML and pass event as parametr.
One event have:

* id - need to show correct event details
* type - name of type (optional)
* color - color of type
* title - need to show on list
* url - url (optional)
* description
* date - correct date

Option for JSONEventCalendar:

* lang - language from moment
* formatTitle - display format ; check here: http://momentjs.com/docs/#/displaying/format/
* formatEvent - display format ; check here: http://momentjs.com/docs/#/displaying/format/
* startFrom - first day of week ; 0 - Sunday, 1 - Monday etc.
* eventsInDay - FUTURE FEATURE ; how many events display in day of calendar
* closeText - override default text
* typeText - override default text


Version
-----------
1.0
 
License
-----------
MIT

Changelog
-----------
1.0 First release

0.1 Initial version

Languages
-----------
Multilanguage - support by moment.js
