import classes from '../../styles/Form.module.css';

export default function Form(props) {
    return <form className={classes.form}>{props.children}</form>;
}
