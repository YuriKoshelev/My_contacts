import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from "./404";
import { useHistory } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import useClientsService from '../../services/ClientsService';

import { Istate } from '../../interfaces'

import {userUpdate, accessUpdate, errorLoadingUpdate} from "../clientsList/clientsSlice"

import './accessPage.css';

const AccessPage: React.FC = () => {
  
  const [userName, setUserName] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [mistake, setMistake] = useState<boolean>(false)

  const history = useHistory()
  const {checkAccess} = useClientsService();
  const {errorLoading, loading} = useSelector((state: Istate) => state.clients)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(errorLoadingUpdate(false))
  }, [])

  const getAccess = (): void => {
    setMistake(false)
    checkAccess(userName.toLowerCase(), userPassword)
      .then((res)=> {     
        if (res.length > 0) {
          dispatch(userUpdate(userName.toLowerCase()))
          dispatch(accessUpdate(true)) 
          history.push('/main')
        } 
        else {
          setMistake(true)
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
    setMistake(false)
  }
  
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      getAccess()
    }
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value)
    setMistake(false)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserPassword(e.target.value)
    setMistake(false)
  }

  if (errorLoading) return (<ErrorMessage/>)

  let mistakeHTML = <></>
  if (mistake) {
    mistakeHTML = <div className='mistake'>Login or password entered incorrectly</div>
  }

  let loadingHTML = <></>
  if (loading) loadingHTML = <Spinner/>

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
                   type="password"
                   onChange={onChangePassword}
                   onKeyPress={onKeyPress}/>
            {mistakeHTML}       
            {loadingHTML}
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