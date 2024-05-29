import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, catchError, debounceTime, map, mergeMap, of } from 'rxjs';
import { Currency } from '../../models/currency.model';
import { Salon } from '../../models/salon.model';
import { CurrenciesService } from '../../services/currencies.service';
import { SalonsService } from '../../services/salons.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
    selector: 'app-change-main-currency-dialog',
    templateUrl: './change-main-currency-dialog.component.html',
    styleUrl: './change-main-currency-dialog.component.scss',
})
export class ChangeMainCurrencyDialogComponent {
    mainCurrencyControl!: FormControl;
    autocompleteOptions!: Observable<Currency[]>;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            mainCurrency: Currency;
            otherAcceptedCurrencies: Currency[];
            salon: Salon;
        },
        private dialogRef: MatDialogRef<CategoryDialogComponent>,
        private currenciesService: CurrenciesService,
        private salonsService: SalonsService,
    ) {}

    ngOnInit(): void {
        this.setupTheFormControls();
        this.keepTheAutocompleteUpdatedBasedOnTheSearchTerm();
    }

    keepTheAutocompleteUpdatedBasedOnTheSearchTerm(): void {
        this.autocompleteOptions = this.mainCurrencyControl.valueChanges.pipe(
            debounceTime(300),
            mergeMap((value) =>
                this.currenciesService.searchCurrencies(value).pipe(
                    map((currencyOptions) =>
                        currencyOptions.filter(
                            (currencyOption) =>
                                !this.dialogData.otherAcceptedCurrencies.some(
                                    (currency) =>
                                        currency.code === currencyOption.code,
                                ) &&
                                this.dialogData.mainCurrency.code !==
                                    currencyOption.code,
                        ),
                    ),
                    catchError(() => of([])),
                ),
            ),
        );
    }

    setupTheFormControls(): void {
        this.mainCurrencyControl = new FormControl(
            this.dialogData.mainCurrency?.name,
            [Validators.required],
        );
    }

    autocompleteOptionSelected(event: MatAutocompleteSelectedEvent) {
        const currency: Currency = event.option.value;
        this.mainCurrencyControl.setValue(currency.name);
        this.dialogData.mainCurrency = currency;
    }

    saveClicked(): void {
        this.salonsService
            .update(this.dialogData.salon.id, {
                ...this.dialogData.salon,
                mainCurrency: this.dialogData.mainCurrency,
            })
            .subscribe(() =>
                this.dialogRef.close({
                    mainCurrency: this.dialogData.mainCurrency,
                }),
            );
    }
}
