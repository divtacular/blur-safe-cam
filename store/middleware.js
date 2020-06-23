import databaseActions from "../services/database";
import filesystemActions from "../services/filesystem";

import {types} from "./reducers";

const middleWareActions = {
    SET_GALLERY: (action) => {
        return databaseActions.SET_GALLERY().then((value) => {
            return {
                ...action,
                value
            };
        }).catch(() => console.log('mw: 13'));
    },
    ADD_IMAGE: (action) => {
        //create asset
        return filesystemActions.ADD_IMAGE(action.value).then((file) => {
            //add to DB
            databaseActions.ADD_IMAGE(file);
            //dispatch file to state
            return {
                ...action,
                value: file
            }
        }).catch(() => console.log('mw: 25'));
    }
};

const applyMiddleware = (dispatch) => {

    return (action) => {
        console.log()
        const middlewareAction = middleWareActions[action.type];

        if (middlewareAction) {
            //if action found, pass through middleware
            middlewareAction(action).then((res) => {
                try {
                    dispatch(res);
                } catch(e) {
                    console.log(e);
                }
            }).catch(() => {
                console.log('mw: 43');
            });
        } else {
            return dispatch(action);
        }
    }
};

export default applyMiddleware;