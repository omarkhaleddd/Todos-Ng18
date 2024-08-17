import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from './environment/environment';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['todos'],  // Specify the slices of state you want to sync
    rehydrate: true,  // Automatically rehydrate the state on startup
  })(reducer);
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];
