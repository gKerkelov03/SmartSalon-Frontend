import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, debounceTime, map, mergeMap, of } from 'rxjs';
import { Currency } from '../../models/currency.model';
import { Salon } from '../../models/salon.model';
import { CurrenciesService } from '../../services/currencies.service';
import { ChangeMainCurrencyDialogComponent } from '../change-main-currency-dialog/change-main-currency-dialog.component';

@Component({
    selector: 'app-salon-currencies',
    templateUrl: './salon-currencies.component.html',
    styleUrl: './salon-currencies.component.scss',
})
export class SalonCurrenciesComponent implements OnInit {
    @ViewChild('otherAcceptedCurrenciesInput')
    otherAcceptedCurrenciesInput!: ElementRef;

    @Input()
    canEdit!: boolean;

    @Input()
    salon!: Salon;

    @Input()
    mainCurrency!: Currency;

    @Input()
    otherAcceptedCurrencies!: Currency[];

    autocompleteOptions!: Observable<Currency[]>;
    otherAcceptedCurrenciesInputControl: FormControl = new FormControl('');

    constructor(
        private currenciesServcie: CurrenciesService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.keepTheAutocompleteUpdatedBasedOnTheSearchTerm();
    }

    keepTheAutocompleteUpdatedBasedOnTheSearchTerm(): void {
        this.autocompleteOptions =
            this.otherAcceptedCurrenciesInputControl.valueChanges.pipe(
                debounceTime(300),
                mergeMap((value) =>
                    this.currenciesServcie.searchCurrencies(value).pipe(
                        map((currencyOptions) =>
                            currencyOptions.filter(
                                (currencyOption) =>
                                    !this.otherAcceptedCurrencies.some(
                                        (currency) =>
                                            currency.code ===
                                            currencyOption.code,
                                    ) &&
                                    this.mainCurrency.code !==
                                        currencyOption.code,
                            ),
                        ),
                        catchError(() => of([])),
                    ),
                ),
            );
    }

    addCurrency(event: MatAutocompleteSelectedEvent): void {
        const currency: Currency = event.option.value;

        this.otherAcceptedCurrencies.push(currency);
        this.otherAcceptedCurrenciesInput.nativeElement.value = '';

        this.currenciesServcie
            .addCurrency(currency.id, this.salon.id)
            .subscribe();
    }

    removeCurrency(currency: Currency): void {
        const index = this.otherAcceptedCurrencies.indexOf(currency);

        if (index >= 0) {
            this.otherAcceptedCurrencies.splice(index, 1);
        }

        this.currenciesServcie
            .removeCurrency(currency.id, this.salon.id)
            .subscribe();
    }

    editMainCurrencyClicked(): void {
        const dialogRef = this.dialog.open(ChangeMainCurrencyDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                mainCurrency: this.mainCurrency,
                otherAcceptedCurrencies: this.otherAcceptedCurrencies,
                salon: this.salon,
            },
            enterAnimationDuration: '300ms',
        });

        dialogRef
            .afterClosed()
            .subscribe((result: { mainCurrency: Currency } | null) => {
                if (result) {
                    this.mainCurrency = result.mainCurrency;
                }
            });
    }
}
