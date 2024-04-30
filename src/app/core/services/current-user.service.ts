import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    finalize,
    of,
    retry,
    switchMap,
    throwError,
} from 'rxjs';
import { UsersService } from '../../main/users/services/users.service';
import { jwtTokenKey } from '../constants/local-storage-keys';
import { Role } from '../enums/role';
import { User } from '../models/user.model';
import { parseJwt } from '../utils/parse-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService {
    public static initialized: boolean = false;

    private currentUserSubject: BehaviorSubject<User | null> =
        new BehaviorSubject<User | null>(null);

    public currentUserObservable: Observable<User | null> =
        this.currentUserSubject.asObservable().pipe(
            switchMap((user) => {
                if (!CurrentUserService.initialized) {
                    return throwError(
                        () =>
                            new Error('CurrentUserService not initialized yet')
                    );
                }

                return of(user);
            }),
            retry({ delay: 100 })
        );

    constructor(
        private usersService: UsersService,
        localStorageService: LocalStorageService
    ) {
        const jwtToken = localStorageService.getItem(jwtTokenKey);

        if (jwtToken === null) {
            CurrentUserService.initialized = true;
            return;
        }

        //TODO: if the jwt in the local storage is invalid(manually changed) there will be some bug probably
        const decodedJwt = parseJwt(jwtToken.toString());

        this.usersService
            .getById(decodedJwt.sub)
            .pipe(finalize(() => (CurrentUserService.initialized = true)))
            .subscribe((user: User) => this.currentUserSubject.next(user));
    }

    get currentUser(): User | null {
        if (!CurrentUserService.initialized) {
            throw new Error(
                'You are trying to access the current user before the CurrentUserService has determined it. You cannot use the currentUser property in your case and you should consider subscribing to the currentUserObservable property to get notified when the current user is determined'
            );
        }

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
