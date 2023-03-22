import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HERO_DETAIL_IMPORTS} from '@app/heroes/feature/hero-detail/hero-detail.imports';
import {DestroyService} from '@shared/services';
import {switchMap} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

import {HeroService} from '../../data-access/hero.service';
import {Hero} from '../../data-access/model/hero';

@Component({
    standalone: true,
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: HERO_DETAIL_IMPORTS,
})
export class HeroDetailComponent {
    readonly hero$ = this.route.paramMap.pipe(
        map(params => params.get('id')),
        filter(Boolean),
        map(id => parseInt(id, 10)),
        switchMap(id => this.heroService.getHero(id)),
    );

    constructor(
        @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
        @Inject(HeroService) private readonly heroService: HeroService,
        @Inject(Location) private readonly location: Location,
        @Inject(DestroyService) private readonly destroy$: DestroyService,
    ) {}

    goBack(): void {
        this.location.back();
    }

    save(hero: Hero): void {
        this.heroService
            .updateHero(hero)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.goBack());
    }
}
