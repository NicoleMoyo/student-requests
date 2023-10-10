import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Register() {
    const initialValues = {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Cannot send an empty request').min(6, 'Feedback must be at least 6 characters')
    });

    const onSubmit = () => {

    }

    return (
    <div>
        <div className='nav'>
            <p className='navTitle'>Create account</p>
            <div className='secondaryButton'>
            Log In
            </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='authForm'>
                <div className='authFormInput'>
                    <label>First name</label>
                    <Field className="textField" name='first_name'></Field>
                    <ErrorMessage name='first_name' component='div' id='errorMessage' />
                </div>
                <div className='authFormInput'>
                    <label>Last name</label>
                    <Field className="textField" name='last_name'></Field>
                    <ErrorMessage name='last_name' component='div' id='errorMessage' />
                </div>
                <div className='authFormInput'>
                    <label>Username</label>
                    <Field className="textField" name='username'></Field>
                    <ErrorMessage name='username' component='div' id='errorMessage' />
                </div>
                <div className='authFormInput'>
                    <label>Password</label>
                    <Field className="textField" name='password'></Field>
                    <ErrorMessage name='password' component='div' id='errorMessage' />
                </div>
                <div className='authFormInput'>
                    <label>Confirm Password</label>
                    <Field className="textField" name='confirm_password'></Field>
                    <ErrorMessage name='confirm_password' component='div' id='errorMessage' />
                </div>
                <div className='authFormInput'>
                    <label>I am a...</label>
                    <div name="request_type" role="group" aria-labelledby="my-radio-group" className='requestTypeSection'>
                        <label className='requestTypeSelect'>
                        <Field type="radio" name="role" value="Student" />
                                    Student
                        </label>
                        <label className='requestTypeSelect'>
                        <Field type="radio" name="role" value="Facilitator" />
                                    Facilitator 
                        </label>
                        <label className='requestTypeSelect'>
                        <Field type="radio" name="role" value="Team Lead" />
                                    Team Lead
                        </label>
                    </div>
                    <ErrorMessage name='role' component='div' id='errorMessage' />
                </div>

                <button className='authButton' type='submit'>Create Account</button> 
            </Form>
        </Formik>
    </div>
  )
}

export default Register