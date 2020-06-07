import React, {createContext, useState} from 'react';

export const ImageContext = createContext();

const ImageContextProvider = (props) => {
    const imageState = useState('');
    const showPreviewState = useState(false);

    return (
        <ImageContext.Provider value={{imageState, showPreviewState}}>
            {props.children}
        </ImageContext.Provider>
    );
}

export default ImageContextProvider;