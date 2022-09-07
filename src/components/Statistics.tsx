import React, { FC, useEffect } from "react"
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Table, Spin, notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { getStatistics, selectStatistics, selectError, ClearError } from '../features/linksSlice'
import { selectIsLogged } from "../features/authSlice" 
import { ILink } from '../types'

const Statistics: FC = () => {
    const history: NavigateFunction = useNavigate()
    const dispatch = useAppDispatch()
    const links: ILink[] | null = useSelector(selectStatistics)
    const isLogged: boolean = useSelector(selectIsLogged)
    const error: string | null = useSelector(selectError)

    useEffect(() => {
        isLogged ? dispatch(getStatistics()) : history('/login')
    }, [])

    useEffect(() => {
        if (error) notification.error({message: error, onClose: () => ClearError()})
    }, [error])

    const columns: ColumnsType<ILink> = [
        {
            title: "Исходная ссылка",
            dataIndex: 'target',
            key: 'target',
            render: target => <a href={target}>{target}</a>
        },
        {
            title: "Короткая ссылка",
            dataIndex: 'short',
            key: 'short',
            render: short => <a href={short}>{short}</a>
        },
        {
            title: "Количество переходов",
            dataIndex: 'counter',
            key: 'counter'
        }
    ]

    return (
        <div>
            {links ? <Table columns={columns} dataSource={links} rowKey="id" /> : <Spin size="large" />}
        </div>
    )
}

export default Statistics