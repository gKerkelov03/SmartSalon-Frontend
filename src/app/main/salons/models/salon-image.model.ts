export interface Salon {
    name: string;
    Description: string;
    Location: string;
    ProfilePictureUrl?: string;
    DefaultTimePenalty: number;
    DefaultBookingsInAdvance: number;
    SubscriptionsEnabled: boolean;
    SectionsEnabled: boolean;
    WorkersCanMoveBookings: boolean;
    WorkersCanSetNonWorkingPeriods: boolean;
    WorkingTimeId: string;
    CurrencyId: string;
    Owners: string[];
    Workers: string[];
    Specialties: string[];
    Sections: string[];
    Categories: string[];
    Services: string[];
    Images: string[];
}
