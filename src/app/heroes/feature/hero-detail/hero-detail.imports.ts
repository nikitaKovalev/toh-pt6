import {AsyncPipe, NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';

export const HERO_DETAIL_IMPORTS = [
    NgIf,
    AsyncPipe,
    UpperCasePipe,
    FormsModule,
    NgxSpinnerModule,
];
