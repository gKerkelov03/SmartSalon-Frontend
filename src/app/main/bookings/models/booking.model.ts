export interface Booking {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    durationInMinutes: number;

    serviceName: string;
    customerName: string;
    workerNickname: string;
    salonName: string;
    salonProfilePictureUrl: string;

    serviceId: string;
    customerId: string;
    salonId: string;
    workerId: string;
}
