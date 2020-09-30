import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { requiredField } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControl';
import s from '../common/FormsControls/FormsControl.module.css'

type MapStatePropsType = {
    isAuth: boolean
    captchUrl: string | null
}
type MapDispatchPropsType = {
    login: (login: string, password: string, rememberMe: boolean, captcha: string) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

type LoginFormValuesType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormOwnProps={
    captchUrl: string | null
}
type LoginFormValuesTypeKeys=Extract <keyof LoginFormValuesType, string>

const Login: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) return <Redirect to={"/profile"} />
    return (
        <div>
            <h1>login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchUrl={props.captchUrl} />
        </div>
    )
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            { createField<LoginFormValuesTypeKeys>("Login", Input, "login", [requiredField], {})}
            { createField<LoginFormValuesTypeKeys>("Password", Input, "password", [requiredField], { type: "password" })}
            { createField<LoginFormValuesTypeKeys>(undefined, Input, "rememberMe", [], { type: "checkbox" }, "remember me")}

            {props.captchUrl && <img src={props.captchUrl} />}
            {props.captchUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", Input, "captcha", [requiredField],{})}

            {props.error &&
                <div className={s.forSummaryError}>
                    {props.error}
                </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchUrl: state.auth.captchUrl
})

export default connect(mapStateToProps, { login })(Login)

