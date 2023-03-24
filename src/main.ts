import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {importProvidersFrom} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app/app-shell-routing';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './app/in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom([
            RouterModule.forRoot(ROUTES),
            HttpClientModule,
            BrowserAnimationsModule,

            // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
            // and returns simulated server responses.
            // Remove it when a real server is ready to receive requests.
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                dataEncapsulation: false,
            }),
        ]),
    ],
}).catch(err => console.error(err));
