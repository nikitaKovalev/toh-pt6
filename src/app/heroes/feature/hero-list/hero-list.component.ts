import {Component, OnInit} from '@angular/core';
import {HERO_LIST_IMPORTS} from '@app/heroes/feature/hero-list/hero-list.imports';

import {HeroService} from '../../data-access/hero.service';
import {Hero} from '../../data-access/model/hero';

@Component({
    standalone: true,
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css'],
    imports: HERO_LIST_IMPORTS,
})
export class HeroListComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(private readonly heroService: HeroService) {}

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => {
            this.heroes = heroes;
        });
    }

    add(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        this.heroService.addHero({name} as Hero).subscribe(hero => {
            this.heroes.push(hero);
        });
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero.id).subscribe();
    }
}
