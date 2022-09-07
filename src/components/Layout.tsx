import React, { FC, useEffect, useState } from "react"
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import ModalWindow from "./Modal"
import { setIsLogged, selectIsLogged } from '../features/authSlice'
import { useAppDispatch } from "../hooks/useAppDispatch"

interface ILayout {
    children: React.ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
    const dispatch = useAppDispatch()
    const isLogged: boolean = useSelector(selectIsLogged)
    const [modalState, setModalState] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) dispatch(setIsLogged(true))
    }, [])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '5px' }}>
            <nav style={{ display: 'flex' }}>
                <div><a href="/">Статистика</a></div>
                <div><a href="/login">Войти</a></div>
                <div><a href="/register">Зарегистрироваться</a></div>
                {isLogged && <Button onClick={() => setModalState(true)}>Новая ссылка</Button>}
            </nav>
            <ModalWindow state={modalState} handleOk={()=> console.log('ok')} handleCancel={() => setModalState(false)} />
            {children}
        </div>
    )
}

export default Layout