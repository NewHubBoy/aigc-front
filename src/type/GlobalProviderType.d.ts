import type { State, Action } from './StoreType'

export interface GlobalState {
    state: State;
    dispatch: React.Dispatch<Action>;
}