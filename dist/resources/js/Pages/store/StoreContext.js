import { jsx as _jsx } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { createContext, useContext, useEffect, useReducer, } from "react";
const initialState = {
    openEditModal: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "EDIT_TASK":
            return Object.assign(Object.assign({}, state), { openEditModal: state.openEditModal === action.payload
                    ? null
                    : action.payload });
        case "CLOSE_MODALS":
            return Object.assign(Object.assign({}, state), { openTaskId: null });
        default:
            return state;
    }
};
const StoreContext = createContext(null);
export const StoreProvider = ({ children }) => {
    const { props } = usePage();
    const [state, dispatch] = useReducer(reducer, initialState);
    const openEditModal = (taskId) => {
        dispatch({ type: "EDIT_TASK", payload: taskId });
    };
    const closeModals = () => {
        dispatch({ type: "CLOSE_MODALS" });
    };
    useEffect(() => {
        if (state.openEditModal && Object.keys(props.errors).length === 0) {
            state.openEditModal = null;
        }
    }, [props.errors]);
    return (_jsx(StoreContext.Provider, { value: { state, openEditModal, closeModals }, children: children }));
};
export const useStore = () => {
    return useContext(StoreContext);
};
