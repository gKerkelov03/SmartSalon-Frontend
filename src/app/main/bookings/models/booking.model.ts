export interface Booking {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    durationInMinutes: number;
    ServiceId: string;
    CustomerId: string;
    SalonId: string;
    WorkerId: string;
}
