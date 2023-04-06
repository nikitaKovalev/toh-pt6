import {Component} from '@angular/core';
import {HERO_LIST_IMPORTS} from '@app/heroes/feature/hero-list/hero-list.imports';
import {injectHeroesFeature} from '@app/store/hero.state';
import {DestroyService} from '@shared/services';
import {switchMap, tap} from 'rxjs/operators';

import {Hero} from '../../data-access/model/hero';

@Component({
    standalone: true,
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css'],
    providers: [DestroyService],
    imports: HERO_LIST_IMPORTS,
})
export default class HeroListComponent {
    private readonly vm = injectHeroesFeature();

    readonly heroes$ = this.vm.instantiated$.pipe(
        // Check if heroes store is already instantiated, if not, load heroes
        tap(instantiated => instantiated || this.vm.enter()),
        // switch to heroes$ to get the latest heroes from store
        switchMap(() => this.vm.heroes$),
    );

    add(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        this.vm.addHero({name} as Hero);
    }

    delete({id}: Hero): void {
        this.vm.deleteHero(id);
    }
}
