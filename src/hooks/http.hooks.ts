import {useCallback} from 'react';

export const useHttp = () => {
    //const [process, setProcess] = useState<string>('waiting');
    
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
            //setProcess('error')
            throw e
        }

    }, [])

    return request
}