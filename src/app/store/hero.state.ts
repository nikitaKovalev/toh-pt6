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
import {concatMap, exhaustMap, mergeMap, Observable, of, switchMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface HeroState {
    collection: Hero[];
    collectionSearchable: Hero[];
    isLoading: boolean;
    currentHeroId: number | null;
    instantiated: boolean;
}

// Initial State
export const initialState: HeroState = {
    collection: [],
    collectionSearchable: [],
    isLoading: false,
    currentHeroId: null,
    instantiated: false,
};

export interface HeroesFeature {
    enter: () => void;
    addHero: (hero: Hero) => void;
    deleteHero: (id: number) => void;
    searchHeroes: (term: string) => void;
    heroes$: Observable<Hero[]>;
    heroesSearchable$: Observable<Hero[]>;
    currentHero$: Observable<Hero | undefined>;
    isLoading$: Observable<boolean>;
    instantiated$: Observable<boolean>;
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
        'Heroes Search': props<{term: string}>(),
        'Heroes Search Success': props<{heroes: Hero[]}>(),
        'Heroes Search Failure': props<{error: string}>(),
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
        // Initial state
        on(HeroesActions.enter, state => ({
            ...state,
            isLoading: true,
        })),
        // On successful add hero request
        on(HeroesApiActions.heroAddedSuccess, (state, {hero}) => ({
            ...state,
            collection: [...state.collection, hero],
            collectionSearchable: [...state.collectionSearchable, hero],
        })),
        // On successful delete hero request
        on(HeroesApiActions.heroDeletedSuccess, (state, {hero}) => {
            const collection = state.collection.filter(h => h.id !== hero.id);

            return {...state, collection, collectionSearchable: collection};
        }),
        // On successful load hero list
        on(HeroesApiActions.heroesLoadedSuccess, (state, {heroes}) => ({
            ...state,
            collection: heroes,
            instantiated: true,
            isLoading: false,
        })),
        // On failure load hero list
        on(HeroesApiActions.heroesLoadedFailure, state => ({...state, isLoading: false})),
        // On hero search triggered
        on(HeroesApiActions.heroesSearch, state => ({...state, isLoading: true})),
        // On successful hero search
        on(HeroesApiActions.heroesSearchSuccess, (state, {heroes}) => ({
            ...state,
            collectionSearchable: heroes,
            isLoading: false,
        })),
        // On failed hero search
        on(HeroesApiActions.heroesSearchFailure, state => ({...state, isLoading: false})),
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
    selectCollectionSearchable: selectAllHeroesSearchable,
    selectIsLoading,
} = heroesFeature;

// Effects
// Fetch heroes from the server when the HeroesActions.enter action is dispatched
export const loadHeroes$ = createEffect(
    (actions$ = inject(Actions)) => {
        const heroService = inject(HeroService);

        return actions$.pipe(
            ofType(HeroesActions.enter),
            exhaustMap(() =>
                heroService.getHeroes().pipe(
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
        );
    },
    {functional: true},
);

// Make request to add hero when HeroesActions.heroAdded action is dispatched
export const addHero$ = createEffect(
    (actions$ = inject(Actions)) => {
        const heroService = inject(HeroService);

        return actions$.pipe(
            ofType(HeroesApiActions.heroAdded),
            // to safe the order of added heroes
            concatMap(action =>
                heroService.addHero(action.hero).pipe(
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
        );
    },

    {functional: true},
);

// Make request to delete hero when HeroesActions.heroDeleted action is dispatched
export const deleteHero$ = createEffect(
    (actions$ = inject(Actions)) => {
        const heroService = inject(HeroService);

        return actions$.pipe(
            ofType(HeroesApiActions.heroDeleted),
            // no need in order
            mergeMap(action =>
                heroService.deleteHero(action.id).pipe(
                    map(() =>
                        HeroesApiActions.heroDeletedSuccess({
                            hero: {id: action.id} as Hero,
                        }),
                    ),
                    catchError(() =>
                        of(
                            HeroesApiActions.heroDeletedFailure({
                                error: 'Hero delete failed',
                            }),
                        ),
                    ),
                ),
            ),
        );
    },
    {
        functional: true,
    },
);

export const searchHeroes$ = createEffect(
    (actions$ = inject(Actions)) => {
        const heroService = inject(HeroService);

        return actions$.pipe(
            ofType(HeroesApiActions.heroesSearch),
            switchMap(({term}) =>
                heroService.searchHeroes(term).pipe(
                    map(heroes => HeroesApiActions.heroesSearchSuccess({heroes})),
                    catchError(() =>
                        of(
                            HeroesApiActions.heroesSearchFailure({
                                error: 'Heroes search failed',
                            }),
                        ),
                    ),
                ),
            ),
        );
    },
    {functional: true},
);

// Environment Providers, to register HeroesState in the store
export const provideHeroesFeature = (): EnvironmentProviders =>
    makeEnvironmentProviders([
        provideState(heroesFeature),
        provideEffects({loadHeroes$, addHero$, deleteHero$, searchHeroes$}),
    ]);

export const injectHeroesFeature = (): HeroesFeature => {
    const store = inject(Store);

    return {
        enter: () => store.dispatch(HeroesActions.enter()),
        addHero: (hero: Hero) => store.dispatch(HeroesApiActions.heroAdded({hero})),
        deleteHero: (id: number) => store.dispatch(HeroesApiActions.heroDeleted({id})),
        searchHeroes: (term: string) =>
            store.dispatch(HeroesApiActions.heroesSearch({term})),
        heroes$: store.select(selectAllHeroes),
        heroesSearchable$: store.select(selectAllHeroesSearchable),
        currentHero$: store.select(selectCurrentHero),
        isLoading$: store.select(selectIsLoading),
        instantiated$: store.select(selectInstantiated),
    };
};
