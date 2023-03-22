import {Injectable, OnDestroy} from '@angular/core';
import {ReplaySubject} from 'rxjs';

/**
 * An injectable service used to handle unsubscription
 *
 * @example
 * Component({provider: [DestroyService]})
 * export class SomeComponent {
 *     constructor(destroy$: Observable<void>) {
 *         const interval$ = interval(1000);
 *
 *         interval$.pipe(takeUntil(destroy$)).subscribe();
 *     }
 * }
 **/
@Injectable()
export class DestroyService extends ReplaySubject<void> implements OnDestroy {
    constructor() {
        super(1);
    }

    ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
