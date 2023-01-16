const initialState = {
    theme: 'dark',
    

}
/*
    updateData a true indica que han de refrescarse los datos del usuario (despues de añadir o editar información)
*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // DENY_ACTION
        case "CHANGE_THEME":
            return { ...state, pendingAction: null, needsConfirm: null };

        default:
            return state;
    }
};

export default reducer;