import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { requiredField } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControl';
import s from '../common/FormsControls/FormsControl.module.css'

type PropsType = {
    isAuth: boolean
    captchUrl: string | null
    login: (login: string | null, password: string | null, rememberMe: boolean | null, captcha: string | null) => void
}

const Login: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) return <Redirect to={"/profile"} />
    return (
        <div>
            <h1>login</h1>
            {/* <LoginReduxForm onSubmit={onSubmit} captchUrl={props.captchUrl} /> */}
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}
//@ts-ignore
const LoginForm: React.FC<InjectedFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            { createField("Login", Input, "login", [requiredField])}
            { createField("Password", Input, "password", [requiredField], { type: "password" })}
            { createField(null, Input, "rememberMe", [], { type: "checkbox" }, "remember me")}
            
            {/* {props.captchUrl && <img src={props.captchUrl} />}
            {props.captchUrl && createField("Symbols from image", Input, "captcha", [requiredField])} */}

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
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchUrl: state.auth.captchUrl
})
//@ts-ignore
export default connect(mapStateToProps, { login })(Login)

