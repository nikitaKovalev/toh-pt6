import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: HeroSearchComponent, multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSearchComponent implements ControlValueAccessor {
    value = '';

    registerOnChange(onChange: (value: string) => void): void {
        this._onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this._onTouched = onTouched;
    }

    writeValue(value: string): void {
        this.value = value;
        this._onChange(value);
    }

    onValueChange(value: string): void {
        this.value = value;
        this._onChange(value);
        this._onTouched();
    }

    private _onChange: (value: string) => void = () => {};
    private _onTouched: () => void = () => {};
}
