import React from 'react'
import { useDispatch } from 'react-redux'

import {filterUpdate} from '../clientsList/clientsSlice'

import './search.css'

const Search: React.FunctionComponent = () => {
    
    const dispatch = useDispatch()

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        dispatch(filterUpdate(e.target.value))
    }

    return (
        <section className="search">
            <div className="">
                <input className="search_clients" 
                       onChange={onChangeSearch}
                       type="text" 
                       placeholder='Find a contact'/>
            </div>
        </section>
    )
}

export default Search; 