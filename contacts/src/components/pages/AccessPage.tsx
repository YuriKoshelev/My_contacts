import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ErrorMessage from "./Page404";
import { useHistory } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { useAuth } from '../../hooks/auth.hooks';

import { Istate } from '../../interfaces'

import './accessPage.css';

const AccessPage: React.FC = () => {
  
  const [userName, setUserName] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [mistake, setMistake] = useState<boolean>(false)

  const history = useHistory()
  const {errorLoading, loading} = useSelector((state: Istate) => state.clients)

  const {loginToken, login} = useAuth()
  const formatEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  useEffect(() => {
    loginToken()
  }, [])

  const getAccess = (): void => {
    setMistake(false)
    
    if (userPassword.length > 5 && formatEmail.test(userName)) {
      
        setErrorMessage('')

        let bodyRequest = {
          email: userName.toLowerCase(),
          password: userPassword
        }
    
        const result = login(JSON.stringify(bodyRequest))

        result.then((res) => {
          if (res.error) {
            setErrorMessage(res.message)
          } 
        }) 

    } else {
      setMistake(true)
    } 
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
    setErrorMessage('')
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

  const onRegistr = (): void => {
    history.push('/registr')
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
            {errorUser}
            <input name="password"
                   value={userPassword} 
                   required placeholder="Password" 
                   type="password"
                   onChange={onChangePassword}
                   onKeyPress={onKeyPress}/>
            {errorPassword}
            {mistakeHTML}       
            {loadingHTML}
            {responseMessage}
            <div className="access_buttons">
                <button className="access_button_reset"
                        onClick={onReset}
                        disabled={loading}>Reset</button>
                <button className="access_button_submit registr_button_submit"
                        onClick={onRegistr}
                        disabled={loading}>Registr</button>
                <button className="access_button_submit"
                        onClick={onSubmit}
                        disabled={loading}>OK</button>
            </div>  
        </form>
    </div>
  )
}

export default AccessPage;