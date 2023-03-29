import {Routes} from '@angular/router';

export default [
    {
        path: '',
        loadComponent: async () => import('../hero-list/hero-list.component'),
    },
    {
        path: ':id',
        loadComponent: async () => import('../hero-detail/hero-detail.component'),
    },
] as Routes;
