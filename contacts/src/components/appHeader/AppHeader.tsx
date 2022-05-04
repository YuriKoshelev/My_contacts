import React from "react"
import { useSelector } from 'react-redux';
import { useAuth } from "../../hooks/auth.hooks";
import "./appHeader.css"

import { Istate } from '../../interfaces'


const AppHeader: React.FC = () => {
    
    const {user} = useSelector((state: Istate) => state.clients)
    const { logout } = useAuth()
    
    return (
        <div className="promo">
            <div className="user_name">{user}</div>
            <button className="btn"
                    onClick={logout}
            >Exit</button>
            <h1>My contacts</h1>
        </div>
    )
}

export default AppHeader;