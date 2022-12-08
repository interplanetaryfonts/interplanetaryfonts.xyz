import React, { useImperativeHandle, useRef } from 'react';
import classes from '../../styles/Form.module.css';

export default function Input(props, ref) {
    const inputRef = useRef();

    return (
        <div className={classes.field}>
            <label className={classes.label} htmlFor={props.htmlFor}>
                {props.label}
            </label>
            <input id={props.id} />
        </div>
    );
}
