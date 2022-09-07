import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { Squeeze, Statistics } from '../api'
import { IState, ILinksState } from '../types'

const initState: ILinksState = {
    loading: false,
    items: null,
    page: 1,
    pagesCount: 1,
    newLinkAdded: false,
    error: null
}

export const linksSlice = createSlice({
    name: 'links',
    initialState: initState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setLinks: (state, action) => {
            state.items = action.payload
        },
        setPages: (state, action) => {
            state.pagesCount = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setNewLinkAdded: (state, action) => {
            state.newLinkAdded = action.payload
        }
    },
})

export const { setLoading, setError, setLinks, setNewLinkAdded } = linksSlice.actions

export const getSqueeze = ({ link }: {link: string}) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    dispatch(setNewLinkAdded(false))

    try {
        const res = await Squeeze({ link })
        if (res) {
            dispatch(setNewLinkAdded(true))
        } else {
            dispatch(setError('Что-то пошло не так, попробуйте еще раз...'))
        }
    } catch (error) {
        console.error(error)
        dispatch(setError('Что-то пошло не так, попробуйте еще раз...'))
    } finally {
        dispatch(setLoading(false))
    }
}

export const getStatistics = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))

    try {
        const res = await Statistics()
        if (res) {
            console.log(res)
            dispatch(setLinks(res.data))
        } else {
            dispatch(setError('Что-то пошло не так, попробуйте еще раз...'))
        }
    } catch (error) {
        console.error(error)
        dispatch(setError('Что-то пошло не так, попробуйте еще раз...'))
    } finally {
        dispatch(setLoading(false))
    }
}

export const ClearError = () => (dispatch: AppDispatch) =>  dispatch(setError(null))

export const selectStatistics = (state: IState) => state.links.items
export const selectLoading = (state: IState) => state.links.loading
export const selectError = (state: IState) => state.links.error
export const selectNewLinkAdded = (state: IState) => state.links.newLinkAdded

export default linksSlice.reducer
