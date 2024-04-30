import { User } from './user.model';

export interface Customer extends User {
    //TODO: add customers controller and get by id action
    subscriptions: string[];
    bookings: string[];
}
