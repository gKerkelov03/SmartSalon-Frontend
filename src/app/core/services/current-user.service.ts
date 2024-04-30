import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, finalize } from 'rxjs';
import { UsersService } from '../../main/users/services/users.service';
import { jwtTokenKey } from '../constants/local-storage-keys';
import { Role } from '../enums/role';
import { Customer } from '../models/customer.model';
import { Owner } from '../models/owner.model';
import { User } from '../models/user.model';
import { Worker } from '../models/worker.model';
import { parseJwt } from '../utils/parse-jwt';
import { LocalStorageService } from './local-storage.service';
import { OwnersService } from './owners.service';
import { WorkersService } from './workers.service';

type UserType = Worker | Owner | Customer | User | null;

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService {
    private currentUserSubject: BehaviorSubject<User | null> =
        new BehaviorSubject<UserType>(null);

    public currentUserObservable: Observable<User | null> =
        this.currentUserSubject.asObservable();

    public static initialized: Subject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(
        private usersService: UsersService,
        private ownersService: OwnersService,
        private workersService: WorkersService,
        private snackBar: MatSnackBar,
        localStorageService: LocalStorageService
    ) {
        const jwtToken = localStorageService.getItem(jwtTokenKey);

        if (jwtToken === null) {
            CurrentUserService.initialized.next(true);
            return;
        }

        //TODO: if the jwt in the local storage is invalid(manually changed) there will be some bug probably
        const decodedJwt = parseJwt(jwtToken.toString());

        this.usersService
            .getById(decodedJwt.sub)
            .pipe(finalize(() => CurrentUserService.initialized.next(true)))
            .subscribe((user: User) => this.currentUserSubject.next(user));
    }

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

    setCurrentUser(user: User): void {
        // var observer = {
        //     next: (user: UserType) => {
        //         console.log(user);
        //         this.currentUserSubject.next(user);
        //     },
        //     error: (httpError: HttpErrorResponse) => {
        //         this.snackBar.open(getErrorMessage(httpError), 'Close');
        //     },
        // };

        if (user === null) {
            this.currentUserSubject.next(null);
            return;
        }
        console.log(user);
        this.currentUserSubject.next(user);
        // else {
        //     this.usersService
        //         .getById(user.id)
        //         .pipe(
        //             switchMap((user: any) => {
        //                 if (user.roles.includes(Role.Worker)) {
        //                     return this.workersService.getById(user.id);
        //                 }

        //                 if (user.roles.includes(Role.Owner)) {
        //                     return this.ownersService.getById(user.id);
        //                 }

        //                 if (user.roles.includes(Role.Customer)) {
        //                     return this.workersService.getById(user.id);
        //                 }

        //                 return of(user);
        //             })
        //         )
        // .subscribe(observer);
        // }
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
