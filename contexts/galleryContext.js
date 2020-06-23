import React, {createContext} from 'react';
import {StoreContext} from "../store/StoreContext";

export const GalleryContext = createContext();

const GalleryContextProvider = (props) => {
    const {gallery, actions} = React.useContext(StoreContext);
    const [preview, setPreview] = React.useState(false);

    React.useEffect(() => {
        actions.setGallery(null);
    }, []);

    React.useEffect(() => {
        if (gallery.length) {
            setPreview(gallery[0]);
        }
    }, [gallery]);

    const getPreviewPicture = () => {
        return gallery.length && gallery[0];
    };

    //actions.triggerAction("data")
    //
    // React.useEffect(() => {
    //     exposedValues.populateGallery();
    // }, []);
    //
    // populateGallery = async () => {
    //     const images = await getAllRows();
    //     dispatch(dispatchFormatter('SET_GALLERY', images));
    // };
    //
    // addToGallery = (image) => {
    //     dispatch(dispatchFormatter('ADD_IMAGE', image));
    // };
    //
    // removeFromGallery = ({id}) => {
    //     dispatch(dispatchFormatter('REMOVE_IMAGE', id));
    // };
    //
    // updateImage = (image) => {
    //     dispatch(dispatchFormatter('UPDATE_IMAGE', image));
    // };
    //


    return (
        <GalleryContext.Provider value={{gallery, preview}}>
            {props.children}
        </GalleryContext.Provider>
    );
};

export default GalleryContextProvider;