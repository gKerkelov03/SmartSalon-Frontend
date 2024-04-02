import {
	AfterViewInit,
	Component,
	forwardRef,
	Injector,
	Input,
} from '@angular/core';
import {
	ControlValueAccessor,
	NgControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-password-input',
	templateUrl: './password-input.component.html',
	styleUrls: ['./password-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PasswordInputComponent),
			multi: true,
		},
	],
})
export class PasswordInputComponent
	implements ControlValueAccessor, AfterViewInit
{
	@Input() placeholder: string = 'Password';
	@Input() controlName: string = 'password';
	passwordValue!: string;
	ngControl!: NgControl;
	onChange: any = () => {};
	onTouched: any = () => {};
	disabled: boolean = false;

	public get invalid(): boolean {
		return this.ngControl ? this.ngControl.invalid! : false;
	}

	constructor(private inj: Injector) {}

	ngAfterViewInit(): void {
		this.ngControl = this.inj.get(NgControl);
	}

	onInput(value: string): void {
		this.writeValue(value);
		this.onChange(value);
		this.onTouched();
	}

	writeValue(obj: any): void {
		this.passwordValue = obj;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
