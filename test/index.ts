import chai = require('chai');
import * as Types from '../index';

import * as DE from '../date-equality';
var expect = chai.expect;

var baseDate = new Date(2015, 0, 1); // Thu, 1 Jan 2015
var dates = [];

describe('equivalence tests', () => {

    it('will find two dates equivalent', () => {
        var first = new Date(2015, 1, 1, 1, 1, 1);
        var second = new Date(2015, 1, 1, 23, 59, 59);
        expect(DE.sameDate(first, second)).to.be.true;
    });

    it('will find two dates to not be equivalent', () => {
        var first = new Date(2015, 1, 1, 1, 1, 1);
        var second = new Date(2015, 1, 2, 0, 0, 1);
        expect(DE.sameDate(first, second)).to.be.false;
    });

    it('will find two days are in the same week', () => {
        var first = new Date(2015, 8, 13, 0, 0, 0); // Sun 13 Sep 2015 00:00:00
        var second = new Date(2015, 8, 19, 23, 59, 59); // Sun 19 Sep 2015 23:59:59
        expect(DE.sameWeek(first, second)).to.be.true;
    });

    it('will find two are are not in the same week', () => {
        var first = new Date(2015, 8, 13, 0, 0, 0); // Sun 13 Sep 2015
        var second = new Date(2015, 8, 20, 0, 0, 0); // Sun 20 Sep 2015 00:00:00
        expect(DE.sameWeek(first, second)).to.be.false;
    });

    it('will find that a date is in range of a DateRange', () => {
        var range = {
            start: getDate(),
            end: getDate(3)
        };
        expect(DE.inRange(getDate(), range)).to.be.true;
        expect(DE.inRange(getDate(1), range)).to.be.true;
        expect(DE.inRange(getDate(2), range)).to.be.true;
        expect(DE.inRange(getDate(3), range)).to.be.true;
    });

    it('will find that a date is not in range of a DateRange', () => {
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

describe('start/end day value tests', () => {
    it('will find endDay:6 when start:0', () => {
        expect(DE.endDay(0)).to.equal(6);
    });

    it('will find endDay:0 when start:1', () => {
        expect(DE.endDay(1)).to.equal(0);
    });

    it('will find endDay:1 when start:2', () => {
        expect(DE.endDay(2)).to.equal(1);
    });

    it('will find endDay:2 when start:3', () => {
        expect(DE.endDay(3)).to.equal(2);
    });

    it('will find endDay:3 when start:4', () => {
        expect(DE.endDay(4)).to.equal(3);
    });

    it('will find endDay:4 when start:5', () => {
        expect(DE.endDay(5)).to.equal(4);
    });

    it('will find endDay:5 when start:6', () => {
        expect(DE.endDay(6)).to.equal(5);
    });

    it('will amend a value outside of 0-6 that is provided to startDay', () => {
        expect(DE.startDay(7)).to.equal(0);
        expect(DE.endDay(7)).to.equal(6);
    });
})

describe('floor and ceiling tests', () => {

    it('will floor a given date', () => {
        var now = new Date();
        var floor = DE.floorDay(now);
        var expected = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

        expect(floor.toUTCString()).to.equal(expected.toUTCString());
    });

    it('will ceil a given date', () => {
        var now = new Date();
        var ceil = DE.ceilDay(now);
        var expected = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        expect(ceil.toUTCString()).to.equal(expected.toUTCString());
    });

    it('will ceil a date that has 00:00:00 time to 23:59:59.999 the same day', () => {
        var testDate = new Date(2015, 1, 1, 0, 0, 0);
        var ceil = DE.ceilDay(testDate);
        var expected = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate(), 23, 59, 59, 999);

        expect(ceil.toUTCString()).to.equal(expected.toUTCString());
    });

    it('will floor a date to start of week', () => {
        var now = new Date(2015, 8, 16); // Wed 16 Sep 2015
        var floor = DE.floorWeek(now);
        var expected = new Date(2015, 8, 13, 0, 0, 0); // Sun 13 Sep 2015
        
        expect(floor.toUTCString()).to.equal(expected.toUTCString());
    });

    it('will ceil a date to end of week', () => {
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

describe('get events tests', () => {
    addRange(0); // Thu 1 Jan
    addRange(1); // Fri 2 Jan
    addRange(2); // Sat 3 Jan

    it('will find the date range', () => {
        var extremes = DE.dateRange(dates);
        var start = extremes.start;
        var end = extremes.end;
        
        expect(DE.sameDate(start, dates[0])).to.equal(true);
        expect(DE.sameDate(end, dates[2])).to.equal(true);
    });
    
});

function addDate(daysFromNow?: number) {
    dates.push(getDate(daysFromNow));
}

function addRange(startDaysFromNow: number) {
    var date = getDate(startDaysFromNow);
    dates.push(date);
}

function getDate(daysFromNow?: number) {
    daysFromNow = daysFromNow || 0;
    var date = new Date(baseDate.getTime());

    date.setDate(date.getDate() + daysFromNow);
    return date;
}