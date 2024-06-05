import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { Owner } from '../../../users/models/owner.model';
import { OwnersService } from '../../../users/services/owners.service';
import { AddOwnerDialogComponent } from '../add-owner-dialog/add-owner-dialog.component';
import { ConfirmDeletionDialogComponent } from '../confirm-deletion-dialog/confirm-deletion-dialog.component';

@Component({
    selector: 'app-salon-owners',
    templateUrl: './salon-owners.component.html',
    styleUrl: './salon-owners.component.scss',
})
export class SalonOwnersComponent {
    @Output()
    ownerSelectedEvent: EventEmitter<Owner> = new EventEmitter<Owner>();

    @Input()
    owners!: Owner[];

    @Input()
    canEdit!: boolean;

    @Input()
    salonId!: string;

    constructor(
        private dialog: MatDialog,
        private ownersService: OwnersService,
    ) {}

    ngOnInit(): void {}

    openAddOwnerDialog(): void {
        const dialogRef = this.dialog.open(AddOwnerDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                salonId: this.salonId,
            },
            enterAnimationDuration: '300ms',
        });

        dialogRef
            .afterClosed()
            .subscribe((result: { owner: Owner } | undefined) => {
                if (result?.owner) {
                    this.owners.push(result.owner);
                }
            });
    }

    ownerSelected(owner: Owner): void {
        this.ownerSelectedEvent.emit(owner);
    }

    deleteOwner(ownerToDelete: Owner): void {
        const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                title: 'Are you sure you want to remove this owner',
            },
            enterAnimationDuration: '300ms',
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((result: { isDeleted: boolean }) => result.isDeleted),
                switchMap(() =>
                    this.ownersService.removeFromSalon(
                        ownerToDelete.id,
                        this.salonId,
                    ),
                ),
            )
            .subscribe(() => {
                this.owners.splice(
                    this.owners.findIndex(
                        (owner) => owner.id === ownerToDelete.id,
                    ),
                    1,
                );
            });
    }
}
