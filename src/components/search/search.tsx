import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Istate } from '../../interfaces'

import {filterUpdate} from "../clientsList/clientsSlice"

import "./search.css"

const Search: React.FunctionComponent = () => {
    
    //const {clients, editId, user} = useSelector((state: Istate) => state.clients)
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
                       placeholder='Find a client'/>
            </div>
        </section>
    )
}

export default Search; 