import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useClientsService from '../../services/ClientsService';

import './accessPage.css';

const AccessPage: React.FC = () => {
  
  const [userName, setUserName] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const history = useHistory()
  const {checkAccess} = useClientsService();

 
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    checkAccess(userName, userPassword)
    //history.push('/main')
  }
  
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserPassword(e.target.value)
  }

  return (
    <div className="access"> 
        <form className="form_access" action="#">                
            <div className="form_headline">Authorization</div>
            <input id="user" 
                   name="user" 
                  required placeholder="User name" 
                  type="text"
                  onChange={onChangeName}
                  />
            <input name="password" 
                   required placeholder="Password" 
                   type="text"
                   onChange={onChangePassword}/>
            <div className="access_buttons">
                <button className="access_button_reset">Reset</button>
                <button className="access_button_submit"
                        onClick={onSubmit}>OK</button>
            </div>  
        </form>
    </div>
  )
}

export default AccessPage;