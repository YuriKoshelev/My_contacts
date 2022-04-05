import {useCallback} from 'react';
import { useDispatch } from 'react-redux';
import {errorLoadingUpdate} from "../components/clientsList/clientsSlice"

export const useHttp = () => {
    
    const dispatch = useDispatch()

    const request= useCallback(async (url: string, 
                                      method: string = 'GET', 
                                      body: BodyInit | null = null, 
                                      headers: {} = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(url, {method, body, headers})
           
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);  
            }

            const data = await response.json()

            return data

        } catch(e) {
            dispatch(errorLoadingUpdate(true))
            throw e
        }

    }, [])

    return request
}