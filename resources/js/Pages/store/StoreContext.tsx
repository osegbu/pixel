import { usePage } from "@inertiajs/react";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from "react";

const initialState = {
    openEditModal: null,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "EDIT_TASK":
            return {
                ...state,
                openEditModal:
                    state.openEditModal === action.payload
                        ? null
                        : action.payload,
            };
        case "CLOSE_MODALS":
            return {
                ...state,
                openTaskId: null,
            };
        default:
            return state;
    }
};

const StoreContext = createContext<any>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const { props } = usePage();
    const [state, dispatch] = useReducer(reducer, initialState);

    const openEditModal = (taskId: number | undefined) => {
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

    return (
        <StoreContext.Provider value={{ state, openEditModal, closeModals }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    return useContext(StoreContext);
};
