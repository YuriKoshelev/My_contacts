import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useClientsService from '../services/ClientsService'

import {userUpdate, 
        accessUpdate, 
        errorLoadingUpdate, 
        setToken, 
        clientsClear,
        filterUpdate,
        editClientUpdate} from '../components/clientsList/clientsSlice'

import { IservResponse } from '../interfaces'

export const useAuth = () => {

    const {checkAccess, checkToken, registr} = useClientsService();

    const history = useHistory()
    const dispatch = useDispatch()

    let result: IservResponse = {
        errors: [],
        error: false,
        message: '',
        id: ''
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
                    errors: [],
                    error: true,
                    message: res.message,
                    id: ''
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
        dispatch(filterUpdate(""))
        dispatch(editClientUpdate(""))     
    }

    const registration = async (body: BodyInit) => {
        await registr(body)
        .then((res)=> {     
            result = res
        }).catch(() => {
            result.error = true
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