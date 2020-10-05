import { DialogType, MessagesType } from "../types/types";
import { InferActionsTypes } from "./redux-store";


let initialState = {
    dialogs: [
        { id: 1, name: 'Darya' },
        { id: 2, name: 'Dima' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How a u?' },
        { id: 3, message: 'Ok)' }
    ] as Array<MessagesType>
};

const dialogsReducer = (state:InitialStateType = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 7, message: body }]
            }
        default:
            return state;
    }
}
//Action
export const a ={
    sendMessage: (newMessageBody: string) => ({ type: 'SEND_MESSAGE', newMessageBody } as const)
}

export default dialogsReducer;

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof a>