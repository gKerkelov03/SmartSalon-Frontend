import { User } from './user.model';

export interface Owner extends User {
    salonsOwned: string[];
}
