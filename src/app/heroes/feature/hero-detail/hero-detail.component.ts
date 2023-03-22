import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {HERO_DETAIL_IMPORTS} from '@app/heroes/feature/hero-detail/hero-detail.imports';
import {itemFromRoute} from '@shared/utils';
import {of, Subject, switchMap} from 'rxjs';
import {catchError, mapTo, repeat, share, tap} from 'rxjs/operators';

import {HeroService} from '../../data-access/hero.service';
import {Hero} from '../../data-access/model/hero';

@Component({
    standalone: true,
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: HERO_DETAIL_IMPORTS,
})
export class HeroDetailComponent {
    readonly hero$ = itemFromRoute(id => this.heroService.getHero(Number(id)));

    readonly save$ = new Subject<Hero>();
    readonly saveHero$ = this.save$.pipe(
        switchMap((hero: Hero) =>
            this.heroService.updateHero(hero).pipe(tap(() => this.goBack())),
        ),
        share(),
    );

    readonly disabledSave$ = this.saveHero$.pipe(
        mapTo(true),
        catchError(() => of(false)),
        repeat(),
    );

    constructor(
        @Inject(HeroService) private readonly heroService: HeroService,
        @Inject(Location) private readonly location: Location,
    ) {}

    goBack(): void {
        this.location.back();
    }

    save(hero: Hero): void {
        this.save$.next(hero);
    }
}
