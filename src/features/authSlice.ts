import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { Register, Login } from '../api'
import { IState, IAuthState, IAuthData } from '../types'

const initState: IAuthState = {
    loading: false,
    username: null,
    isLogged: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setIsLogged: (state, action) => {
            state.isLogged = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        }
    },
})

export const { setLoading, setError, setIsLogged, setUsername } = authSlice.actions

export const Reg = ({ username, password }: IAuthData) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))

    try {
        const res = await Register({ username, password })
        if (res) {
            dispatch(setUsername(res.data.username))
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

export const LogIn = ({ username, password }: IAuthData) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))

    try {
        const res = await Login({ username, password })
        if (res) {
            localStorage.setItem('token', res.data.access_token)
            dispatch(setIsLogged(true))
        } else {
            dispatch(setError('Что-то пошло не так, попробуйте еще раз...'))
        } 
    } catch (error) {
        dispatch(setError('Что-то пошло не так, попробуйте еще раз...'))
        console.log(error)
    } finally {
        dispatch(setLoading(false))
    }
}

export const ClearError = () => (dispatch: AppDispatch) =>  dispatch(setError(null))

export const selectUserName = (state: IState) => state.auth.username
export const selectIsLogged = (state: IState) => state.auth.isLogged
export const selectLoading = (state: IState) => state.auth.loading
export const selectError = (state: IState) => state.auth.error

export default authSlice.reducer
