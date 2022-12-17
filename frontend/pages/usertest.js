import { useFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classes from '../styles/Form.module.css';

const defaultFormValues = {
    name: '',
    email: '',
    username: '',
    website: '',
    bio: '',
    twitter: '',
    lenster: '',
    instagram: '',
    discord: '',
    github: '',
};

const FormikInput = props => {
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
                    value={props.value}
                />
            ) : (
                <textarea
                    className={classes.input}
                    id={props.id}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                ></textarea>
            )}
        </div>
    );
};

const createEditUserInputs = [
        { id: 'name', type: 'text', label: 'Name' },
        { id: 'email', type: 'email', label: 'E-Mail' },
        { id: 'username', type: 'text', label: 'Username' },
        { id: 'website', type: 'url', label: 'Website' },
        { id: 'bio', type: 'text-area', label: 'Bio' },
        { id: 'twitter', type: 'url', label: 'Twitter' },
        { id: 'lenster', type: 'url', label: 'Lenster' },
        { id: 'instagram', type: 'url', label: 'Instagram' },
        { id: 'discord', type: 'text', label: 'Discord' },
        { id: 'github', type: 'url', label: 'GitHub' },
    ],
    stringValid = [3, 'Must be ${this.len} characters or more'],
    validateLinks = linkName => {
        const greps = {
            twitter: /https:\/\/twitter\.com\/[A-Za-z0-9]+/,
            lenster: /https:\/\/lenster\.xyz\/u\/[A-Za-z0-9]+/,
            instagram: /https:\/\/www.instagram.com\/[A-Za-z0-9]+/,
            discord: /[A-Za-z0-9]+#\d{4}/,
            github: /https:\/\/github\.com\/[A-Za-z0-9]+/,
        };
        return Yup.string().matches(greps[linkName], {
            message: `Invalid ${linkName} link`,
            excludeEmptyString: true,
        });
    },
    createEditUserValidationSchema = {
        name: Yup.string().min(...stringValid),
        email: Yup.string().email('Invalid email address'),
        username: Yup.string().min(...stringValid),
        website: Yup.string().url('Invalid website'),
        bio: Yup.string().min(...stringValid),
        twitter: validateLinks('twitter'),
        lenster: validateLinks('lenster'),
        instagram: validateLinks('instagram'),
        discord: validateLinks('discord'),
        github: validateLinks('github'),
    };

export default function CreateEditUser() {
    const formik = useFormik({
        initialValues: {
            ...defaultFormValues,
        },
        validationSchema: Yup.object({ ...createEditUserValidationSchema }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            {createEditUserInputs.map(field => (
                <>
                    <FormikInput
                        key={field.id}
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        label={field.label}
                        onChange={formik.handleChange}
                        value={formik.values[field.id]}
                    />
                    {formik.touched[field.id] && formik.errors[field.id] ? (
                        <div>{formik.errors[id]}</div>
                    ) : null}
                </>
            ))}
            <input className={classes.input} type='submit' value='Submit' />
        </form>
    );
}
