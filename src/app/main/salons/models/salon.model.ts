import { Currency } from './currency.model';
import { Image } from './image.model';
import { JobTitle } from './job-title.model';
import { Specialty } from './specialty.model';

export interface Salon {
    id: string;
    name: string;
    description: string;
    googleMapsLocation: string;
    latitude: string;
    longitude: string;
    country: string;
    profilePictureUrl: string | null;
    workingTimeId: string;

    timePenalty: number;
    bookingsInAdvance: number;
    subscriptionsEnabled: boolean;
    workersCanMoveBookings: boolean;
    workersCanSetNonWorkingPeriods: boolean;
    workersCanDeleteBookings: boolean;

    mainCurrency: Currency;
    otherAcceptedCurrencies: Currency[];
    specialties: Specialty[];
    jobTitles: JobTitle[];
    images: Image[];
    owners: string[];
    workers: string[];
    sections: string[];
}
