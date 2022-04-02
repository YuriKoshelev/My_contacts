import React from "react";
import "./clientsList.css"

const ClientsList: React.FC = () => {
    return (
        <div className="clients_list">
            <li>
                <div className="client_wrapper">
                    <div className="client">
                        <div className="client_name">Ivanov Sergey dfddfdfd</div>
                        <div className="client_phone">+79005551214</div>
                        <div className="client_email">ivanov@gmail.com</div>
                        <div className="client_btn_delete">
                            <div className="client_line_one"></div>
                            <div className="client_line_two"></div>
                        </div>
                    </div>
                    <div className="client_line"></div>
                </div>
            </li>
        </div>
    )
}

export default ClientsList;