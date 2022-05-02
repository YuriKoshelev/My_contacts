import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import useClientsService from '../../services/ClientsService'
import {clientsUpdate} from '../clientsList/clientsSlice'
import { useAuth } from "../../hooks/auth.hooks" 
import Spinner from '../spinner/Spinner'

import "./addForm.css"

interface Ibody {
    token?: string,
    id: string,
    name: string,
    phone: string,
    email: string
    error?: boolean
}

const AddForm: React.FC = () => {
    
    const [clientName, setClientName] = useState<string>('')
    const [clientPhone, setClientPhone] = useState<string>('')
    const [clientEmail, setClientEmail] = useState<string>('')

    const [inputError, setInputError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const {addClient} = useClientsService();
    const dispatch = useDispatch()
    const { logout } = useAuth()

    const formatEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const onAddClient = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()

        let newClient: Ibody = {
            id: '',
            name: clientName,
            phone: clientPhone, 
            email: clientEmail,
        }
    
        if (clientName.length > 2 && clientPhone.length > 10 && formatEmail.test(clientEmail)) {
            
            setInputError(false)
            setLoading(true)
                                
            addClient(JSON.stringify(newClient))
                .then((res) => {
                    
                    if (res.error) {
                        logout()
                        return
                    }

                    newClient.id = res.id
                    dispatch(clientsUpdate([newClient]))
                    setLoading(false)
                })
                .then(() => {
                    setClientName('')
                    setClientPhone('')
                    setClientEmail('')
                })
        } else {
            setInputError(true)
        }

    }


    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setClientName(e.target.value)
        setInputError(false)
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setClientPhone(e.target.value)
        setInputError(false)
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setClientEmail(e.target.value)
        setInputError(false)
    }

    let errorName = <></>
    if (clientName && clientName.length < 3) {
        errorName = <div className="form_error">"Min of 3 characters"</div>
    }
    
    let errorPhone = <></>
    if (clientPhone && clientPhone.length > 12) setClientPhone(clientPhone.slice(0, 12))
    if (clientPhone && clientPhone.length < 11) errorPhone = <div className="form_error">"Min of 11 numbers"</div>

    let errorEmail = <></>
    if (clientEmail && !formatEmail.test(clientEmail)) {
        errorEmail = <div className="form_error">"Invalid format"</div>
    }
    

    let inputErrorHTML = <></>
    if (inputError) inputErrorHTML = <div className="form_error">"Incorrect input"</div>

    let loadingHTML = <></>
    if (loading) loadingHTML = <Spinner/>

    return (
        <div className="add_client">
            <form className="form_add" action="#">                
                <div className="form_headline">Add a contact</div>
                <input name="name" 
                       value={clientName}
                       required placeholder="Contact's name" 
                       type="text"
                       onChange={onChangeName}
                       />
                {errorName}
                <input name="phone" 
                       value={clientPhone}
                       required placeholder="Phone number" 
                       type="number"
                       onChange={onChangePhone}
                       />
                {errorPhone}       
                <input name="email" 
                       value={clientEmail}
                       required placeholder="E-mail" 
                       type="email"
                       onChange={onChangeEmail}
                       />
                {errorEmail}
                {inputErrorHTML}
                {loadingHTML} 
                <button className="button_submit"
                        onClick={onAddClient}>Add</button>
            </form>
        </div>
    )
}

export default AddForm;