import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useClientsService from '../../services/ClientsService';

import './accessPage.css';

import {userUpdate, accessUpdate} from "../clientsList/clientsSlice"

const AccessPage: React.FC = () => {
  
  const [userName, setUserName] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const history = useHistory()
  const {checkAccess} = useClientsService();

  const dispatch = useDispatch()

  const getAccess = (): void => {
    checkAccess(userName, userPassword)
      .then((res)=> {
          
        if (res.length > 0) {
          dispatch(userUpdate(userName))
          dispatch(accessUpdate(true)) 
          history.push('/main')
        }
      })
  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    getAccess()
  }

  const onReset = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setUserName("")
    setUserPassword("")
  }
  
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      getAccess()
    }
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
                   value={userName}
                   required placeholder="User name" 
                   type="text"
                   onChange={onChangeName}/>
            <input name="password"
                   value={userPassword} 
                   required placeholder="Password" 
                   type="text"
                   onChange={onChangePassword}
                   onKeyPress={onKeyPress}/>
            <div className="access_buttons">
                <button className="access_button_reset"
                        onClick={onReset}>Reset</button>
                <button className="access_button_submit"
                        onClick={onSubmit}>OK</button>
            </div>  
        </form>
    </div>
  )
}

export default AccessPage;