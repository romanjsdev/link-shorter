export enum FormType {
    LOGIN = 'login',
    REGISTER = 'register'
}

export interface ILink {
    id: number
    short: string
    target: string
    counter: number
}

export interface IAuthData {
    username: string
    password: string
}

export interface IAuthState {
    loading: boolean
    username: string | null
    isLogged: boolean
    error: string | null
}

export interface ILinksState {
    items: Array<ILink> | null
    loading: boolean
    error: string | null
    page: number
    pagesCount: number
    newLinkAdded: boolean
}

export interface IState {
    auth: IAuthState
    links: ILinksState
}