import {Routes} from '@angular/router';

export const ROUTES: Routes = [
    {
        path: 'dashboard',
        loadComponent: async () => import('./dashboard/feature/dashboard.component'),
    },
    {
        path: 'heroes',
        loadChildren: async () =>
            import('./heroes/feature/hero-shell/hero-shell-routing'),
    },
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: '**', redirectTo: '/dashboard'},
];
