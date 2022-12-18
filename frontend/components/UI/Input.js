import classes from '../../styles/Form.module.css';

export default function FormikInput(props) {
    return (
        <div className={classes.field}>
            <label className={classes.label} htmlFor={props.id}>
                {props.label}
            </label>
            {props.type !== 'text-area' ? (
                <input
                    className={classes.input}
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    value={props.value}
                />
            ) : (
                <textarea
                    className={classes.input}
                    id={props.id}
                    name={props.name}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    value={props.value}
                ></textarea>
            )}
        </div>
    );
}
