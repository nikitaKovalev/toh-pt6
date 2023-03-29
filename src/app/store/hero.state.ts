import {EnvironmentProviders, inject, makeEnvironmentProviders} from '@angular/core';
import {HeroService} from '@app/heroes/data-access/hero.service';
import {Hero} from '@app/heroes/data-access/model/hero';
import {Actions, createEffect, ofType, provideEffects} from '@ngrx/effects';
import {
    createActionGroup,
    createFeature,
    createReducer,
    createSelector,
    emptyProps,
    on,
    props,
    provideState,
    Store,
} from '@ngrx/store';
import {
    concatMap,
    exhaustMap,
    mergeMap,
    Observable,
    of,
    shareReplay,
    switchMap,
} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';

export interface HeroState {
    collection: Hero[];
    currentHeroId: number | null;
    instantiated: boolean;
}

// Initial State
export const initialState: HeroState = {
    collection: [],
    currentHeroId: null,
    instantiated: false,
};

export interface HeroesFeature {
    enter: () => void;
    addHero: (hero: Hero) => void;
    deleteHero: (id: number) => void;
    heroes$: Observable<Hero[]>;
    currentHero$: Observable<Hero | undefined>;
}

// Sync Actions
export const HeroesActions = createActionGroup({
    source: 'Heroes',
    events: {
        enter: emptyProps(),
        'Hero Selected': props<{id: number}>(),
    },
});

// Async Actions
export const HeroesApiActions = createActionGroup({
    source: 'Heroes API',
    events: {
        'Heroes Loaded Success': props<{heroes: Hero[]}>(),
        'Heroes Loaded Failure': props<{error: string}>(),
        'Hero Added': props<{hero: Hero}>(),
        'Hero Added Success': props<{hero: Hero}>(),
        'Hero Added Failure': props<{error: string}>(),
        'Hero Deleted': props<{id: number}>(),
        'Hero Deleted Success': props<{hero: Hero}>(),
        'Hero Deleted Failure': props<{error: string}>(),
    },
});

// Reducers
export const heroesFeature = createFeature({
    name: 'heroes',
    reducer: createReducer(
        initialState,
        on(HeroesActions.enter, () => initialState),
        on(HeroesApiActions.heroAddedSuccess, (state, {hero}) => ({
            ...state,
            collection: [...state.collection, hero],
        })),
        on(HeroesApiActions.heroDeletedSuccess, (state, {hero}) => ({
            ...state,
            collection: state.collection.filter(({id}) => id !== hero.id),
        })),
        on(HeroesApiActions.heroesLoadedSuccess, (state, {heroes}) => ({
            ...state,
            collection: heroes,
            instantiated: true,
        })),
    ),
    extraSelectors: ({selectCollection, selectCurrentHeroId}) => ({
        selectCurrentHero: createSelector(
            selectCollection,
            selectCurrentHeroId,
            (heroes, id) => heroes.find(hero => hero.id === id),
        ),
    }),
});

// Selectors
export const {
    selectHeroesState,
    selectInstantiated,
    selectCurrentHero,
    selectCurrentHeroId,
    selectCollection: selectAllHeroes,
} = heroesFeature;

// Effects
// Fetch heroes from the server when the HeroesActions.enter action is dispatched
export const loadHeroes$ = createEffect(
    (actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(HeroesActions.enter),
            exhaustMap(() =>
                inject(HeroService)
                    .getHeroes()
                    .pipe(
                        map(heroes => HeroesApiActions.heroesLoadedSuccess({heroes})),
                        catchError(() =>
                            of(
                                HeroesApiActions.heroesLoadedFailure({
                                    error: 'Heroes fetch failed',
                                }),
                            ),
                        ),
                    ),
            ),
        ),
    {functional: true},
);

// Make request to add hero when HeroesActions.heroAdded action is dispatched
export const addHero$ = createEffect(
    (actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(HeroesApiActions.heroAdded),
            // to safe the order of added heroes
            concatMap(action =>
                inject(HeroService)
                    .addHero(action.hero)
                    .pipe(
                        map((hero: Hero) => HeroesApiActions.heroAddedSuccess({hero})),
                        catchError(() =>
                            of(
                                HeroesApiActions.heroAddedFailure({
                                    error: 'Hero add failed',
                                }),
                            ),
                        ),
                    ),
            ),
        ),

    {functional: true},
);

// Make request to delete hero when HeroesActions.heroDeleted action is dispatched
export const deleteHero$ = createEffect(
    (actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(HeroesApiActions.heroDeleted),
            // no need in order
            mergeMap(action =>
                inject(HeroService)
                    .deleteHero(action.id)
                    .pipe(
                        map(hero => HeroesApiActions.heroDeletedSuccess({hero})),
                        catchError(() =>
                            of(
                                HeroesApiActions.heroDeletedFailure({
                                    error: 'Hero delete failed',
                                }),
                            ),
                        ),
                    ),
            ),
        ),
    {functional: true},
);

// Environment Providers, to register HeroesState in the store
export const provideHeroesFeature = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(heroesFeature),
        provideEffects({loadHeroes$, addHero$, deleteHero$}),
    ]);

export const injectHeroesFeature = (): HeroesFeature => {
    const store = inject(Store);
    const instantiated$ = store.select(selectInstantiated).pipe(
        map(instantiated => {
            if (!instantiated) {
                store.dispatch(HeroesActions.enter());
            }

            return instantiated;
        }),
        filter(Boolean),
        shareReplay({bufferSize: 1, refCount: true}),
    );

    return {
        enter: () => store.dispatch(HeroesActions.enter()),
        addHero: (hero: Hero) => store.dispatch(HeroesApiActions.heroAdded({hero})),
        deleteHero: (id: number) => store.dispatch(HeroesApiActions.heroDeleted({id})),
        heroes$: instantiated$.pipe(switchMap(() => store.select(selectAllHeroes))),
        currentHero$: instantiated$.pipe(
            switchMap(() => store.select(selectCurrentHero)),
        ),
    };
};
