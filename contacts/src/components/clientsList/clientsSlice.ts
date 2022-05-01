import { createSlice } from "@reduxjs/toolkit";
import { Iclients } from '../../interfaces'

interface Istate {
    clients: Iclients[]
    errorLoading: boolean
    loading: boolean
    user: string
    access: boolean
    editId: string
    filter: string
    token: string
}

interface IactionClients {
    payload: Iclients[]
    type: string
} 

interface IactionBoolean {
    payload: boolean
    type: string
}

interface IactionString {
    payload: string
    type: string
} 

const initialState: Istate = {
    clients: [],
    errorLoading: false,
    loading: false,
    user: '',
    access: false,
    editId: '',
    filter: '',
    token: ''
}

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientsUpdate: (state, action: IactionClients) => {
            state.clients = [...state.clients, ...action.payload]
        },
        clientsClear: (state) => {
            state.clients = []
        },
        clientDelete: (state, action: IactionClients) => {
            state.clients = action.payload
        },
        loadClientEdit: (state, action: IactionClients) => {
            state.clients = action.payload
        },
        accessUpdate: (state, action: IactionBoolean) => {
            state.access = action.payload
        },
        loadingUpdate: (state, action: IactionBoolean) => {
            state.loading = action.payload
        },
        errorLoadingUpdate: (state, action: IactionBoolean) => {
            state.errorLoading = action.payload
        },
        userUpdate: (state, action: IactionString) => {
            state.user = action.payload
        },
        editClientUpdate: (state, action: IactionString) => {
            state.editId = action.payload
        },
        filterUpdate: (state, action: IactionString) => {
            state.filter = action.payload
        },
        setToken: (state, action: IactionString) => {
            state.token = action.payload
        }
    }
});

const {actions, reducer} = clientsSlice;

export default reducer;

export const {
    clientsUpdate,
    clientsClear,
    clientDelete,
    accessUpdate,
    loadingUpdate,
    userUpdate,
    errorLoadingUpdate,
    editClientUpdate,
    loadClientEdit,
    filterUpdate,
    setToken
} = actions; 