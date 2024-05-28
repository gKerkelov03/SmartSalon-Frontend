import { DayOfWeek } from '../enums/day-of-week';

const days = [
    DayOfWeek.Sunday,
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
];

export function getDay(dateDay: number): DayOfWeek {
    return days[dateDay];
}
