import { RegisterRequest } from '../../../core/models/register-request.model';

export interface CreateOwnerRequest extends RegisterRequest {
    salonId: string;
}
