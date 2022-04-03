import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import useClientsService from '../../services/ClientsService';
import {clientsUpdate} from "../clientsList/clientsSlice"
import { v4 as uuidv4 } from 'uuid';
import { Istate } from '../../interfaces'
import "./addForm.css"

const AddForm: React.FC = () => {
    
    const [clientName, setClientName] = useState<string>('')
    const [clientPhone, setClientPhone] = useState<string>('')
    const [clientEmail, setClientEmail] = useState<string>('')

    const {addClient} = useClientsService();
    const dispatch = useDispatch()

    const {user} = useSelector((state: Istate) => state.clients)

    const onAddClient = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()

        let newClient = {
            id: uuidv4(),
            user: user,
            name: clientName,
            phone: clientPhone,
            email: clientEmail
        }
    
        addClient(JSON.stringify(newClient))
            .then((res)=> {
                dispatch(clientsUpdate([newClient]))
            })
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setClientName(e.target.value)
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setClientPhone(e.target.value)
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setClientEmail(e.target.value)
    }

    return (
        <div className="add_client">
            <form className="form_add" action="#">                
                <div className="form_headline">Add a client</div>
                <input name="name" 
                       value={clientName}
                       required placeholder="Client's name" 
                       type="text"
                       onChange={onChangeName}
                       />
                <input name="phone" 
                       value={clientPhone}
                       required placeholder="Phone number" 
                       type="number"
                       onChange={onChangePhone}
                       />
                <input name="email" 
                       value={clientEmail}
                       required placeholder="E-mail" 
                       type="email"
                       onChange={onChangeEmail}
                       /> 
                <button className="button_submit"
                        onClick={onAddClient}>Add</button>
            </form>
        </div>
    )
}

export default AddForm;