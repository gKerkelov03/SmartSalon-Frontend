import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, catchError, debounceTime, mergeMap, of } from 'rxjs';
import { Worker } from '../../../users/models/worker.model';
import { WorkersService } from '../../../users/services/workers.service';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-add-existing-worker-form',
    templateUrl: './add-existing-worker-form.component.html',
    styleUrl: './add-existing-worker-form.component.scss',
})
export class AddExistingWorkerFormComponent {
    @Output() saved = new EventEmitter<unknown>();
    @Input()
    salonId!: string;
    workerControl!: FormControl;
    autocompleteOptions!: Observable<Worker[]>;
    workerSelected!: Worker;

    constructor(
        private workersService: WorkersService,
        private salonsService: SalonsService,
    ) {}

    ngOnInit(): void {
        this.setupTheFormControls();
        this.keepTheAutocompleteUpdatedBasedOnTheSearchTerm();
    }

    keepTheAutocompleteUpdatedBasedOnTheSearchTerm(): void {
        this.autocompleteOptions = this.workerControl.valueChanges.pipe(
            debounceTime(300),
            mergeMap((value) =>
                this.workersService
                    .searchForUnemployedWorker(value)
                    .pipe(catchError(() => of([]))),
            ),
        );
    }

    setupTheFormControls(): void {
        this.workerControl = new FormControl('', [Validators.required]);
    }

    autocompleteOptionSelected(event: MatAutocompleteSelectedEvent) {
        const worker: Worker = event.option.value;
        this.workerControl.setValue(worker.firstName);
        this.workerSelected = worker;
    }

    saveClicked(): void {
        this.salonsService
            .sendWorkerInvitation(this.workerSelected.id, this.salonId)
            .subscribe(() => this.saved.emit());
    }
}
