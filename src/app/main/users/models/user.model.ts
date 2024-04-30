export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailConfirmed: boolean;
    phoneNumber: string;
    profilePictureUrl: string;
    roles: string[];
}
