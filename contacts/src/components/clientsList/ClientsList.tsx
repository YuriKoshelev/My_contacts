import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from "../pages/Page404";
import Spinner from "../spinner/Spinner";
import "./clientsList.css"
import editWebp from '../../resources/edit.webp'
import useClientsService from '../../services/ClientsService';
import { useAuth } from "../../hooks/auth.hooks";

import { Istate } from '../../interfaces'

import {clientsUpdate, clientDelete, editClientUpdate, errorLoadingUpdate} from "../clientsList/clientsSlice"

const ClientsList: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const {getClients, deleteClient} = useClientsService();
    const {clients, user, filter, errorLoading} = useSelector((state: Istate) => state.clients)
    const dispatch = useDispatch()
    const { logout } = useAuth()

    useEffect((): void => {
        if (clients.length === 0) {
            setLoading(true)
            getClients()
                .then((res)=> {
                    if (res.error) {
                        logout()
                        return
                    }
                    let listContacts: string = JSON.stringify(res) //.replace(/_id/g, 'id')

                    if ([res].length > 0) {
                    dispatch(clientsUpdate(JSON.parse(listContacts)))
                    setLoading(false)
                    } else {
                        setLoading(false)  
                    }
                })
                .catch(() => {
                    dispatch(errorLoadingUpdate(true))
                 }
                )
        }
    }, [])

    const onDeleteHeroe = (id: string) => {
        deleteClient(id)
            .then((res)=> {
                
                if (!res.error) {
                    const newClients = clients.filter((item) => {
                        return item.id !== id 
                    })
                    dispatch(clientDelete(newClients))
                } else {
                    logout()
                }
            })
    } 

    const editClient = (id: string): void => {
        dispatch(editClientUpdate(id))
    }

    const newClients = clients.filter((item) => {
        const len = filter.length
        return item.name.toLowerCase().slice(0, len) === filter.toLowerCase()
    })

    if (errorLoading) return (<ErrorMessage/>)

    if (loading) return (<div className="clients_list"><Spinner/></div>)

    if (newClients.length === 0) return(<div className="noClients">No contacts</div>) 

    return (
        <div className="clients_list">
            <ul>
                <li>
                    { 
                    newClients.map((elem, index) => {
                        return(
                            <li key={elem.id}>
                                <div className="client_wrapper faded">
                                    <div className="client">
                                        <div className="client_name">{elem.name}</div>
                                        <div className="client_phone">{
                                        elem.phone.slice(0, 1) + '(' + elem.phone.slice(1, 4) + ')' + 
                                        elem.phone.slice(4)
                                        }</div>
                                        <div className="client_email">{elem.email}</div>
                                        <div className="client_btn_edit"
                                             onClick={() => {editClient(elem.id)}}>
                                            <img src={editWebp} alt="edit"/>
                                        </div>
                                        <div className="client_btn_delete"
                                             onClick={() => {onDeleteHeroe(elem.id)}}>
                                            <div className="client_line_one"></div>
                                            <div className="client_line_two"></div>
                                        </div>
                                    </div>
                                    <div className="client_line"></div>
                                </div>
                            </li>
                        )
                      })
                    }
                </li>
            </ul>         
        </div>        
    
    )
}

export default ClientsList;
