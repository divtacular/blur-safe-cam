import React, {createContext} from 'react';
import {StoreContext} from "../store/StoreContext";

export const GalleryContext = createContext();

const GalleryContextProvider = (props) => {
    const {gallery, reducerActions} = React.useContext(StoreContext);
    const [preview, setPreview] = React.useState(false);

    React.useEffect(() => {
        reducerActions.setGallery(null);
    }, []);

    React.useEffect(() => {
        if (gallery && gallery.length) {
            setPreview(gallery[0]);
        }
    }, [gallery]);

    return (
        <GalleryContext.Provider value={{gallery, preview}}>
            {props.children}
        </GalleryContext.Provider>
    );
};

export default GalleryContextProvider;