import React from 'react';

import AppHeader from '../appHeader/AppHeader';
import Search from '../search/search';
import ClientsList from '../clientsList/ClientsList';
import AddForm from '../addForm/AddForm';

const MainPage: React.FC = () => {
        return (
            <>
                <AppHeader/>
                <Search/>
                <div className="clients">
                    <ClientsList/>
                    <AddForm/>
                </div>
            </>
        )
}

export default MainPage;