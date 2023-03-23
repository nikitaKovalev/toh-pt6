import {Component, Inject} from '@angular/core';
import {HERO_LIST_IMPORTS} from '@app/heroes/feature/hero-list/hero-list.imports';
import {DestroyService} from '@shared/services';
import {BehaviorSubject, combineLatest, Observable, Subject, takeUntil} from 'rxjs';
import {map, repeat, tap} from 'rxjs/operators';

import {HeroService} from '../../data-access/hero.service';
import {Hero} from '../../data-access/model/hero';

@Component({
    standalone: true,
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css'],
    providers: [DestroyService],
    imports: HERO_LIST_IMPORTS,
})
export class HeroListComponent {
    private readonly heroesRefresh$ = new Subject<void>();
    private readonly heroesStore$ = new BehaviorSubject<Hero[]>([]);

    readonly heroes$ = combineLatest([
        this.heroService.getHeroes().pipe(
            tap(heroes => this.heroesStore$.next(heroes)),
            repeat({delay: () => this.heroesRefresh$}),
        ),
        this.heroesStore$,
    ]).pipe(map(([_, heroes]) => heroes));

    constructor(
        @Inject(HeroService) private readonly heroService: HeroService,
        @Inject(DestroyService) private readonly destroy$: Observable<void>,
    ) {}

    add(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        this.heroService
            .addHero({name} as Hero)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() =>
                // Here we need to refreshed list from server
                // because when we add new hero, we don't know its id
                this.heroesRefresh$.next(),
            );
    }

    delete(hero: Hero): void {
        this.heroService
            .deleteHero(hero.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() =>
                // Here we can skip the refresh from server and just update the heroesStore$
                this.heroesStore$.next(this.heroesStore$.value.filter(h => h !== hero)),
            );
    }
}
