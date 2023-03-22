import {inject} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Possible route parameters
 **/
export enum RouteParam {
    Id = 'id',
}

/**
 * Injectable function routeParam
 * @param param is parameter to get from ParamMap
 * @returns Observable of string if found, otherwise Observable of null
 */
export const routeParam = (param: RouteParam): Observable<string | null> => {
    const route = inject(ActivatedRoute);

    return route.paramMap.pipe(map((params: ParamMap) => params.get(param)));
};
