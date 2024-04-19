import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { UsersService } from '../../main/users/services/users.service';
import { Role } from '../enums/role';
import { Customer } from '../models/customer.model';
import { Owner } from '../models/owner.model';
import { RegisterResponse } from '../models/register-response.model';
import { User } from '../models/user.model';
import { Worker } from '../models/worker.model';
import { getErrorMessage } from '../utils/get-error-message';
import { OwnersService } from './owners.service';
import { WorkersService } from './workers.service';

type UserType = Worker | Owner | Customer | User | null;

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService {
    private currentUserSubject: BehaviorSubject<UserType | null> =
        new BehaviorSubject<UserType>(null);

    public currentUserObservable: Observable<UserType | null> =
        this.currentUserSubject.asObservable();

    constructor(
        private usersService: UsersService,
        private ownersService: OwnersService,
        private workersService: WorkersService,
        private snackBar: MatSnackBar
    ) {}

    get currentUser(): UserType | null {
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

    setCurrentUser(user: RegisterResponse | null): void {
        var observer = {
            next: (user: UserType) => {
                this.currentUserSubject.next(user);
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessage(httpError), 'Close');
            },
        };

        if (user === null) {
            this.currentUserSubject.next(null);
        } else {
            this.usersService
                .getById(user.id)
                .pipe(
                    switchMap((user: any) => {
                        if (user.roles.includes(Role.Worker)) {
                            return this.workersService.getById(user.id);
                        }

                        if (user.roles.includes(Role.Owner)) {
                            return this.ownersService.getById(user.id);
                        }

                        if (user.roles.includes(Role.Customer)) {
                            return this.workersService.getById(user.id);
                        }

                        return of(user);
                    })
                )
                .subscribe(observer);
        }
    }

    clearCurrentUser(): void {
        this.currentUserSubject.next(null);
    }

    private hasRole(role: Role): boolean {
        return (
            this.currentUserSubject.getValue()?.roles.includes(role) ?? false
        );
    }
}
