import {useHttp} from '../hooks/http.hooks'

const useClientsService = () => {
    const request = useHttp()

    const _apiBase: string = 'http://localhost:3001'

    const checkAccess = async (user: string, password: string) => {
        console.log(55555)
        const res = await request(`${_apiBase}/access?id=${user}&password=${password}`);
        console.log(res)
    }


    return {checkAccess}
}

export default useClientsService;