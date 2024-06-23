import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, filter, of, switchMap } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { createRange } from '../../../../core/utils/create-range';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Owner } from '../../../users/models/owner.model';
import { User } from '../../../users/models/user.model';
import { Worker } from '../../../users/models/worker.model';
import { OwnersService } from '../../../users/services/owners.service';
import { WorkersService } from '../../../users/services/workers.service';
import { Salon } from '../../models/salon.model';
import { ConfirmDeletionDialogComponent } from '../confirm-deletion-dialog/confirm-deletion-dialog.component';

@Component({
    selector: 'app-salon-header',
    templateUrl: './salon-header.component.html',
    styleUrl: './salon-header.component.scss',
})
export class SalonHeaderComponent {
    @Input()
    user!: Worker | Owner | User;

    @Input()
    salon!: Salon;

    @Input()
    rating!: number;

    @Input()
    shouldntDisplayLeaveSalonButton: boolean = false;

    @Input()
    shouldntDisplayMainPicture: boolean = false;

    createRange = createRange;

    constructor(
        public currentUser: CurrentUserService,
        private ownersService: OwnersService,
        private workersService: WorkersService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) {}

    leaveSalon() {
        const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                title: 'Are you sure you want to leave?',
                deleteButtonText: 'Leave',
            },
            enterAnimationDuration: '300ms',
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((result: { isDeleted: boolean }) => result.isDeleted),
                switchMap(() => {
                    if (this.currentUser.isOwner) {
                        return this.ownersService.removeFromSalon(
                            this.salon.id,
                            this.currentUser.currentUser!.id,
                        );
                    } else if (this.currentUser.isWorker) {
                        return this.workersService.removeFromSalon(
                            this.currentUser.currentUser!.id,
                            this.salon.id,
                        );
                    }

                    return of(true);
                }),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.open(getErrorMessages(error));
                    return of(true);
                }),
            )
            .subscribe((result) => {
                //TODO: httpClient retuns Observable<null> for requests for no body
                if (!result) {
                    this.router.navigate(['main/salons']);
                }
            });
    }

    get userHasSalons(): boolean {
        //@ts-ignore
        return this.user.salons.length;
    }

    shouldDisplayHalfReviewStar() {
        const fractionalPart = this.rating - parseInt(this.rating.toString());

        if (fractionalPart > 0.5) {
            return true;
        }

        return false;
    }

    openConfirmLeaveSalonDialog() {}
}
