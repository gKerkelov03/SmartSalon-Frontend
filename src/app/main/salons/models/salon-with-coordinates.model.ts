import { Salon } from './salon.model';

export interface SalonWithCoordinates extends Salon {
    coordinates: { lat: number; lng: number };
}
