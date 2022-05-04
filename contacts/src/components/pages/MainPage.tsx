import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AppHeader from '../appHeader/AppHeader'
import Search from '../search/search'
import ClientsList from '../clientsList/ClientsList'
import AddForm from '../addForm/AddForm'
import EditClient from '../editClient/EditClient'

import { Istate } from '../../interfaces'

const MainPage: React.FC = () => {
        
        const history = useHistory()
        const {access} = useSelector((state: Istate) => state.clients)

        if (access === false) {
            history.push('/')
            return <></>
        }

        return (
            <>
                <AppHeader/>
                <Search/>
                <div className="clients">
                    <ClientsList/>
                    <AddForm/>
                </div>
                <EditClient/>
            </>
        )
}

export default MainPage;