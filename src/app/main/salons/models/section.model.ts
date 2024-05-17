import { Category } from './category.model';

export interface Section {
    Name: string;
    SalonId: string;
    Categories: Category[];
}
