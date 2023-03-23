import {Observable, of} from 'rxjs';
import {catchError, mapTo, repeat} from 'rxjs/operators';

export const disableSubmit = <T>(
    submitObservable$: Observable<T>,
): Observable<boolean> => {
    return submitObservable$.pipe(
        mapTo(true),
        catchError(() => of(false)),
        repeat(),
    );
};
