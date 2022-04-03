import React, {useEffect, useCallback} from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./clientsList.css"
import useClientsService from '../../services/ClientsService';

import { Istate, IclientsList } from '../../interfaces'

import {clientsUpdate, clientDelete} from "../clientsList/clientsSlice"

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
    const {clients, user} = useSelector((state: Istate) => state.clients)
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

    return (
        <div className="clients_list">
            <ul>
                <li>
                    { 
                    clients.map((elem) => {
                        return(
                            <li>
                                <div className="client_wrapper">
                                    <div className="client">
                                        <input name="name"
                                               value={elem.name}
                                               type="text" 
                                               className="client_name"/>
                                        <div className="client_phone">{elem.phone}</div>
                                        <div className="client_email">{elem.email}</div>
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