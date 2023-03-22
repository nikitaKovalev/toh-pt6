import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {DestroyService} from '../services/destroy.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
