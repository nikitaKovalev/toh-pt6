import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {HERO_DETAIL_IMPORTS} from '@app/heroes/feature/hero-detail/hero-detail.imports';
import {itemFromRoute, RouteParam} from '@shared/utils';
import {NgxSpinnerService} from 'ngx-spinner';
import {of, Subject, switchMap} from 'rxjs';
import {catchError, mapTo, repeat, share, tap} from 'rxjs/operators';

import {HeroService} from '../../data-access/hero.service';
import {Hero} from '../../data-access/model/hero';

@Component({
    standalone: true,
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: HERO_DETAIL_IMPORTS,
})
export default class HeroDetailComponent {
    readonly hero$ = itemFromRoute(
        id => this.heroService.getHero(Number(id)),
        RouteParam.Id,
        true,
    );

    readonly save$ = new Subject<Hero>();
    readonly saveHero$ = this.save$.pipe(
        tap(async () => {
            await this.spinner.show();
        }),
        switchMap((hero: Hero) =>
            this.heroService.updateHero(hero).pipe(tap(() => this.goBack())),
        ),
        tap({
            error: async () => {
                await this.spinner.hide();
            },
        }),
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
        @Inject(NgxSpinnerService) private readonly spinner: NgxSpinnerService,
    ) {}

    goBack(): void {
        this.location.back();
    }

    save(hero: Hero): void {
        this.save$.next(hero);
    }
}
