import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of, switchMap } from 'rxjs';
import { EmailType } from '../../../core/enums/email-type';
import { getErrorMessages } from '../../../core/utils/get-error-message';
import { EmailsService } from '../../services/emails.service';

@Component({
    selector: 'app-emails-handler-page',
    templateUrl: './emails-handler-page.component.html',
    styleUrl: './emails-handler-page.component.scss',
})
export class EmailsHandlerPageComponent {
    token!: string;
    emailType!: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private emailsService: EmailsService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        var observer = {
            next: (token: unknown) => {
                if (this.emailType == EmailType.EmailConfirmation) {
                    this.router.navigate(['/main/users']);
                } else if (this.emailType == EmailType.OwnerInvitation) {
                    this.router.navigate(['/main/salons/my-salons']);
                } else if (this.emailType == EmailType.WorkerInvitation) {
                    this.router.navigate(['/main/bookings/my-calendar']);
                } else if (
                    this.emailType == EmailType.RestorePassword &&
                    typeof token == 'string'
                ) {
                    this.router.navigate(['/public/restore-password'], {
                        queryParams: { token },
                    });
                }
            },
            error: (httpError: HttpErrorResponse) => {
                console.log(httpError);
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.route.queryParams
            .pipe(
                switchMap((params) => {
                    this.emailType = parseInt(params['email-type']);
                    this.token = params['token'];

                    if (this.emailType == EmailType.EmailConfirmation) {
                        return this.emailsService.changeEmail(this.token);
                    } else if (this.emailType == EmailType.OwnerInvitation) {
                        return this.emailsService.inviteOwner(this.token);
                    } else if (this.emailType == EmailType.WorkerInvitation) {
                        return this.emailsService.inviteWorker(this.token);
                    } else {
                        return of(this.token);
                    }
                }),
            )
            .pipe(delay(500))
            .subscribe(observer);
    }
}
