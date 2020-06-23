import React, {createContext} from 'react';
import ImagesDB from '../utils/database';
import {types} from "expo-sqlite-orm";

export const DatabaseContext = createContext();

const DatabaseContextProvider = (props) => {

    React.useEffect(() => {
        (async () => {
            //console.log(await ImagesDB.dropTable());
            await ImagesDB.createTable();
        })();
    }, []);

    const addRow = (asset) => {
        const { id, ...image } = asset;
        image.assetID = id || null;
        return ImagesDB.create(image);
    };

    //Return promise
    const deleteRow = (id) => {
        return ImagesDB.destroy(id);
    };

    //Return promise
    const modifyRow = (asset) => {
        return ImagesDB.update(asset)
    };

    //Return promise
    const getRow = (id) => {
        return ImagesDB.find(id);
    };

    //Return promise
    const getAllRows = () => {
        return ImagesDB.query({
            columns: '*',
            order: 'id DESC'
        });
    }

    return (
        <DatabaseContext.Provider value={{addRow, deleteRow, modifyRow, getRow, getAllRows}}>
            {props.children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseContextProvider;