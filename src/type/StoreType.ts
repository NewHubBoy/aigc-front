export interface State {
    lang: string
}

export interface Action {
    type: 'setLanguage'|'setUserInfo'
    value: any
}