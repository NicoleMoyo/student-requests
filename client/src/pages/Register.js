import {React, useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import Icon from 'react-icons-kit';
import {view} from 'react-icons-kit/ikons/view';
import {view_off} from 'react-icons-kit/ikons/view_off';
import {circle_delete} from 'react-icons-kit/ikons/circle_delete';
import {circle_ok} from 'react-icons-kit/ikons/circle_ok';
import axios from 'axios';

YupPassword(Yup);

function Register() {

    const [type, setType] = useState('password');

    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    const handleChange = (value) => {
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#$%^&*])');
        const length = new RegExp('(?=.{8,})');

        lower.test(value) === true ? setLowerValidated(true) : setLowerValidated(false);
        upper.test(value) === true ? setUpperValidated(true) : setUpperValidated(false);
        number.test(value) === true ? setNumberValidated(true) : setNumberValidated(false);
        special.test(value) === true ? setSpecialValidated(true) : setSpecialValidated(false);
        length.test(value) === true ? setLengthValidated(true) : setLengthValidated(false);
    }

    const initialValues = {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        role: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username cannot be empty').min(3, 'Username must be at least 6 characters').max(15, "Username must be less than 15 characters"),
        first_name: Yup.string().required('First name cannot be empty'),
        last_name: Yup.string().required('Last name cannot be empty'),
        password: Yup.string().password().min(8, "Password should be more than 8 characters").required("Password cannot be empty"),
        confirm_password: Yup.string().password().required("Confirm password cannot be empty").oneOf([Yup.ref('password'), null], 'Passwords must match'),
        role: Yup.string().required("Select your role")
    });


    const onSubmit = (data) => {
        console.log(data);

        axios.post('http://localhost:3001/auth', data).then((response) => {
            console.log(response);
        })
    }

    return (
    <div>
        <div className='nav'>
            <p className='navTitle'>Create account</p>
            <div className='secondaryButton'>
            Log In
            </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
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
                    <div className="passwordField" onChange={(e) => handleChange(e.target.value)}>
                        <Field type={type} autoComplete="off" className="textField password" name='password'></Field>
                        {type === 'password' ? (
                            <span className='iconSpan' onClick={() => setType('text')}>
                                <Icon icon={view} size={18}/>
                            </span>
                        ): 
                        (
                            <span className='iconSpan' onClick={() => setType('password')}>
                                <Icon icon={view_off} size={18}/>
                            </span>
                        )}
                    </div>

                    <div className='tracker-box'>
                        <div className={lowerValidated ? 'validated' : 'not-validated'}>
                            {lowerValidated ? 
                            <span className='list-icon green'>
                                <Icon icon={circle_ok}/>
                            </span> :
                            <span className='list-icon'> 
                                <Icon icon={circle_delete}/>
                            </span>  }
                            At least one lowercase letter
                        </div>
                        <div className={upperValidated ? 'validated' : 'not-validated'}>
                            {upperValidated ? 
                            <span className='list-icon green'>
                                <Icon icon={circle_ok}/>
                            </span> :
                            <span className='list-icon'>
                                <Icon icon={circle_delete}/>
                            </span>  }
                            At least one uppercase letter
                        </div>
                        <div className={numberValidated ? 'validated' : 'not-validated'}>
                            {numberValidated ? 
                            <span className='list-icon green'>
                                <Icon icon={circle_ok}/>
                            </span> :
                            <span className='list-icon'>
                                <Icon icon={circle_delete}/>
                            </span>  }
                            At least one number
                        </div>
                        <div className={specialValidated ? 'validated' : 'not-validated'}>
                            {specialValidated ? 
                            <span className='list-icon green'>
                                <Icon icon={circle_ok}/>
                            </span> :
                            <span className='list-icon'>
                                <Icon icon={circle_delete}/>
                            </span>  }
                            At least one special character
                        </div>
                        <div className={lengthValidated ? 'validated' : 'not-validated'}>
                            {lengthValidated ? 
                            <span className='list-icon green'>
                                <Icon icon={circle_ok}/>
                            </span> :
                            <span className='list-icon'>
                                <Icon icon={circle_delete}/>
                            </span>  }
                            At least 8 characters
                        </div>
                    </div>
                    
                    <ErrorMessage name='password' component='div' id='errorMessage' />
                </div>
                <div className='authFormInput'>
                    <label>Confirm Password</label>
                    <Field autoComplete="off"  className="textField" name='confirm_password' type='password'></Field>
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