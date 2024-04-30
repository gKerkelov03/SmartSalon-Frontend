import { RegisterRequest } from '../../../core/models/register-request.model';

export interface CreateWorkerRequest extends RegisterRequest {
    salonId: string;
    nickname: string;
    jobtitle: string;
}
