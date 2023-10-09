import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Student() {
    const [requests, setRequests] = useState();
    const [responses, setResponses] = useState();
    const [requestId, setRequestId] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001/requests/student/randyhirwa').then((response) => {
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
            <p className='navTitle'>Student</p>
            <div className='secondaryButton'>
            Log Out
            </div>
        </div>
        <p className='pageTitle'>Submit Request</p>
            <div className='requests'>
                <div className='addResponseSection'>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form className='responseForm'>
                            <div className='responseFormContent'>
                                <label>Add new request...</label>
                                <Field id='inputResponse' name='content' component='textarea'></Field>
                                <ErrorMessage name='content' component='div' id='errorMessage' />
                                <label>Type of request</label>
                            </div>
                            <button type='submit'>Submit</button> 
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