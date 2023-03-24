import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {HeroSearchComponent} from '@app/heroes/ui/hero-search/hero-search.component';
import {FilterPipe} from '@shared/pipes';
import {NgxSpinnerModule} from 'ngx-spinner';

export const DASHBOARD_IMPORTS = [
    HeroSearchComponent,
    ReactiveFormsModule,
    NgForOf,
    NgStyle,
    NgIf,
    AsyncPipe,
    FilterPipe,
    RouterLink,
    NgxSpinnerModule,
];
