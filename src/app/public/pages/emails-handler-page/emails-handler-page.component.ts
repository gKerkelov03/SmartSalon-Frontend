import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of, switchMap } from 'rxjs';
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
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        var observer = {
            next: (response: unknown) => {
                if (this.emailType == EmailType.EmailConfirmation) {
                    this.router.navigate(['/main/users']);
                } else if (this.emailType == EmailType.OwnerInvitation) {
                    this.router.navigate(['/main/salons/my-salons']);
                } else if (this.emailType == EmailType.WorkerInvitation) {
                    this.router.navigate(['/main/bookings/my-calendar']);
                } else if (this.emailType == EmailType.RestorePassword) {
                    this.router.navigate(['/public/restore-password']);
                }
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(httpError.error.errors[0], 'Close');
            },
        };

        this.route.queryParams
            .pipe(
                switchMap((params) => {
                    this.token = params['token'];
                    this.emailType = parseInt(params['email-type']);

                    if (this.emailType == EmailType.EmailConfirmation) {
                        return this.emailsService.changeEmail(this.token);
                    } else if (this.emailType == EmailType.OwnerInvitation) {
                        return this.emailsService.inviteOwner(this.token);
                    } else if (this.emailType == EmailType.WorkerInvitation) {
                        return this.emailsService.inviteWorker(this.token);
                    } else if (this.emailType == EmailType.RestorePassword) {
                        //TODO: change
                        return this.emailsService.changeEmail(this.token);
                    } else {
                        return of(null);
                    }
                })
            )
            .pipe(delay(500))
            .subscribe(observer);
    }
}

enum EmailType {
    EmailConfirmation = 1,
    OwnerInvitation = 2,
    WorkerInvitation = 3,
    RestorePassword = 4,
}
