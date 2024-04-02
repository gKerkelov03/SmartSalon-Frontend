import { RegisterCustomerRequest } from './register-customer-request.model';

export interface RegisterCustomerResponse extends RegisterCustomerRequest {
    id: string;
    role: string;
}
