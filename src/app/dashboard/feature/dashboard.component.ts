import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DASHBOARD_IMPORTS} from '@app/dashboard/feature/dashboard.imports';
import {HeroService} from '@app/heroes/data-access/hero.service';
import {Hero} from '@app/heroes/data-access/model/hero';
import {smartSearch} from '@shared/observables';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize, startWith, switchMap, takeWhile, timer} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

const COUNTDOWN = 8;

@Component({
    standalone: true,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: DASHBOARD_IMPORTS,
})
export class DashboardComponent {
    private readonly heroesService = inject(HeroService);
    private readonly spinner = inject(NgxSpinnerService);

    readonly control = new FormControl<string>('', {nonNullable: true});

    readonly heroes$ = this.control.valueChanges.pipe(
        startWith(''),
        tap(async () => this.spinner.show()),
        smartSearch(
            (value: string) =>
                this.heroesService
                    .searchHeroes(value)
                    .pipe(finalize(async () => this.spinner.hide())),
            async () => this.spinner.hide(),
        ),
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
