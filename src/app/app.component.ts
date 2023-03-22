import {ChangeDetectionStrategy, Component} from '@angular/core';
import {APP_IMPORTS} from '@app/app.imports';

@Component({
    standalone: true,
    selector: 'app-root',
    template: `
        <h1>Tour of Heroes</h1>
        <nav>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/heroes">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
        <app-messages></app-messages>
    `,
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: APP_IMPORTS,
})
export class AppComponent {}
