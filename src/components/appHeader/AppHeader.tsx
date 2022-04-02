import React from "react"
import "./appHeader.css"
import { useHistory } from "react-router-dom"

const AppHeader: React.FC = () => {
    const history = useHistory()
    return (
        <div className="promo">
            <div className="user_name">Vlad</div>
            <button className="btn"
                    onClick={() => history.push('/')}
            >Exit</button>
            <h1>My contacts</h1>
        </div>
    )
}

export default AppHeader;