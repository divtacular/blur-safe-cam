import React, {createContext, useReducer} from "react";
import {reducer} from "./reducers";
import useActions from "./actions";
import applyMiddleware from "./middleware";

export const StoreContext = createContext();

const StoreProvider = ({children}) => {
    const [gallery, dispatch] = useReducer(reducer, []);
    const middlewareDispatch = applyMiddleware(dispatch); //don't expose dispatch, expose middleware
    const actions = useActions(gallery, middlewareDispatch);

    // React.useEffect(() => {
    //     console.log('g', gallery);
    // }, [gallery])

    return (
        <StoreContext.Provider value={{gallery, middlewareDispatch, actions}}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
