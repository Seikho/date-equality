import DE = require('./index.d.ts');

var startDayOfWeek = 0;
var endDayOfWeek = 6;

export function startOfWeek(dayNumber: number) {
    startDayOfWeek = Math.abs(dayNumber) % 7;
    endDayOfWeek = startDayOfWeek === 0 ? 6 : this.startDay() - 1;
}

export function startDay() {
    return startDayOfWeek;
}

export function endDay() {
    return endDayOfWeek;
}

export function sameDate(left: Date, right: Date) {
    var sameYear = left.getFullYear() === right.getFullYear();
    var sameMonth = left.getMonth() === right.getMonth();
    var sameDay = left.getDate() === right.getDate();

    return sameYear && sameMonth && sameDay;
}

export function sameWeek(left: Date, right: Date) {
    var sameYear = left.getFullYear() === right.getFullYear();
    var sameMonth = left.getMonth() === right.getMonth();
    if (!sameYear || !sameMonth) return false;

    var leftFloor = floorWeek(left);
    var leftCeil = ceilWeek(left);

    return right >= leftFloor && right <= leftCeil;
}

export function inRange(date: Date, dateRange: DE.DateRange) {    
    return date >= dateRange.start && date <= dateRange.end;
}

export function sameDateTime(left: Date, right: Date) {
    var sameHour = left.getHours() === right.getHours();
    var sameMinutes = left.getMinutes() === right.getMinutes();
    var sameSeconds = left.getSeconds() === right.getSeconds();

    return sameDate(left, right) && sameHour && sameMinutes && sameSeconds;
}

export function floorDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function ceilDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function floorWeek(date: Date) {
    var currentDay = date.getDay();
    var toDay = startDayOfWeek;
    var downDate = new Date(date.getTime());

    if (currentDay > toDay)
        downDate.setDate(downDate.getDate() - (currentDay - toDay));

    if (currentDay < toDay)
        downDate.setDate(downDate.getDate() - (currentDay + (7 - toDay)));

    return floorDay(downDate);
}

export function ceilWeek(date: Date) {
    var currentDay = date.getDay();
    var toDay = endDayOfWeek;
    var upDate = new Date(date.getTime());

    if (currentDay > toDay)
        upDate.setDate(upDate.getDate() + (7 - currentDay + toDay));

    if (currentDay < toDay)
        upDate.setDate(upDate.getDate() + (toDay - currentDay));

    return ceilDay(upDate);
}

export function dateRange(dates: Array<Date>): DE.DateRange {
    var start, end;

    dates.forEach(date => {
        if (start == null || date < start) start = new Date(date.getTime());
        if (end == null || date > end) end = new Date(date.getTime());
    });

    if (start == null) start = new Date();
    if (end == null) end = new Date(start.getTime());
        
    start = floorDay(start);
    end = ceilDay(end);

    return { start, end };
}