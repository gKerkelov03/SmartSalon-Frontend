export interface ServiceRequest {
    name: string;
    description: string;
    price: number;
    durationInMinutes: number;
    salonId: string;
    categoryId: string;
    order: number;
    jobTitlesIds: string[];
}
