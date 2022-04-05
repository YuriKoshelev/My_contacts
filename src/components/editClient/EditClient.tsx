import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import useClientsService from '../../services/ClientsService';
import { Istate, IclientsList } from '../../interfaces'

import {loadClientEdit, editClientUpdate} from "../clientsList/clientsSlice"

const EditClient: React.FC = () => {
    
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const {clients, editId, user} = useSelector((state: Istate) => state.clients)
    const {editClient} = useClientsService();
    const dispatch = useDispatch()

    useEffect((): void => {
        if (editId >= 0) {
            setName(clients[editId].name)
            setPhone(clients[editId].phone)
            setEmail(clients[editId].email)
        }
    }, [editId])

    if (editId === -1) return(<></>) 

    const onSave = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        
        let updateClient = {
            id: clients[editId].id,
            user: user,
            name: name,
            phone: phone,
            email: email
        }
    
        editClient(JSON.stringify(updateClient), clients[editId].id)
            .then(() => {
                
                let newClients: IclientsList[] = JSON.parse(JSON.stringify(clients))
                
                newClients[editId].name = name
                newClients[editId].phone = phone
                newClients[editId].email = email
                dispatch(loadClientEdit(newClients))
                dispatch(editClientUpdate(-1))
                }
            )
            .catch((err) => {
                console.log(err)
            }
                
            )
    }

    const onCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        dispatch(editClientUpdate(-1))
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPhone(e.target.value)
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    return(
        <div className="overlay">
            <div className="modal" id="consultation">
                <div className="modal__subtitle">Editing a client</div>
                <form className="form_edit" action="#">                
                    <input name="name" 
                           value={name}
                           onChange={onChangeName}
                           required placeholder="Client's name" 
                           type="text"/>
                    <input name="phone" 
                           value={phone}
                           onChange={onChangePhone}
                           required placeholder="Phone number" 
                           type="number"/>
                    <input name="email" 
                           value={email}
                           onChange={onChangeEmail}
                           required placeholder="E-mail" 
                           type="email"/> 
                    <div className="edit_buttons">
                        <button className="edit_button_cancel"
                                onClick={onCancel}>Cancel</button>
                        <button className="edit_button_submit"
                                onClick={onSave}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditClient