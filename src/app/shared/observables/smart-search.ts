import {
    debounceTime,
    distinctUntilChanged,
    Observable,
    OperatorFunction,
    scan,
    startWith,
    switchMap,
} from 'rxjs';

/**
 * RxJs Operator used to reduce API requests
 * @param getSearchFunction function to process an API call
 * @param searchValueNotChangedCallback callback to be called when search value is not changed
 * @param searchDebounceTimeMs add debounce between emits
 * @returns OperatorFunction
 **/
export function smartSearch<T>(
    getSearchFunction: (search: string) => Observable<readonly T[]>,
    searchValueNotChangedCallback?: () => void,
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
            distinctUntilChanged((previousSearched, current) => {
                const notChanged = previousSearched === current;

                if (notChanged && searchValueNotChangedCallback) {
                    searchValueNotChangedCallback();
                }

                return notChanged;
            }),
            switchMap(value => getSearchFunction(value)),
            startWith([]),
        );
}
