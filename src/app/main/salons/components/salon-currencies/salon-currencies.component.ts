import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, catchError, debounceTime, map, mergeMap, of } from 'rxjs';
import { Currency } from '../../models/currency.model';
import { CurrenciesService } from '../../services/currencies.service';

@Component({
    selector: 'app-salon-currencies',
    templateUrl: './salon-currencies.component.html',
    styleUrl: './salon-currencies.component.scss',
})
export class SalonCurrenciesComponent implements OnInit {
    @ViewChild('otherAcceptedCurrenciesInput')
    otherAcceptedCurrenciesInput!: ElementRef;
    // @Input()
    canEdit: boolean = true;

    @Input()
    salonId!: string;

    @Input()
    mainCurrency!: Currency;

    @Input()
    otherAcceptedCurrencies!: Currency[];

    autocompleteOptions!: Observable<Currency[]>;
    otherAcceptedCurrenciesInputControl: FormControl = new FormControl('');
    mainCurrencyInputControl: FormControl = new FormControl('');

    constructor(private currenciesServcie: CurrenciesService) {}

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
            .addCurrency(currency.id, this.salonId)
            .subscribe();
    }

    removeCurrency(currency: Currency): void {
        const index = this.otherAcceptedCurrencies.indexOf(currency);

        if (index >= 0) {
            this.otherAcceptedCurrencies.splice(index, 1);
        }

        this.currenciesServcie
            .removeCurrency(currency.id, this.salonId)
            .subscribe();
    }
}
