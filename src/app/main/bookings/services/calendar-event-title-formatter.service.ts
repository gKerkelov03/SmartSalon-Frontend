import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';

@Injectable()
export class CustomCalendarEventTitleFormatter extends CalendarEventTitleFormatter {
    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
    }

    override month(event: CalendarEvent): string {
        return `<b>${formatDate(event.start, 'h:mm a', this.locale)}</b> ${
            event.title
        }`;
    }

    override week(event: CalendarEvent): string {
        return `<b>${formatDate(event.start, 'h:mm a', this.locale)}</b> ${
            event.title
        }`;
    }

    override day(event: CalendarEvent): string {
        return `<b>${formatDate(event.start, 'h:mm a', this.locale)}</b> ${
            event.title
        }`;
    }
}
