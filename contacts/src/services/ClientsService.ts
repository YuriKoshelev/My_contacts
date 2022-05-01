import {useHttp} from '../hooks/http.hooks'
import { Iaccess, Iclients, Iregistr } from '../interfaces'
 
const useClientsService = () => {
    const request = useHttp()

    //const _apiBase: string = 'http://localhost:3001'
    const _apiBase: string = 'http://localhost:5000'
    
    const getHeaders= () => {
        const dataStorage = localStorage.getItem('userData')
    
        if (dataStorage) {
        const data = JSON.parse(dataStorage)

            if (data.token) {
                const headers = {
                    'Content-Type': 'application/json',
                    token: data.token
                }
                return headers
            } else {
                const headers = {
                    'Content-Type': 'application/json'
                }
                return headers
            }
        }
        
    }


    const checkAccess = async (body: BodyInit) => {

        const res: Iaccess = await request(`${_apiBase}/api/auth/login`, "POST", body);
        return res
    }

    const checkToken = async (body: BodyInit) => {

        const res: Iaccess = await request(`${_apiBase}/api/auth/verifytoken`, "POST", body);
        return res
    }

    const registr = async (body: BodyInit) => {

        const res: Iregistr = await request(`${_apiBase}/api/auth/register`, "POST", body);
        return res
    }

    const getClients = async () => {

        const res: Iclients = await request(`${_apiBase}/api/contacts`, "GET", null, getHeaders());
        return res
    }

    const addClient = async (body: BodyInit) => {
        
        const res: Iclients = await request(`${_apiBase}/api/contacts/newcontact`, "POST", body, getHeaders());
        return res
    }

    const editClient = async (body: BodyInit, id: string) => {
        
        const res: Iclients = await request(`${_apiBase}/api/contacts/`, "PUT", body, getHeaders());
        return res
    }

    const deleteClient = async (id: string) => {

        const res: Iaccess = await request(`${_apiBase}/api/contacts/${id}`, "DELETE", null, getHeaders());
        return res
    }


    return {checkAccess, checkToken, getClients, addClient, deleteClient, editClient, registr}
}

export default useClientsService;