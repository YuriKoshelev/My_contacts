import { createSlice } from "@reduxjs/toolkit";

interface Istate {
    clients: Array<string>
    errorLoading: boolean
    loading: boolean
    user: string
    access: boolean
    editId: number
    filter: string
}

const initialState: Istate = {
    clients: [],
    errorLoading: false,
    loading: false,
    user: '',
    access: false,
    editId: -1,
    filter: ''
}

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientsUpdate: (state, action) => {
            state.clients = [...state.clients, ...action.payload]
        },
        clientsClear: (state) => {
            state.clients = []
        },
        clientDelete: (state, action) => {
            state.clients = action.payload
        },
        loadClientEdit: (state, action) => {
            state.clients = action.payload
        },
        accessUpdate: (state, action) => {
            state.access = action.payload
        },
        loadingUpdate: (state, action) => {
            state.loading = action.payload
        },
        errorLoadingUpdate: (state, action) => {
            state.errorLoading = action.payload
        },
        userUpdate: (state, action) => {
            state.user = action.payload
        },
        editClientUpdate: (state, action) => {
            state.editId = action.payload
        },
        filterUpdate: (state, action) => {
            state.filter = action.payload
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
    filterUpdate
} = actions;