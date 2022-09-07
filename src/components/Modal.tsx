import React, { FC, useEffect, useState } from "react"
import { Modal, Input } from 'antd'
import { useAppDispatch } from "../hooks/useAppDispatch"
import { getSqueeze } from '../features/linksSlice'

interface IModalProps {
    state: boolean
    handleOk: () => void
    handleCancel: () => void
}

const ModalWindow: FC<IModalProps> = ({ state, handleOk, handleCancel }) => {
    const [val, setVal] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const setNewLink = (): void => {
        if (val) dispatch(getSqueeze({ link: val }))
        handleOk()
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setVal(e.target.value)
    }

    useEffect(() => {
        return () => setVal(null)
    },[])

    return (
        <Modal open={state} onOk={setNewLink} onCancel={handleCancel}>
            <Input placeholder="Введите ссылку" onChange={onChange} />
        </Modal>
    )
}

export default ModalWindow