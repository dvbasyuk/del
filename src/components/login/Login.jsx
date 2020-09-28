import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { requiredField } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControl';
import s from '../common/FormsControls/FormsControl.module.css'

const Login = (props) => {
    debugger
    const onSubmit = (formData) => {
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

const LoginForm = ({ handleSubmit, error, captchUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            { createField("Login", Input, "login", [requiredField])}
            { createField("Password", Input, "password", [requiredField], { type: "password" })}
            { createField(null, Input, "rememberMe", [], { type: "checkbox" }, "remember me")}

            {captchUrl && <img src={captchUrl} />}
            {captchUrl && createField("Symbols from image", Input, "captcha", [requiredField])}

            {error &&
                <div className={s.forSummaryError}>
                    {error}
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchUrl: state.auth.captchUrl
})
export default connect(mapStateToProps, { login })(Login)

