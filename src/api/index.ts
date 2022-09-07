import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IAuthData, ILink } from '../types'

const baseUrl = 'http://79.143.31.216'

const token = localStorage.getItem('token')

const instance: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

const authInstance: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
})

authInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    const headers = {...config.headers, authorization: `Bearer ${token}`}
    config.headers = headers
    return config
})

export const Register = ({ username, password }: IAuthData): Promise<AxiosResponse<Record<string, string>>>  => {
    const params = new URLSearchParams({ username, password })
    return instance.post(`${baseUrl}/register`, params)
}

export const Login = ({ username, password }: IAuthData): Promise<AxiosResponse<Record<string, string>>> => {
    const params = new URLSearchParams({ username, password })
    return instance.post(`${baseUrl}/login`, params)
}

export const Squeeze = ({ link }: {link: string}): Promise<AxiosResponse<ILink>> => {
    return authInstance.post(`${baseUrl}/squeeze`, {
        link
    })
}

export const Statistics = (): Promise<AxiosResponse<Array<ILink>>> => {
    return authInstance.get(`${baseUrl}/statistics?offset=0&limit=10`)
}