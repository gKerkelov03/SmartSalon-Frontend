import { CrudAction } from '../../../core/enums/crud-action';

export interface BookingChange {
    action: CrudAction;
    bookingId: string;
}
