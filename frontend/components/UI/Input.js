import React, { useRef, useImperativeHandle } from 'react';
import classes from '../../styles/Form.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef(),
        activate = () => {
            inputRef.current.focus();
        };
    useImperativeHandle(ref, () => {
        return { focus: activate };
    });

    return (
        <div
            className={`${classes.field}  ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label className={classes.label} htmlFor={props.id}>
                {props.label}
            </label>
            <input
                ref={inputRef}
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
