import React, {createContext} from 'react';
import ImagesDB from '../utils/database';

export const DatabaseContext = createContext();

const DatabaseContextProvider = (props) => {

    React.useEffect(() => {
        (async () => {
            await ImagesDB.createTable();
        })();
    }, []);

    return (
        <DatabaseContext.Provider>
            {props.children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;