import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Owner } from '../../../users/models/owner.model';
import { AddOwnerDialogComponent } from '../add-owner-dialog/add-owner-dialog.component';

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

    constructor(private dialog: MatDialog) {}

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

    deleteOwner(owner: Owner): void {}
}
