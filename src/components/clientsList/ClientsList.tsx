import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from "../pages/404";
import "./clientsList.css"
import editWebp from '../../resources/edit.webp'
import useClientsService from '../../services/ClientsService';

import { Istate } from '../../interfaces'

import {clientsUpdate, clientDelete, editClientUpdate, errorLoadingUpdate} from "../clientsList/clientsSlice"

const ClientsList: React.FC = () => {

    const {getClients, deleteClient} = useClientsService();
    const {clients, user, filter, errorLoading} = useSelector((state: Istate) => state.clients)
    const dispatch = useDispatch()

    useEffect((): void => {
        if (clients.length === 0) {
            getClients(user)
                .then((res)=> {
                    if (res.length > 0) {
                    dispatch(clientsUpdate(res))
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
            .then(()=> {
                const newClients = clients.filter((item) => {
                    return item.id !== id 
                })
                dispatch(clientDelete(newClients))
            })
    } 

    const editClient = (index: number): void => {
        dispatch(editClientUpdate(index))
    }

    const newClients = clients.filter((item) => {
        const len = filter.length
        return item.name.toLowerCase().slice(0, len) === filter.toLowerCase()
    })

    if (errorLoading) return (<ErrorMessage/>)

    if (newClients.length === 0) return(<div className="noClients">No clients</div>) 

    return (
        <div className="clients_list">
            <ul>
                <li>
                    { 
                    newClients.map((elem, index) => {
                        return(
                            <li>
                                <div className="client_wrapper faded">
                                    <div className="client">
                                        <div className="client_name">{elem.name}</div>
                                        <div className="client_phone">{
                                        elem.phone.slice(0, 1) + '(' + elem.phone.slice(1, 4) + ')' + 
                                        elem.phone.slice(4)
                                        }</div>
                                        <div className="client_email">{elem.email}</div>
                                        <div className="client_btn_edit"
                                             onClick={() => {editClient(index)}}>
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
