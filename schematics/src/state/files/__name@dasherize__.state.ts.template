import {EnvironmentProviders, inject, makeEnvironmentProviders} from '@angular/core';
import {Actions, createEffect, ofType, provideEffects} from '@ngrx/effects';
import {
    createActionGroup,
    createFeature,
    createReducer,
    createSelector,
    emptyProps,
    on,
    props, provideState,
    Store,
} from '@ngrx/store';
import { exhaustMap, mergeMap, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface <%= classify(name) %>State {
    collection: unknown[];
    isLoading: boolean;
    isInitialized: boolean;
    // describe state here
}

/** Initial State */
export const <%= camelize(name) %>InitialState: <%= classify(name) %>State = {
    collection: [],
    isLoading: false,
    isInitialized: false,
    // describe initial state here
};

export interface <%= classify(name) %>Feature {
    enter: () => void;
    add<%= classify(name) %>: (<%= camelize(name) %>: unknown) => void;
    delete<%= classify(name) %>: (id: number | string) => void;
    update<%= classify(name) %>: (<%= camelize(name) %>: unknown) => void;
    <%= camelize(name) %>s$: Observable<unknown[]>;
    isLoading$: Observable<boolean>;
    isInitialized$: Observable<boolean>;
    // describe feature here
}

/** Sync Actions */
export const <%= classify(name) %>Actions = createActionGroup({
    source: '<%= classify(name) %>',
    events: {
        // describe sync actions here
    },
});

/** Async Actions */
export const <%= classify(name) %>ApiActions = createActionGroup({
    source: '<%= classify(name) %> API',
    events: {
        enter: emptyProps(),
        '<%= classify(name) %> List Loaded Success': props<{<%= camelize(name) %>List: unknown[]}>(),
        '<%= classify(name) %> List Loaded Failure': props<{error: string}>(),
        '<%= classify(name) %> Added': props<{<%= camelize(name) %>: unknown}>(),
        '<%= classify(name) %> Added Success': props<{<%= camelize(name) %>: unknown}>(),
        '<%= classify(name) %> Added Failure': props<{error: string}>(),
        '<%= classify(name) %> Updated': props<{<%= camelize(name) %>: unknown}>(),
        '<%= classify(name) %> Updated Success': props<{<%= camelize(name) %>: unknown}>(),
        '<%= classify(name) %> Updated Failure': props<{error: string}>(),
        '<%= classify(name) %> Deleted': props<{id: number | string}>(),
        '<%= classify(name) %> Deleted Success': props<{<%= camelize(name) %>: unknown}>(),
        '<%= classify(name) %> Deleted Failure': props<{error: string}>(),
        // describe async actions here
    },
});

/** Reducers */
export const <%= camelize(name) %>Feature = createFeature({
    name: '<%= classify(name) %>',
    reducer: createReducer(
        <%= camelize(name) %>InitialState,
        // On enter
        on(<%= classify(name) %>ApiActions.enter, state => ({
            ...state,
            collection: [],
            isLoading: true,
        })),
        // On load success
        on(<%= classify(name) %>ApiActions.<%= camelize(name) %>ListLoadedSuccess, (state, {<%= camelize(name) %>List}) => ({
            ...state,
            collection: <%= camelize(name) %>List,
            isLoading: false,
            isInitialized: true,
        })),
        // On load failure
        on(<%= classify(name) %>ApiActions.<%= camelize(name) %>ListLoadedFailure, (state, {error}) => ({
            ...state,
            isLoading: false,
        })),
        // On add success
        on(<%= classify(name) %>ApiActions.<%= camelize(name) %>AddedSuccess, (state, {<%= camelize(name) %>}) => ({
            ...state,
            collection: [...state.collection, <%= camelize(name) %>],
        })),
        // describe reducers here
    ),
    extraSelectors: (state) => ({
        // describe extra selectors here
    }),
});

/** Selectors */
export const {
    selectCollection: select<%= classify(name) %>Collection,
    selectIsLoading,
    selectIsInitialized,
    // describe selectors here
} = <%= camelize(name) %>Feature;

/** Effects */
// Fetch list of <%= classify(name) %>s
export const load<%= classify(name) %>$ = createEffect(
    (actions$ = inject(Actions)) => {
        // replace with real service
        const service = of([]);

        return actions$.pipe(
            ofType(<%= classify(name) %>ApiActions.enter),
            exhaustMap(() =>
                service.pipe(
                    map(<%= camelize(name) %>List =>
                        <%= classify(name) %>ApiActions.<%= camelize(name) %>ListLoadedSuccess({<%= camelize(name) %>List})
                    ),
                    catchError(() =>
                            of(
                                <%= classify(name) %>ApiActions.<%= camelize(name) %>ListLoadedFailure({
                                    error: 'An error occurred while loading <%= classify(name) %>List'
                                })
                            ),
                    ),
                ),
            ),
            // describe load effect here
        );
    },
    {functional: true},
);

// Add <%= classify(name) %>
export const add<%= classify(name) %>$ = createEffect(
    (actions$ = inject(Actions)) => {
        const service = of({});

        return actions$.pipe(
            ofType(<%= classify(name) %>ApiActions.<%= camelize(name) %>Added),
            mergeMap(({<%= camelize(name) %>}) =>
                    service.pipe(
                        map(<%= camelize(name) %> =>
                            <%= classify(name) %>ApiActions.<%= camelize(name) %>AddedSuccess({<%= camelize(name) %>})
                        ),
                        catchError(() =>
                                of(
                                    <%= classify(name) %>ApiActions.<%= camelize(name) %>AddedFailure({
                                        error: 'An error occurred while adding <%= classify(name) %>'
                                    }),
                                ),
                        ),
                    ),
            ),
            // describe create effect here
        );
    },
    {functional: true},
);

// Update <%= classify(name) %>
export const update<%= classify(name) %>$ = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            // describe update effect here
        );
    },
    {functional: true},
);

// Delete <%= classify(name) %>
export const delete<%= classify(name) %>$ = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            // describe delete effect here
        );
    },
    {functional: true},
);

// Search <%= classify(name) %>s
export const search<%= classify(name) %>$ = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            // describe search effect here
        );
    },
    {functional: true},
);

/** Environment Providers, to register current state in the store */
export const provide<%= classify(name) %>Feature = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(<%= camelize(name) %>Feature),
        provideEffects({
            load<%= classify(name) %>$,
            add<%= classify(name) %>$,
            update<%= classify(name) %>$,
            delete<%= classify(name) %>$,
            search<%= classify(name) %>$,
        }),
    ]);

export const inject<%= classify(name) %>Feature = (): <%= classify(name) %>Feature => {
    const store = inject(Store);

    return {
        enter: () => store.dispatch(<%= classify(name) %>ApiActions.enter()),
        add<%= classify(name) %>: (<%= camelize(name) %>) => store.dispatch(<%= classify(name) %>ApiActions.<%= camelize(name) %>Added({<%= camelize(name) %>})),
        delete<%= classify(name) %>: (id) => store.dispatch(<%= classify(name) %>ApiActions.<%= camelize(name) %>Deleted({id})),
        update<%= classify(name) %>: (<%= camelize(name) %>) => store.dispatch(<%= classify(name) %>ApiActions.<%= camelize(name) %>Updated({<%= camelize(name) %>})),
        <%= camelize(name) %>s$: store.select(select<%= classify(name) %>Collection),
        isLoading$: store.select(selectIsLoading),
        isInitialized$: store.select(selectIsInitialized),
        // describe feature here
    };
};
