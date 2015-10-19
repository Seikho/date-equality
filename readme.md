### Date Equality
Broader date equality checking and mutating

### Installation
```
npm install --save date-equality
```

### Usage
In the browser:
```html
<script src="date-equality.js"></script>
```

Node/RequireJS
```javascript
// Typescript/ES6
import * as DE from 'date-equality';

// ES5
var DE = require('date-equality');
```

### API

#### sameDate
Returns true if the two provided `Date` objects are on the same date
```javascript
function sameDate(left: Date, right: Date): boolean;
```

Returns true if the two provided `Date` objects are in the same week
#### sameWeek
```javascript
function sameWeek(left: Date, right: Date, startOfWeek?: number): boolean;
```

Returns true if the two provided `Date` objects have the same time (second precision)
#### sameDateTime
```javascript
function sameDateTime(left: Date, right: Date): boolean;
```

#### floorDay
Returns a new `Date` object that is the start (00h00m00s000ms) of the provided `Date` object  
```javascript
function floorDay(date: Date): Date;
```

#### ceilDay
Returns a new `Date` object that is the end (23h59m59s999ms) of the provided `Date` object
```javascript 
function ceilDay(date: Date): Date;
```


#### floorWeek
Returns a new `Date` object that is the beginning of the week and floored (`floorDay(Date)`)  
```javascript
function floorWeek(date: Date, startOfWeek?: number): Date;
```


#### ceilWeek
Returns a new `Date` object that is the end of the week and ceiled (`ceilDay(Date)`)
```javascript
function ceilWeek(date: Date, startOfWeek?: number): Date;
```


#### dateRange
Returns the lower and upper bounds as a `DateRange` object from an array of `Date` objects
```javascript
function dateRange(dates: Array<Date>): DateRange;
```


#### inRange
Returns true if the provided `Date` object is in the `DateRange` provided
```javascript
function inRange(date: Date, range: DateRange): boolean;
```

#### DateRange
```javascript
interface DateRange {
    start: Date;
    end: Date;
}
```