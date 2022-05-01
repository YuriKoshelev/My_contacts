import { useDispatch } from "react-redux"
import useClientsService from '../services/ClientsService'
import { useHistory } from 'react-router-dom'

import {userUpdate, accessUpdate, errorLoadingUpdate, setToken, clientsClear} from "../components/clientsList/clientsSlice"

import { Ilogin } from '../interfaces'

export const useAuth = () => {

    const {checkAccess, checkToken, registr} = useClientsService();

    const history = useHistory()
    const dispatch = useDispatch()

    let result: Ilogin = {
        error: false,
        message: ''
    }

    const loginToken = () => {
        
        dispatch(errorLoadingUpdate(false))

        const dataStorage = localStorage.getItem('userData')
    
        if (dataStorage) {
        const data = JSON.parse(dataStorage)

            if (data.token) {
                let bodyRequest = {
                userToken: data.token
                }
                    checkToken(JSON.stringify(bodyRequest))
                    .then((res) => {
                    if (!res.error) {
                        setLogin(data.user, data.token)
                    } else {
                        localStorage.removeItem('userData');
                    }
                })
            }
        }
    }

    const login = async (body: BodyInit) => {

        await checkAccess(body)
        .then((res)=> {     

            if (!res.error) {
         
                localStorage.setItem('userData', JSON.stringify({ 
                    user: res.user,
                    userId: res.userId,
                    token: res.token 
                })) 

                setLogin(res.user, res.token)
            } 
            else {
                result = {
                    error: true,
                    message: res.message
                }
            }
            
        })
        return (result)
    }

    const logout = () => {
        localStorage.removeItem('userData');
        dispatch(accessUpdate(false))
        dispatch(userUpdate(""))
        dispatch(clientsClear())     
    }

    const registration = async (body: BodyInit) => {
        await registr(JSON.stringify(body))
        .then((res)=> {     
            result = res
        }).catch((error) => {
            result.error = true
            console.log(error)
        })
        return result
    }

    const setLogin = (user:string, token:string): void => {
        dispatch(userUpdate(user.toLowerCase()))
        dispatch(accessUpdate(true))
        dispatch(setToken(token))
        history.push('/main')
    }

    const getTokenFromLS = () => {
        const dataStorage = localStorage.getItem('userData')
    
        if (dataStorage) {
        const data = JSON.parse(dataStorage)

            if (data.token) {
                return data.token
            } else {
                return ''
            }
        }
        
    }

    return {loginToken, login, registration, logout, getTokenFromLS}

}