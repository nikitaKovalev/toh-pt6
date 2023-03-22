import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DASHBOARD_IMPORTS} from '@app/dashboard/feature/dashboard.imports';
import {HeroService} from '@app/heroes/data-access/hero.service';
import {Hero} from '@app/heroes/data-access/model/hero';
import {smartSearch} from '@shared/observables';
import {startWith} from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: DASHBOARD_IMPORTS,
})
export class DashboardComponent {
    private readonly _heroesService = inject(HeroService);

    readonly control = new FormControl<string>('', {nonNullable: true});

    readonly heroes$ = this.control.valueChanges.pipe(
        startWith(''),
        smartSearch((value: string) => this._heroesService.searchHeroes(value)),
    );

    readonly filterValue = (hero: Hero, value: string): boolean =>
        hero.name.startsWith(value);

    readonly trackBy = (index: number): number => index;
}
