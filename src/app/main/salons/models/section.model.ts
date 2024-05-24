import { Category } from './category.model';

export interface Section {
    id: string;
    name: string;
    pictureUrl: string;
    order: number;
    categories: Category[];
}
