export function startDay(dayNumber?: number): number;

export function endDay(dayNumber?: number): number;

export function sameDate(left: Date, right: Date): boolean;

export function sameWeek(left: Date, right: Date, startOfWeek?: number): boolean;

export function sameDateTime(left: Date, right: Date): boolean;

export function floorDay(date: Date): Date;

export function ceilDay(date: Date): Date;

export function floorWeek(date: Date, startOfWeek?: number): Date;

export function ceilWeek(date: Date, startOfWeek?: number): Date;

export function dateRange(dates: Array<Date>): DateRange;

export function inRange(date: Date, range: DateRange): boolean;

export interface DateRange {
    start: Date;
    end: Date;
}