import {Type} from '@angular/core';
import {Routes} from '@angular/router';

import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {HeroListComponent} from '../hero-list/hero-list.component';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: async (): Promise<Type<HeroListComponent>> =>
            import('../hero-list/hero-list.component').then(c => c.HeroListComponent),
    },
    {
        path: ':id',
        loadComponent: async (): Promise<Type<HeroDetailComponent>> =>
            import('../hero-detail/hero-detail.component').then(
                c => c.HeroDetailComponent,
            ),
    },
];
