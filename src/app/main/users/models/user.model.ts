export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    profilePictureUrl: string;
    roles: string[];
}
