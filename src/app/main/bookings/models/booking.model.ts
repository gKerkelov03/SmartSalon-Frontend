export interface Booking {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    serviceDurationInMinutes: number;
    note: string;
    done: boolean;

    serviceName: string;
    customerFirstName: string;
    customerProfilePictureUrl: string;
    customerLastName: string;
    workerNickname: string;
    salonName: string;
    salonProfilePictureUrl: string;

    serviceId: string;
    customerId: string;
    salonId: string;
    workerId: string;
}
