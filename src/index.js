var startDayOfWeek = 0;
var endDayOfWeek = 6;
function startOfWeek(dayNumber) {
    startDayOfWeek = Math.abs(dayNumber) % 7;
    endDayOfWeek = startDayOfWeek === 0 ? 6 : this.startDay() - 1;
}
exports.startOfWeek = startOfWeek;
function sameDate(left, right) {
    var sameYear = left.getFullYear() === right.getFullYear();
    var sameMonth = left.getMonth() === right.getMonth();
    var sameDay = left.getDate() === right.getDate();
    return sameYear && sameMonth && sameDay;
}
exports.sameDate = sameDate;
function sameWeek(left, right) {
    var sameYear = left.getFullYear() === right.getFullYear();
    var sameMonth = left.getMonth() === right.getMonth();
    if (!sameYear || !sameMonth)
        return false;
    var leftFloor = floorWeek(left);
    var leftCeil = ceilWeek(left);
    return right >= leftFloor && right <= leftCeil;
}
exports.sameWeek = sameWeek;
function sameDateTime(left, right) {
    var sameHour = left.getHours() === right.getHours();
    var sameMinutes = left.getMinutes() === right.getMinutes();
    var sameSeconds = left.getSeconds() === right.getSeconds();
    return sameDate(left, right) && sameHour && sameMinutes && sameSeconds;
}
exports.sameDateTime = sameDateTime;
function floorDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
exports.floorDay = floorDay;
function ceilDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
exports.ceilDay = ceilDay;
function floorWeek(date) {
    var currentDay = date.getDay();
    var toDay = startDayOfWeek;
    var downDate = new Date(date.getTime());
    if (currentDay > toDay)
        downDate.setDate(downDate.getDate() - (currentDay - toDay));
    if (currentDay < toDay)
        downDate.setDate(downDate.getDate() - (currentDay + (7 - toDay)));
    return floorDay(downDate);
}
exports.floorWeek = floorWeek;
function ceilWeek(date) {
    var currentDay = date.getDay();
    var toDay = endDayOfWeek;
    var upDate = new Date(date.getTime());
    if (currentDay > toDay)
        upDate.setDate(upDate.getDate() + (7 - currentDay + toDay));
    if (currentDay < toDay)
        upDate.setDate(upDate.getDate() + (toDay - currentDay));
    return ceilDay(upDate);
}
exports.ceilWeek = ceilWeek;
function dateRange(dates) {
    var start, end;
    dates.forEach(function (date) {
        if (start == null || date < start)
            start = new Date(date.getTime());
        if (end == null || date > end)
            end = new Date(date.getTime());
    });
    if (start == null)
        start = new Date();
    if (end == null)
        end = new Date(start.getTime());
    start = floorDay(start);
    end = ceilDay(end);
    return { start: start, end: end };
}
exports.dateRange = dateRange;
