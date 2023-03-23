import {Observable, Subject, switchMap} from 'rxjs';
import {share} from 'rxjs/operators';

export const submit = <T, K>(
    submitSubject$: Subject<T>,
    submitFunction: (params: T) => Observable<K>,
): Observable<K> => {
    return submitSubject$.pipe(
        switchMap((params: T) => submitFunction(params)),
        share(),
    );
};
