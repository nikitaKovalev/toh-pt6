import {RouteParam, routeParam} from '@shared/utils/route-param';
import {EMPTY, finalize, Observable, switchMap} from 'rxjs';
import {catchError, filter, tap} from 'rxjs/operators';

/**
 * Injectable function itemFromRoute
 *
 * @param searchFunction function to process an API call
 * @param param by default will get the id from ParamMap
 * @param hasLoader if set to true than it will show loading progress
 * @returns generic Observable if request successful, otherwise EMPTY
 *
 * @example
 * Component({...})
 * export class SomeComponent {
 *     readonly hero$ = itemFromRoute(id => this.heroService.getHero(Number(id)));
 * }
 **/
export function itemFromRoute<T>(
    searchFunction: (paramFromRoute: string) => Observable<T>,
    param: RouteParam = RouteParam.Id,
    hasLoader: boolean = false,
): Observable<T> {
    return routeParam(param).pipe(
        filter(Boolean),
        tap(() => hasLoader && console.info('loading')),
        switchMap((paramFromRoute: string) =>
            searchFunction(paramFromRoute).pipe(
                finalize(() => hasLoader && console.info('loaded')),
                catchError(() => EMPTY),
            ),
        ),
    );
}
