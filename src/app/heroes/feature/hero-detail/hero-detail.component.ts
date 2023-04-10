import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {HERO_DETAIL_IMPORTS} from '@app/heroes/feature/hero-detail/hero-detail.imports';
import {injectHeroesFeature} from '@app/store/hero.state';
import {RouteParam, routeParam} from '@shared/utils';
import {switchMap} from 'rxjs';
import {filter, tap} from 'rxjs/operators';

import {Hero} from '../../data-access/model/hero';

@Component({
    standalone: true,
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: HERO_DETAIL_IMPORTS,
})
export default class HeroDetailComponent {
    private readonly location = inject(Location);
    private readonly vm = injectHeroesFeature();

    readonly hero$ = routeParam(RouteParam.Id).pipe(
        filter(Boolean),
        tap((id: string) => this.vm.loadHero(Number(id))),
        switchMap(() => this.vm.hero$),
    );

    readonly disabledSave$ = this.vm.isActionDisabled$;

    goBack(): void {
        this.location.back();
    }

    save(hero: Hero): void {
        this.vm.updateHero(hero);
    }
}
