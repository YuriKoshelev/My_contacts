import {useHttp} from '../hooks/http.hooks'
import { Iaccess, Iclients, IservResponse } from '../interfaces'

interface Iheaders {
    "Content-Type": string,
    token?: string
}

const useClientsService = () => {
    const request = useHttp()

    const _apiBase: string = 'http://localhost:5000'
    
    const getHeaders= () => {
        const dataStorage = localStorage.getItem('userData')
        const headers: Iheaders = {
            'Content-Type': 'application/json',
        }

        if (dataStorage) {
            const data = JSON.parse(dataStorage)

            if (data.token) {
                headers.token = data.token
            }   
        } 

        return headers
        
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

        const res: IservResponse = await request(`${_apiBase}/api/auth/register`, "POST", body);
        return res
    }

    const getClients = async () => {

        const res: Iclients = await request(`${_apiBase}/api/contacts`, "GET", null, getHeaders());
        return res
    }

    const addClient = async (body: BodyInit) => {
        
        const res: IservResponse = await request(`${_apiBase}/api/contacts/newcontact`, "POST", body, getHeaders());
        return res
    }

    const editClient = async (body: BodyInit, id: string) => {
        
        const res: IservResponse = await request(`${_apiBase}/api/contacts/`, "PUT", body, getHeaders());
        return res
    }

    const deleteClient = async (id: string) => {

        const res: IservResponse = await request(`${_apiBase}/api/contacts/${id}`, "DELETE", null, getHeaders());
        return res
    }


    return {checkAccess, checkToken, getClients, addClient, deleteClient, editClient, registr}
}

export default useClientsService;