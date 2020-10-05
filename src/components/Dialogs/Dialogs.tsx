import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControl';
import { maxLengthCreator, requiredField } from '../../utils/validators/validators';
import { DialogType, MessagesType } from '../../types/types';

const maxLength50 = maxLengthCreator(50)
type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessagesType>
    sendMessage:(value:string)=>void
}
type DialogFormValueType = {
    newMessageBody:string
}
const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
    let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id} />);

    let addNewMessage = (values:DialogFormValueType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<DialogFormValueType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                    name={"newMessageBody"}
                    placeholder='Enter your message' 
                    validate={[requiredField, maxLength50]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<DialogFormValueType>({ form: 'messageForm' })(AddMessageForm)
export default Dialogs;