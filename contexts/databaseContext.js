import React, {createContext} from 'react';
import ImagesDB from '../utils/database';
import {types} from "expo-sqlite-orm";

export const DatabaseContext = createContext();

const DatabaseContextProvider = (props) => {

    React.useEffect(() => {
        // ImagesDB.dropTable().then(() => {
            ImagesDB.createTable();
        // });
    }, []);


    return (
        <DatabaseContext.Provider>
            {props.children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;