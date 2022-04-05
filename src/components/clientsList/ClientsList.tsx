import React, {useEffect, useCallback} from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./clientsList.css"
import editWebp from '../../resources/edit.webp'
import useClientsService from '../../services/ClientsService';

import { Istate, IclientsList } from '../../interfaces'

import {clientsUpdate, clientDelete, editClientUpdate} from "../clientsList/clientsSlice"

// interface IclientsElenent {
//     id: string,
//     user: string,
//     name: string,
//     phone: string,
//     email: string 
// }

// interface IclientsElenent {
//     value: string,
//     index: number,
//     array: string[]
// }

const ClientsList: React.FC = () => {

    const {getClients, deleteClient} = useClientsService();
    const {clients, user, filter} = useSelector((state: Istate) => state.clients)
    const dispatch = useDispatch()

    useEffect((): void => {
        if (clients.length === 0) {
            getClients(user)
                .then((res)=> {
                    if (res.length > 0) {
                    dispatch(clientsUpdate(res))
                    // dispatch(accessUpdate(true)) 
                    // history.push('/main')
                    }
                })
        }
    }, [])

    const onDeleteHeroe = (id: string) => {
        deleteClient(id)
            .then((res)=> {
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
        // return item.name.toLowerCase().indexOf(filter.toLowerCase())>-1
    })

    return (
        <div className="clients_list">
            <ul>
                <li>
                    { 
                    newClients.map((elem, index) => {
                        return(
                            <li>
                                <div className="client_wrapper">
                                    <div className="client">
                                        <div className="client_name">{elem.name}</div>
                                        <div className="client_phone">{elem.phone}</div>
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
