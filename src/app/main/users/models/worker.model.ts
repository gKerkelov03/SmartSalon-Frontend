import { User } from './user.model';

export interface Worker extends User {
    salons: string[];
    jobTitles: string[];
    nickname: string;
}
