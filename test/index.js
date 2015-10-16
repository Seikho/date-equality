var chai = require('chai');
var DE = require('../date-equality');
var expect = chai.expect;
var baseDate = new Date(2015, 0, 1); // Thu, 1 Jan 2015
var dates = [];
describe('equivalence tests', function () {
    it('will find two dates equivalent', function () {
        var first = new Date(2015, 1, 1, 1, 1, 1);
        var second = new Date(2015, 1, 1, 23, 59, 59);
        expect(DE.sameDate(first, second)).to.be.true;
    });
    it('will find two dates to not be equivalent', function () {
        var first = new Date(2015, 1, 1, 1, 1, 1);
        var second = new Date(2015, 1, 2, 0, 0, 1);
        expect(DE.sameDate(first, second)).to.be.false;
    });
    it('will find two days are in the same week', function () {
        var first = new Date(2015, 8, 13, 0, 0, 0); // Sun 13 Sep 2015 00:00:00
        var second = new Date(2015, 8, 19, 23, 59, 59); // Sun 19 Sep 2015 23:59:59
        expect(DE.sameWeek(first, second)).to.be.true;
    });
    it('will find two are are not in the same week', function () {
        var first = new Date(2015, 8, 13, 0, 0, 0); // Sun 13 Sep 2015
        var second = new Date(2015, 8, 20, 0, 0, 0); // Sun 20 Sep 2015 00:00:00
        expect(DE.sameWeek(first, second)).to.be.false;
    });
    it('will find that a date is in range of a DateRange', function () {
        var range = {
            start: getDate(),
            end: getDate(3)
        };
        expect(DE.inRange(getDate(), range)).to.be.true;
        expect(DE.inRange(getDate(1), range)).to.be.true;
        expect(DE.inRange(getDate(2), range)).to.be.true;
        expect(DE.inRange(getDate(3), range)).to.be.true;
    });
    it('will find that a date is not in range of a DateRange', function () {
        var range = {
            start: getDate(),
            end: getDate(3)
        };
        range.end.setSeconds(range.end.getSeconds() - 1);
        var justBefore = new Date(getDate().setSeconds(getDate().getSeconds() - 1));
        var justAfter = new Date(getDate(3).setSeconds(getDate(3).getSeconds() + 1));
        expect(DE.inRange(justBefore, range)).to.be.false;
        expect(DE.inRange(justAfter, range)).to.be.false;
    });
});
describe('start/end day value tests', function () {
    it('will find endDay:6 when start:0', function () {
        DE.startOfWeek(0);
        expect(DE.endDay()).to.equal(6);
    });
    it('will find endDay:0 when start:1', function () {
        DE.startOfWeek(1);
        expect(DE.endDay()).to.equal(0);
    });
    it('will find endDay:1 when start:2', function () {
        DE.startOfWeek(2);
        expect(DE.endDay()).to.equal(1);
    });
    it('will find endDay:2 when start:3', function () {
        DE.startOfWeek(3);
        expect(DE.endDay()).to.equal(2);
    });
    it('will find endDay:3 when start:4', function () {
        DE.startOfWeek(4);
        expect(DE.endDay()).to.equal(3);
    });
    it('will find endDay:4 when start:5', function () {
        DE.startOfWeek(5);
        expect(DE.endDay()).to.equal(4);
    });
    it('will find endDay:5 when start:6', function () {
        DE.startOfWeek(6);
        expect(DE.endDay()).to.equal(5);
    });
    it('will amend a value outside of 0-6 that is provided to startDay', function () {
        DE.startOfWeek(7);
        expect(DE.startDay()).to.equal(0);
        expect(DE.endDay()).to.equal(6);
    });
});
describe('floor and ceiling tests', function () {
    it('will floor a given date', function () {
        var now = new Date();
        var floor = DE.floorDay(now);
        var expected = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        expect(floor.toUTCString()).to.equal(expected.toUTCString());
    });
    it('will ceil a given date', function () {
        var now = new Date();
        var ceil = DE.ceilDay(now);
        var expected = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        expect(ceil.toUTCString()).to.equal(expected.toUTCString());
    });
    it('will ceil a date that has 00:00:00 time to 23:59:59.999 the same day', function () {
        DE.startOfWeek(0);
        var testDate = new Date(2015, 1, 1, 0, 0, 0);
        var ceil = DE.ceilDay(testDate);
        var expected = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate(), 23, 59, 59, 999);
        expect(ceil.toUTCString()).to.equal(expected.toUTCString());
    });
    it('will floor a date to start of week', function () {
        var now = new Date(2015, 8, 16); // Wed 16 Sep 2015
        var floor = DE.floorWeek(now);
        var expected = new Date(2015, 8, 13, 0, 0, 0); // Sun 13 Sep 2015
        expect(floor.toUTCString()).to.equal(expected.toUTCString());
    });
    it('will ceil a date to end of week', function () {
        var now = new Date(2015, 8, 16); // Wed 16 Sep 2015 00:00:00
        var ceil = DE.ceilWeek(now);
        var expected = new Date(2015, 8, 19); // Sun 19 Sep 2015 23:59:59.000
        expect(DE.sameDate(ceil, expected)).to.be.true;
        expect(ceil.getHours()).to.equal(23);
        expect(ceil.getMinutes()).to.equal(59);
        expect(ceil.getSeconds()).to.equal(59);
        expect(ceil.getMilliseconds()).to.equal(999);
    });
});
describe('get events tests', function () {
    addRange(0); // Thu 1 Jan
    addRange(1); // Fri 2 Jan
    addRange(2); // Sat 3 Jan
    it('will find the date range', function () {
        var extremes = DE.dateRange(dates);
        var start = extremes.start;
        var end = extremes.end;
        expect(DE.sameDate(start, dates[0])).to.equal(true);
        expect(DE.sameDate(end, dates[2])).to.equal(true);
    });
});
function addDate(daysFromNow) {
    dates.push(getDate(daysFromNow));
}
function addRange(startDaysFromNow) {
    var date = getDate(startDaysFromNow);
    dates.push(date);
}
function getDate(daysFromNow) {
    daysFromNow = daysFromNow || 0;
    var date = new Date(baseDate.getTime());
    date.setDate(date.getDate() + daysFromNow);
    return date;
}
