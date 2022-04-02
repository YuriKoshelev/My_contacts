import React from "react";
import "./addForm.css"

const AddForm: React.FC = () => {
    return (
        <div className="add_client">
            <form className="form_add" action="#">                
                <div className="form_headline">Add a client</div>
                <input name="name" required placeholder="Client's name" type="text"/>
                <input name="phone" required placeholder="Phone number" type="number"/>
                <input name="email" required placeholder="E-mail" type="email"/> 
                <button className="button_submit">Add</button>
            </form>
        </div>
    )
}

export default AddForm;