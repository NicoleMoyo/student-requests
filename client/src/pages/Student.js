import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Student() {
    const [requests, setRequests] = useState();
    const [responses, setResponses] = useState();
    const [facilitators, setFacilitators] = useState();
    const [hiddenState, setHiddenState] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/requests/staff').then((response) => {
            console.log(response.data);
            setFacilitators(response.data);
        });

        // get student data
        axios.get('http://localhost:3001/requests/student/helenqaqamba').then((response) => {
            if (response.data.error) {
                navigate('/login');
            } else {
                setRequests(response.data.requests);
                setResponses(response.data.responses);
            }
            
        });
    }, [navigate]);

    const initialValues = {
        content: ''
    };

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('Cannot send an empty request').min(6, 'Feedback must be at least 6 characters'),
        request_type: Yup.string().required('Select request type')
    });

    const onSubmit = (data) => {
        console.log(data);
        const sendData = {
            creator_id: 'helenqaqamba',
            request_type: data.request_type,
            content: data.content,
            assigned_id: data.request_type === 'Admin'? 'kingcs': data.assigned_id
        }
        axios.post('http://localhost:3001/requests', sendData).then((response) => {
            console.log('It worked!')
        });
    }
  return (
    <div>
            <div className='nav'>
            <p className='navTitle'>Student</p>
            <div className='secondaryButton'>
            Log Out
            </div>
        </div>
        <p className='pageTitle'>Submit Request</p>
            <div className='newRequestsSection'>
                <div className='addResponseSection'>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form className='responseForm'>
                            <div className='responseFormContent'>
                                <label>Add new request...</label>
                                <Field id='inputResponse' name='content' component='textarea'></Field>
                                <ErrorMessage name='content' component='div' id='errorMessage' />
                                <label>Type of request</label>
                                <div name="request_type" role="group" aria-labelledby="my-radio-group" className='requestTypeSection'>
                                    <label onClick={() => setHiddenState(false)} className='requestTypeSelect'>
                                    <Field type="radio" name="request_type" value="Academic" />
                                    Academic
                                    </label>
                                    <label onClick={() => setHiddenState(true)}  className='requestTypeSelect'>
                                    <Field type="radio" name="request_type" value="Admin" />
                                    Administrative
                                    </label>
                                </div>
                                <ErrorMessage name='request_type' component='div' id='errorMessage' />
                                <label hidden={hiddenState}>Select facilitator to send request to</label>
                                <div hidden={hiddenState}>                                    
                                    <Field className='facilitatorSection' name="assigned_id" component="select">
                                        <option name="assigned_id" value='default'>Select option</option>
                                        {facilitators?.map((value, key) => {
                                            return (
                                                value.role === 'Facilitator' ?
                                                <option key={key} name="assigned_id" value={value.username}>{value.first_name} {value.last_name}</option> :
                                                <></>
                                            )
                                        })}
                                    </Field>
                                </div>
                                
                                {/* <ErrorMessage name='assigned_id' component='div' id='errorMessage' /> */}
                            </div>
                            <button type='submit'>Send Request</button> 
                        </Form>
                    </Formik>
                </div>      
            </div>

        <p className='pageTitle'>Requests</p>
            <div className='requests'>
            {requests?.map((value, key) => {
            return (
                <div key={key} className='request'>
                    <div className='requestHeader'>
                        <p className='creatorName'>{value.creator_id}</p>
                        <div className='chip'>{value.request_type === 'Admin' ? 'Administrative' : value.request_type}</div>
                    </div>
                    <p className='content'>{value.content}</p>
                    <div className='feedbackSection'>
                        <div className='responseLine'></div>
                        {/* if the facilitator already responded */}
                        {(responses.some(response => response.request_id === value.id)) ?
                        <div className='feedbackContent'>
                            <p className='creatorName'>{value.request_type === 'Admin'? 'Response by CS Team Lead' : 'Feedback from facilitator'}</p>
                            <p>{responses.find(({request_id}) => request_id === value.id).content}</p>
                        </div>
                        :
                        // if the facilitator/lead did not respond
                        <p className='contentLoading'>Feedback pending...</p>                  
                        }        
                    </div>
                </div>
                )
            })}
            </div>
        </div>
  )
}

export default Student