import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import useClientsService from '../../services/ClientsService'
import { useAuth } from "../../hooks/auth.hooks";
import ErrorMessage from "../pages/Page404";
import Spinner from "../spinner/Spinner";
import { Istate, Iclients } from '../../interfaces'

import {loadClientEdit, editClientUpdate} from "../clientsList/clientsSlice"

import "./editClient.css"

const EditClient: React.FC = () => {
    
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [inputError, setInputError] = useState<boolean>(false)

    const {clients, editId, errorLoading, loading} = useSelector((state: Istate) => state.clients)
    const {editClient} = useClientsService();
    const dispatch = useDispatch()
    const {logout} = useAuth()

    const formatEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    useEffect((): void => {
        if (editId !== '') {
            
            const contact: Iclients[] = clients.filter((item) => item.id === editId)
            setName(contact[0].name)
            setPhone(contact[0].phone)
            setEmail(contact[0].email)
        }
    }, [editId])

    if (editId === '') return(<></>) 

    const onSave = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        
        if (name.length > 2 && phone.length > 10 && formatEmail.test(email)) {
            
            setInputError(false)

            let updateClient = {
                name: name,
                phone: phone,
                email: email,
                id: editId
            }
        
            editClient(JSON.stringify(updateClient), editId)
                .then((res) => {
                    
                    if (!res.error) {
                        let newClients: Iclients[] = JSON.parse(JSON.stringify(clients))
                    
                        newClients.forEach((item) => {
                            if (item.id === editId) {
                                item.name = name
                                item.phone = phone
                                item.email = email
                            }  
                        })

                        dispatch(loadClientEdit(newClients))
                        dispatch(editClientUpdate(''))
                    } else {
                        logout()
                    }

                }    
                )
                .catch((err) => {
                    console.log(err)
                }   
                )
        } else {
            setInputError(true)
        }
    }

    const onCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        dispatch(editClientUpdate(''))
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
        setInputError(false)
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPhone(e.target.value)
        setInputError(false)
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
        setInputError(false)
    }

    let errorName = <></>
    if (name && name.length < 3) {
        errorName = <div className="form_error">"Min of 3 characters"</div>
    }
    
    let errorPhone = <></>
    if (phone && phone.length > 12) setPhone(phone.slice(0, 12))
    if (phone && phone.length < 11) errorPhone = <div className="form_error">"Min of 11 numbers"</div>
    
    let errorEmail = <></>
    if (email && !formatEmail.test(email)) {
        errorEmail = <div className="form_error">"Invalid format"</div>
    }

    if (errorLoading) {
        return(<div className="overlay">
                <div className="modal">
                    <ErrorMessage/>
                    <button className="edit_button_cancel"
                            onClick={onCancel}>Cancel</button>
                </div>
        </div>)
    }

    let loadingHTML = <></>
    if (loading) loadingHTML = <Spinner/>

    let inputErrorHTML = <></>
    if (inputError) inputErrorHTML = <div className="form_error">"Incorrect input"</div>

    return(
        <div className="overlay">
            <div className="modal">
                <div className="modal__subtitle">Editing a contact</div>
                <form className="form_edit" action="#">                
                    <input name="name" 
                           value={name}
                           onChange={onChangeName}
                           required placeholder="Contact's name" 
                           type="text"/>
                    {errorName}
                    <input name="phone" 
                           value={phone}
                           onChange={onChangePhone}
                           required placeholder="Phone number" 
                           type="number"/>
                    {errorPhone}
                    <input name="email" 
                           value={email}
                           onChange={onChangeEmail}
                           required placeholder="E-mail" 
                           type="email"/>
                    {errorEmail}
                    {inputErrorHTML}
                    {loadingHTML} 
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