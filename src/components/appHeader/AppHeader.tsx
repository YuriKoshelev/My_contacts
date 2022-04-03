import React from "react"
import { useSelector } from 'react-redux';
import "./appHeader.css"
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';

import {userUpdate, accessUpdate, clientsClear} from "../clientsList/clientsSlice"

import { Istate } from '../../interfaces'


const AppHeader: React.FC = () => {
    const history = useHistory()
    const {user} = useSelector((state: Istate) => state.clients)
    const dispatch = useDispatch()
    
    const onExit = (): void => {
        dispatch(accessUpdate(false))
        dispatch(userUpdate(""))
        dispatch(clientsClear())
    }

    return (
        <div className="promo">
            <div className="user_name">{user}</div>
            <button className="btn"
                    onClick={onExit}
            >Exit</button>
            <h1>My contacts</h1>
        </div>
    )
}

export default AppHeader;