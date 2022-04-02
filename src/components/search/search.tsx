import React from "react";
import "./search.css"

const Search: React.FunctionComponent = () => {
    return (
        <section className="search">
            <div className="">
                <input className="search_clients" type="text" placeholder='Find a client'/>
            </div>
        </section>
    )
}

export default Search; 