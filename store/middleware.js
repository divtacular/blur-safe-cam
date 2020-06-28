import faceDetect from '../services/faceDetect';
import databaseActions from "../services/database";
import filesystemActions from "../services/filesystem";

import {types} from "./reducers";

let dispatcher;

const middleWareActions = {
    SET_GALLERY: (action) => {
        return databaseActions.SET_GALLERY().then((value) => {
            return {
                ...action,
                value
            };
        }).catch(() => console.log('mw: 13 - No data in database?'));
    },
    ADD_IMAGE: (action) => {
        //create asset
        return filesystemActions.ADD_IMAGE(action.value).then((asset) => {
            //add to DB
            Promise.all([faceDetect.DETECT_FACES(asset), databaseActions.ADD_IMAGE(asset)]).then((res) => {
                const [faceDetectRes, rowInsertRes] = res;

                const value = {
                    ...rowInsertRes,
                    faceData: faceDetectRes
                };
                //dispatch new event with facedata
                (applyMiddleware(dispatcher))({type: types.UPDATE_IMAGE, value});
            });

            //dispatch file to state
            return {
                ...action,
                value: asset
            }
        }).catch(() => console.log('mw: 25'));
    },
    UPDATE_IMAGE: (action) => {
        return databaseActions.UPDATE_IMAGE(action.value).then(() => {
            console.log('image updated');
            return action;
        }).catch(() => {
            console.log('update error, record deleted?');
        });
    },
    REMOVE_IMAGE: (action) => {
        filesystemActions.REMOVE_IMAGE(action.value);
        return databaseActions.REMOVE_IMAGE(action.value).then(() => {
            return action;
        });
    }
};

const applyMiddleware = (dispatch) => {

    dispatcher = dispatch;

    return (action) => {
        const middlewareAction = middleWareActions[action.type];
        if (middlewareAction) {
            //if action found, pass through middleware
            middlewareAction(action).then((res) => {
                try {
                    dispatch(res);
                } catch (e) {
                    dispatch(action);
                    console.log('e:', e);
                }
            }).catch((e) => {
                console.log('mw: 43', e);
            });
        } else {
            return dispatch(action);
        }
    }
};

export default applyMiddleware;