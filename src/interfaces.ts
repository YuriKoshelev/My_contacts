export interface IclientsList {
    id: string,
    user: string,
    name: string,
    phone: string,
    email: string 
}

export interface Istate {
    clients: {
        clients: Array<IclientsList>
        errorLoading: boolean
        loading: boolean
        user: string
        access: boolean
    }
}

export interface InewClientRequest {
    id: string,
    user: string,
    name: string,
    phone: string,
    email: string
}