import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DASHBOARD_IMPORTS} from '@app/dashboard/feature/dashboard.imports';
import {Hero} from '@app/heroes/data-access/model/hero';
import {injectHeroesFeature} from '@app/store/hero.state';
import {NgxSpinnerService} from 'ngx-spinner';
import {
    debounceTime,
    distinctUntilChanged,
    scan,
    startWith,
    switchMap,
    takeWhile,
    timer,
} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

const COUNTDOWN = 8;

@Component({
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: DASHBOARD_IMPORTS,
})
export default class DashboardComponent {
    private readonly spinner = inject(NgxSpinnerService);
    private readonly vm = injectHeroesFeature();

    readonly control = new FormControl<string>('', {nonNullable: true});

    readonly heroes$ = this.control.valueChanges.pipe(
        startWith(''),
        tap(async () => this.spinner.show()),
        debounceTime(400),
        scan((previousSearched, current) => {
            return previousSearched !== '' && current.startsWith(previousSearched)
                ? previousSearched
                : current;
        }, ''),
        distinctUntilChanged((previousSearched, current) => {
            const notChanged = previousSearched === current;

            if (notChanged) {
                void this.spinner.hide();
            }

            return notChanged;
        }),
        tap(term => this.vm.searchHeroes(term)),
        switchMap(() => this.vm.heroesSearchable$),
        tap(async () => this.spinner.hide()),
        startWith([]),
    );

    readonly heroesBlurred$ = this.spinner.spinnerObservable.pipe(
        filter(spinner => spinner && spinner.show),
        switchMap(() =>
            timer(0, 100).pipe(
                map(count => COUNTDOWN - count),
                takeWhile(Boolean, true),
            ),
        ),
        map(counter => ({filter: `blur(${counter}px)`})),
    );

    readonly filterValue = (hero: Hero, value: string): boolean => {
        return hero.name.toLowerCase().startsWith(value.toLowerCase());
    };

    readonly trackBy = (index: number): number => index;
}
