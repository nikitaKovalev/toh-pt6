import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {
  readonly heroes$: Observable<Hero[]> = of([]);
}
