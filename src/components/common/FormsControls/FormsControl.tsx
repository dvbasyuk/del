import React, { Children } from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { ValidatorsType } from '../../../utils/validators/validators';
import s from './FormsControl.module.css';

type PropsType = {
    meta: WrappedFieldMetaProps
}
export const FormControl: React.FC<PropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')} >
            <div>
                {children}
                {
                    hasError && <span>{error} </span>
                }
            </div>
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<LoginFormKeys extends string>(placeholder: string | undefined,
    component: React.FC<WrappedFieldProps>,
    name: LoginFormKeys,
    validate: Array<ValidatorsType>,
    props: {},
    text = "") {
    return (
        <div>
            <Field placeholder={placeholder}
                component={component}
                name={name}
                validate={validate}
                {...props} />
            {text}
        </div>);
}