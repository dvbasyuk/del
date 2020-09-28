const SEND_MESSAGE = 'SEND_MESSAGE';
type DialogType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
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
type InitialStateType = typeof initialState
const dialogsReducer = (state:InitialStateType = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 7, message: body }]
            }
        default:
            return state;
    }
}

type SendMessageActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string):SendMessageActionType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;