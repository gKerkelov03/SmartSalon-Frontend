import { User } from './user.model';

export interface Worker extends User {
    salonId: string;
    jobTitle: string;
    nickname: string;
}
