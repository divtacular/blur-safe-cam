import databaseActions from "../middleware/database";
import {types} from "./reducers";

const middleWareActions = {
    SET_GALLERY: (action) => {
        return databaseActions.SET_GALLERY(action.value).then((value) => {
            return {
                ...action,
                value
            };
        });
    }
};

const applyMiddleware = (dispatch) => {

    return (action) => {
        const middlewareAction = middleWareActions[action.type];

        if (middlewareAction) {
            //if action found, pass through middleware
            middlewareAction(action).then((res) => {
                dispatch(res);
            });
        } else {
            return dispatch(action);
        }
    }
};

export default applyMiddleware;