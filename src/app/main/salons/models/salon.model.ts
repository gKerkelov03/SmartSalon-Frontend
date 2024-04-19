export interface Salon {
    name: string;
    description: string;
    location: string;
    profilePictureUrl?: string;
    workingTimeId: string;

    defaultTimePenalty: number;
    defaultBookingsInAdvance: number;
    subscriptionsEnabled: boolean;
    sectionsEnabled: boolean;
    workersCanMoveBookings: boolean;
    workersCanSetNonWorkingPeriods: boolean;

    currencies: string[];
    owners: string[];
    workers: string[];
    specialties: string[];
    sections: string[];
    categories: string[];
    services: string[];
    images: string[];
}
