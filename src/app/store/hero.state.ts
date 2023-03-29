import {Hero} from '@app/heroes/data-access/model/hero';

export interface HeroState {
    collection: Hero[];
    currentHeroId: number;
}
