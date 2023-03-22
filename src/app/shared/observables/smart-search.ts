import {
    debounceTime,
    distinctUntilChanged,
    Observable,
    OperatorFunction,
    scan,
    startWith,
    switchMap,
} from 'rxjs';

export function smartSearch<T>(
    getSearchFunction: (search: string) => Observable<readonly T[]>,
    searchDebounceTimeMs: number = 400,
): OperatorFunction<string, readonly T[] | null> {
    return source =>
        source.pipe(
            debounceTime(searchDebounceTimeMs),
            scan((previousSearched, current) => {
                return previousSearched !== '' && current.startsWith(previousSearched)
                    ? previousSearched
                    : current;
            }, ''),
            distinctUntilChanged(),
            switchMap(value => getSearchFunction(value)),
            startWith([]),
        );
}
