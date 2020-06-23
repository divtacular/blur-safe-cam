import {types} from "./reducers";

const useActions = (state, dispatch) => ({
    addImage: (value) => {
        return dispatch({type: types.ADD_IMAGE, value});
    },
    removeImage: (value) => {
        return dispatch({type: types.REMOVE_IMAGE, value});
    },
    updateImage: (value) => {
        return dispatch({type: types.UPDATE_IMAGE, value})
    },
    setGallery: (value) => {
        return dispatch({type: types.SET_GALLERY, value})
    }
});

export default useActions;
