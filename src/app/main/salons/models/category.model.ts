import { Service } from './service.model';

export interface Category {
    id: string;
    name: string;
    order: number;
    services: Service[];
}
