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

export interface <%= classify(name) %>State {
    // describe state here
}

// Initial State
export const <%= camelize(name) %>InitialState: <%= classify(name) %>State = {
    // describe initial state here
};

export interface <%= classify(name) %>Feature {
    // describe feature here
}

// Sync Actions
export const <%= classify(name) %>Actions = createActionGroup({
    source: '<%= classify(name) %>',
    events: {
        // describe sync actions here
    },
});

// Async Actions
export const <%= classify(name) %>ApiActions = createActionGroup({
    source: '<%= classify(name) %> API',
    events: {
        // describe async actions here
    },
});

// Reducers
export const <%= camelize(name) %>Feature = createFeature({
    name: '<%= classify(name) %>',
    reducer: createReducer(
        <%= camelize(name) %>InitialState,
        // describe reducers here
    ),
    extraSelectors: (state) => ({
        // describe extra selectors here
    }),
});

// Selectors
export const {
    // describe selectors here
} = <%= camelize(name) %>Feature;

// Effects
// Fetch list of <%= classify(name) %>s
export const load<%= classify(name) %>$ = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            // describe load effect here
        );
    },
    {functional: true},
);

// Create <%= classify(name) %>
export const create<%= classify(name) %>$ = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
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

// Environment Providers, to register current state in the store
export const provide<%= classify(name) %>Feature = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(<%= camelize(name) %>Feature),
        provideEffects({
            load<%= classify(name) %>$,
            create<%= classify(name) %>$,
            update<%= classify(name) %>$,
            delete<%= classify(name) %>$,
            search<%= classify(name) %>$,
        }),
    ]);

export const inject<%= classify(name) %>Feature = (): <%= classify(name) %>Feature => {
    const store = inject(Store);

    return {
        // describe feature here
    };
};
