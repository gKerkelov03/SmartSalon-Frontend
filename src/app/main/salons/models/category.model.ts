import { Service } from './service.model';

export interface Category {
    Name: string;
    SalonId: string;
    SectionId: string;
    Services: Service[];
}
