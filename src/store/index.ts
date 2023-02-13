import type { State, Action } from "../type/StoreType";

export const store: State = {
    lang: 'zh'
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setLanguage':
            return { ...state, lang: action.value };
        default:
            return state;
    }
}


export default reducer;