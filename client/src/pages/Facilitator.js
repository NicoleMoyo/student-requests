import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Facilitator() {

    const [requests, setRequests] = useState();
    const [responses, setResponses] = useState();
    const [requestId, setRequestId] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001/requests/staff/sonenidube').then((response) => {
            console.log(response.data.requests);
            setRequests(response.data.requests);
            setResponses(response.data.responses);
        });
    }, []);

    const initialValues = {
        content: ''
    };

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('Cannot send an empty request').min(6, 'Feedback must be at least 6 characters')
    });

    const onSubmit = (data) => {
        const sendData = {
            creator_id: 'sonenidube',
            content: data.content,
        }
   
        axios.post(`http://localhost:3001/requests/${requestId}`, sendData).then((response) => {
            console.log(response.data);
            console.log('It worked!');
        });
    }

    return (
        <div>
            <div className='nav'>
            <p className='navTitle'>Facilitator</p>
            <div className='secondaryButton'>
            Log Out
            </div>
        </div>
        <p className='pageTitle'>Requests</p>
            <div className='requests'>
            {requests?.map((value, key) => {
            return (
                <div key={key} className='request'>
                    <div className='requestHeader'>
                        <p className='creatorName'>{value.creator_id}</p>
                        {/* <div className='chip'>{value.request_type === 'Admin' ? 'Administrative' : value.request_type}</div> */}
                    </div>
                    <p className='content'>{value.content}</p>
                    <div className='feedbackSection'>
                        <div className='responseLine'></div>
                        {/* if the facilitator already responded */}
                        {(responses.some(response => response.request_id === value.id)) ?
                        <div className='feedbackContent'>
                            <p className='creatorName'>Feedback</p>
                            <p>{responses.find(({request_id}) => request_id === value.id).content}</p>
                        </div>
                        :
                        // if if the facilitator did not respond
                        <div className='addResponseSection'>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form className='responseForm'>
                                    <div className='responseFormContent'>
                                        <label>Add feedback...</label>
                                        <Field onClick={() => setRequestId(value.id)} id='inputResponse' name='content' component='textarea'></Field>
                                        <ErrorMessage name='content' component='div' id='errorMessage' />
                                    </div>
                                    <button type='submit'>Submit Feedback</button> 
                                </Form>
                            </Formik>
                        </div>                        
                        }        
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default Facilitator