export function startOfWeek(dayNumber: number): void;

export function sameDate(left: Date, right: Date): boolean;

export function sameWeek(left: Date, right: Date): boolean;

export function sameDateTime(left: Date, right: Date): boolean;

export function floorDay(date: Date): Date;

export function ceilDay(date: Date): Date;

export function floorWeek(date: Date): Date;

export function ceilWeek(date: Date): Date;

export function dateRange(dates: Array<Date>): DateRange;

export function inRange(date: Date, range: DateRange): boolean;

export interface DateRange {
    start: Date;
    end: Date;
}