import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../enums/role';
import { RegisterCustomerResponse } from '../models/register-customer-response.model';

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService {
    private currentUserSubject: BehaviorSubject<RegisterCustomerResponse | null> =
        new BehaviorSubject<RegisterCustomerResponse | null>(null);

    currentUserObservable: Observable<RegisterCustomerResponse | null> =
        this.currentUserSubject.asObservable();

    get currentUser(): RegisterCustomerResponse | null {
        return this.currentUserSubject.getValue();
    }

    get isCustomer(): boolean {
        return this.hasRole(Role.Customer);
    }

    get isOwner(): boolean {
        return this.hasRole(Role.Owner);
    }

    get isWorker(): boolean {
        return this.hasRole(Role.Worker);
    }

    get isAdmin(): boolean {
        return this.hasRole(Role.Admin);
    }

    setCurrentUser(user: RegisterCustomerResponse): void {
        if (user === null) {
            this.clearCurrentUser();
            return;
        }

        this.currentUserSubject.next(user);
    }

    clearCurrentUser(): void {
        this.currentUserSubject.next(null);
    }

    private hasRole(role: Role): boolean {
        const currentUserRole: Role | undefined =
            this.currentUserSubject.getValue()?.role as Role;

        if (currentUserRole === undefined) {
            return false;
        }

        return currentUserRole === role;
    }
}
