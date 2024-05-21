export interface WorkingTime {
    id: string;
    salonId: string;

    mondayIsWorking: boolean;
    mondayOpeningTime: string;
    mondayClosingTime: string;

    tuesdayIsWorking: boolean;
    tuesdayOpeningTime: string;
    tuesdayClosingTime: string;

    wednesdayIsWorking: boolean;
    wednesdayOpeningTime: string;
    wednesdayClosingTime: string;

    thursdayIsWorking: boolean;
    thursdayOpeningTime: string;
    thursdayClosingTime: string;

    fridayIsWorking: boolean;
    fridayOpeningTime: string;
    fridayClosingTime: string;

    saturdayIsWorking: boolean;
    saturdayOpeningTime: string;
    saturdayClosingTime: string;

    sundayIsWorking: boolean;
    sundayOpeningTime: string;
    sundayClosingTime: string;

    [propertyName: string]: string | boolean;
}
