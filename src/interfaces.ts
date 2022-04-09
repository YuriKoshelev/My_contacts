export interface Iclients {
    id: string,
    user: string,
    name: string,
    phone: string,
    email: string 
}

export interface Istate {
    clients: {
        clients: Array<Iclients>
        errorLoading: boolean
        loading: boolean
        user: string
        access: boolean
        editId: number
        filter: string
    }
}

export interface Iaccess {
    id: string,
    name: string,
    password: string
}

