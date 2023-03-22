import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {HERO_DETAIL_IMPORTS} from '@app/heroes/feature/hero-detail/hero-detail.imports';
import {DestroyService} from '@shared/services';
import {itemFromRoute} from '@shared/utils';
import {takeUntil} from 'rxjs/operators';

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
    readonly hero$ = itemFromRoute(id => this.heroService.getHero(Number(id)));

    constructor(
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
