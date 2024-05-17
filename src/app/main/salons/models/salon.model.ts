import { Currency } from './currency.model';
import { Image } from './image.model';
import { Specialty } from './specialty.model';

export interface Salon {
    id: string;
    name: string;
    description: string;
    googleMapsLocation: string;
    country: string;
    profilePictureUrl: string | null;
    workingTimeId: string;

    timePenalty: number;
    bookingsInAdvance: number;
    subscriptionsEnabled: boolean;
    workersCanMoveBookings: boolean;
    workersCanSetNonWorkingPeriods: boolean;

    mainCurrency: Currency;
    otherAcceptedCurrencies: Currency[];
    specialties: Specialty[];
    images: Image[];
    owners: string[];
    workers: string[];
    sections: string[];
}
