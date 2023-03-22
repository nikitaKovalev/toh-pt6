import {AsyncPipe, NgForOf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {HeroSearchComponent} from '@app/heroes/ui/hero-search/hero-search.component';
import {FilterPipe} from '@shared/pipes';

export const DASHBOARD_IMPORTS = [
    HeroSearchComponent,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    FilterPipe,
    RouterLink,
];
