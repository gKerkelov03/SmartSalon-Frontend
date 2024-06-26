import { JobTitle } from './job-title.model';

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    durationInMinutes: number;
    salonId: string;
    categoryId: string;
    order: number;
    jobTitles: JobTitle[];

    [index: string]: any;
}
