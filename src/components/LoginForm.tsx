import React, { FC, useEffect } from 'react'
import { Button, Form, Input, Row, Col, notification } from 'antd'
import { useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { selectIsLogged, selectLoading, selectError, Reg, LogIn, ClearError, selectUserName } from '../features/authSlice'
import { FormType } from '../types'

interface ILoginFrom {
    type: FormType
}

const LoginForm: FC<ILoginFrom> = ( {type} ) => {
    const history: NavigateFunction = useNavigate()
    const dispatch = useAppDispatch()
    const loading: boolean = useSelector(selectLoading)
    const isLogged: boolean = useSelector(selectIsLogged)
    const username: string | null = useSelector(selectUserName)
    const error: string | null = useSelector(selectError)

    const onFinish = ({ username, password }: {username: string, password: string}): void => {
        console.log('Success:', username, password, type)
        type === FormType.LOGIN ?
            dispatch(LogIn({ username, password })) :
            dispatch(Reg({ username, password }))
    }

    useEffect(() => {
        if (error) notification.error({message: error, onClose: () => ClearError()})
    }, [error])

    useEffect(() => {
        if (isLogged) history('/')
    }, [isLogged])

    useEffect(() => {
        if (username) history('/login')
    }, [username])

    return (
            <Row justify='center' align='middle' style={{ height: '100%' }}>
                <Col span={12}>
                    <Form
                        name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        onFinish={onFinish}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Введите имя!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Введите пароль!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
                            <Button type="primary" htmlType="submit" disabled={loading} ghost={loading}>
                                {type === FormType.LOGIN ? "Войти" : "Зарегистрироваться"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
    )
}

export default LoginForm