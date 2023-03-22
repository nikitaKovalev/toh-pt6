import {Type} from '@angular/core';
import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/feature/dashboard.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {
        path: 'dashboard',
        loadComponent: async (): Promise<Type<DashboardComponent>> =>
            import('./dashboard/feature/dashboard.component').then(
                c => c.DashboardComponent,
            ),
    },
    {
        path: 'heroes',
        loadChildren: async (): Promise<Routes> =>
            import('./heroes/feature/hero-shell/hero-shell-routing').then(s => s.ROUTES),
    },
];
