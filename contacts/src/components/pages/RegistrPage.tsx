import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from "./Page404";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hooks';
import Spinner from '../spinner/Spinner';

import { Istate } from '../../interfaces'

import {errorLoadingUpdate} from "../clientsList/clientsSlice"

const RegistrPage: React.FC = () => {
  
  const [userName, setUserName] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [messageCreate, setMessageCreate] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [mistake, setMistake] = useState<boolean>(false)

  const history = useHistory()
  const {errorLoading, loading} = useSelector((state: Istate) => state.clients)

  const {registration} = useAuth()
  const dispatch = useDispatch()
  const formatEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  useEffect(() => {
    dispatch(errorLoadingUpdate(false))
  }, [])

  const onRegistr = (): void => {
    setMistake(false)

    if (userPassword.length > 5 && formatEmail.test(userName)) {

      let newRegistr = {
        email: userName.toLowerCase(),
        password: userPassword
      }

      setErrorMessage('')
      setMessageCreate('')

      const result = registration(JSON.stringify(newRegistr))

      result.then((res) => {
        if (res.error) {
          setErrorMessage(res.message)
        } else {
          setMessageCreate(res.message)
        }
      }) 

    }

  }

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    onRegistr()
  }
  
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value)
    setMistake(false)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserPassword(e.target.value)
    setMistake(false)
  }

  const onLinkAccess = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    history.push('/')
  }

  if (errorLoading) return (<ErrorMessage/>)

  let mistakeHTML = <></>
  if (mistake) {
    mistakeHTML = <div className='mistake'>Login or password entered incorrectly</div>
  }

  let loadingHTML = <></>
  if (loading) loadingHTML = <Spinner/>

  let errorUser = <></>
  if (userName && !formatEmail.test(userName)) {
    errorUser = <div className="form_registr_error">"Invalid format"</div>
  }

  let errorPassword = <></>
  if (userPassword && userPassword.length < 6) {
    errorPassword = <div className="form_registr_error">"Min of 6 characters"</div>
  }

  let responseMessage = <></>
  if (errorMessage !== "") {
    responseMessage = <div className="response_error">{errorMessage}</div>
  }
  if (messageCreate !== "") {
    responseMessage = <div className="registr_ok">{messageCreate}</div>
  }

  return (
    <div className="access"> 
        <form className="form_access" action="#">                
            <div className="form_headline">Registrations</div>
            <input id="user" 
                   name="user" 
                   value={userName}
                   required placeholder="User email" 
                   type="text"
                   onChange={onChangeName}/>
            {errorUser}
            <input name="password"
                   value={userPassword} 
                   required placeholder="Password" 
                   type="password"
                   onChange={onChangePassword}/>
            {errorPassword}
            {mistakeHTML}       
            {loadingHTML}
            {responseMessage}
            <div className="access_buttons">
                <button className="access_button_submit registr_button_submit"
                            onClick={onSubmit}
                            disabled={loading}>Register</button>
            </div> 
            <a href="#" 
            className="link_to_access"
            onClick={onLinkAccess}>To the access page</a> 
        </form>
    </div>
  )
}

export default RegistrPage;