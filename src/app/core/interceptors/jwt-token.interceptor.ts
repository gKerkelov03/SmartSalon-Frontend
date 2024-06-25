import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtTokenKey } from '../constants/local-storage-keys';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class JwtTokenInterceptor implements HttpInterceptor {
    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const jwt = this.localStorage.getItem(jwtTokenKey);

        if (jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
        }

        return next.handle(request).pipe(
            tap({
                next: () => {},
                error: (err: unknown) => {
                    // if (
                    //     err instanceof HttpErrorResponse &&
                    //     err.status === 401
                    // ) {
                    //     this.localStorage.clearStorage();
                    //     this.router.navigate(['public/login']);
                    // }
                },
            }),
        );
    }
}
