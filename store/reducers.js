export const types = {
    ADD_IMAGE: "ADD_IMAGE",
    REMOVE_IMAGE: "REMOVE_IMAGE",
    UPDATE_IMAGE: "UPDATE_IMAGE",
    SET_GALLERY: "SET_GALLERY",
};

export const reducer = (state, action) => {

    if (!action) {
        console.warn('reducer called without action')
        return;
    }

    const actions = {
        SET_GALLERY: (state, value) => {
            //console.log('SET: ', value);
            return value && value.length ? [
                ...value
            ] : [];
        },
        ADD_IMAGE: (state, image) => {
            //console.log('ADD: ', image)
            return [
                image,
                ...state
            ]
        },
        UPDATE_IMAGE: (state, updatedAsset) => {
            //console.log('UPDATE: ', updatedAsset);
            return state.map((image) => {
                return image.id === updatedAsset.id ? updatedAsset : image;
            });
        },
        REMOVE_IMAGE: (state, {id}) => {
            //console.log('REMOVE: ', id)
            return state.filter(image => image.id !== id);
        },
    };

    return actions[action.type](state, action.value) || console.error(`Invalid action type: ${action.type}`);
}