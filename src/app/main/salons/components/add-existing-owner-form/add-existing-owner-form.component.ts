import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, catchError, debounceTime, map, mergeMap, of } from 'rxjs';
import { Owner } from '../../../users/models/owner.model';
import { OwnersService } from '../../../users/services/owners.service';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-add-existing-owner-form',
    templateUrl: './add-existing-owner-form.component.html',
    styleUrl: './add-existing-owner-form.component.scss',
})
export class AddExistingOwnerFormComponent {
    @Output() saved = new EventEmitter<unknown>();
    @Input()
    salonId!: string;
    ownerControl!: FormControl;
    autocompleteOptions!: Observable<Owner[]>;
    ownerSelected!: Owner;

    constructor(
        private ownersService: OwnersService,
        private salonsService: SalonsService,
    ) {}

    ngOnInit(): void {
        this.setupTheFormControls();
        this.keepTheAutocompleteUpdatedBasedOnTheSearchTerm();
    }

    keepTheAutocompleteUpdatedBasedOnTheSearchTerm(): void {
        this.autocompleteOptions = this.ownerControl.valueChanges.pipe(
            debounceTime(300),
            mergeMap((value) =>
                this.ownersService.search(value).pipe(
                    map((owners: Owner[]) =>
                        owners.filter((owner) => {
                            console.log(owner.salons);
                            console.log(this.salonId);

                            return !owner.salons.some(
                                (salonId) => salonId === this.salonId,
                            );
                        }),
                    ),
                    catchError(() => of([])),
                ),
            ),
        );
    }

    setupTheFormControls(): void {
        this.ownerControl = new FormControl('', [Validators.required]);
    }

    autocompleteOptionSelected(event: MatAutocompleteSelectedEvent) {
        const owner: Owner = event.option.value;
        this.ownerControl.setValue(owner.firstName);
        this.ownerSelected = owner;
    }

    saveClicked(): void {
        this.salonsService
            .sendOwnerInvitation(this.ownerSelected.id, this.salonId)
            .subscribe(() => this.saved.emit());
    }
}
