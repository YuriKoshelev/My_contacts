export interface Iclients {
    id: string,
    name: string,
    phone: string,
    email: string,
    error?: boolean
}

export interface Istate {
    clients: {
        clients: Array<Iclients>
        errorLoading: boolean
        loading: boolean
        user: string
        access: boolean
        editId: string
        filter: string
        token: string
    }
}

export interface Iaccess {
    error: boolean,
    message: string,
    token: string,
    userId: string,
    user: string
}

export interface Iregistr {
    errors: Array<string>,
    error: boolean,
    message: string
}

export interface Ilogin {
    error: boolean,
    message: string
}