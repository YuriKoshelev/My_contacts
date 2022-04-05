import {useHttp} from '../hooks/http.hooks'
import {InewClientRequest} from '../interfaces'

const useClientsService = () => {
    const request = useHttp()

    const _apiBase: string = 'http://localhost:3001'

    const checkAccess = async (user: string, password: string) => {

        const res = await request(`${_apiBase}/access?id=${user}&password=${password}`);
        return res
    }

    const getClients = async (user: string) => {
        
        const res = await request(`${_apiBase}/clients?user=${user}`);
        return res
    }

    const addClient = async (body: BodyInit) => {
        
        const res = await request(`${_apiBase}/clients`, "POST", body);
        return res
    }

    const editClient = async (body: BodyInit, id: string) => {
        
        const res = await request(`${_apiBase}/clients/${id}`, "PUT", body);
        return res
    }

    const deleteClient = async (id: string) => {
        
        const res = await request(`${_apiBase}/clients/${id}`, "DELETE");
        return res
    }


    return {checkAccess, getClients, addClient, deleteClient, editClient}
}

export default useClientsService;