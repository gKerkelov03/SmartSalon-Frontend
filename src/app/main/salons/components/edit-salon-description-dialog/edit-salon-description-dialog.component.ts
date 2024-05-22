import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Salon } from '../../models/salon.model';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-edit-salon-description-dialog',
    templateUrl: './edit-salon-description-dialog.component.html',
    styleUrl: './edit-salon-description-dialog.component.scss',
})
export class EditSalonDescriptionDialogComponent implements OnInit {
    salon: Salon = this.dialogData;
    descriptionControl!: FormControl;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private dialogData: Salon,
        private salonsService: SalonsService,
    ) {}

    ngOnInit(): void {
        console.log('Salon is');
        console.log(this.salon);

        this.descriptionControl = new FormControl(this.salon.description, [
            Validators.required,
        ]);
    }

    saveClicked(): void {
        this.salon.description = this.descriptionControl.value;
        this.salonsService.update(this.salon.id, this.salon).subscribe();
    }
}
