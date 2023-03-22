import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {smartSearch} from '../observables/smart-search';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
