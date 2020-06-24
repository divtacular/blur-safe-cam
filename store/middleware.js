import faceDetect from '../services/faceDetect';
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
        return filesystemActions.ADD_IMAGE(action.value).then((asset) => {
            //add to DB
            Promise.all([faceDetect.DETECT_FACES(asset), databaseActions.ADD_IMAGE(asset)]).then((res) => {
                const [faceDetectRes, rowInsertRes] = res;

                const asset = {
                    ...rowInsertRes,
                    ...faceDetectRes
                }
                //try to update record with faceData. User could have delete image by now.
                databaseActions.UPDATE_IMAGE(asset).catch(() => {
                    console.log('update error, record deleted?');
                });
            });

            //dispatch file to state
            return {
                ...action,
                value: asset
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
                } catch (e) {
                    console.log('e:', e);
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