import React from 'react';
import { sendMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { DialogType, MessagesType } from '../../types/types';

type MapStatePropsType = {

        dialogs: Array<DialogType>
        messages: Array<MessagesType>

}
type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}
type OwnPropsType = {}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { sendMessage }),
    withAuthRedirect
)(Dialogs)

