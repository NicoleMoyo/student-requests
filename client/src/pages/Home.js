import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { useParams } from 'react-router-dom';

function Home() {

    // let { requestid } = useParams();

    const [requests, setRequests] = useState();
    const [responses, setResponses] = useState();
    const [requestId, setRequestId] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001/requests').then((response) => {
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
        // console.log(data.content);
        // console.log(requestId);
        const sendData = {
            creator_id: 'kingcs',
            // request_type: 'Academic',
            content: data.content,
            // assigned_id: 'sonenidube'
        }
        // HEEREEEE
        axios.post(`http://localhost:3001/requests/${requestId}`, sendData).then((response) => {
            console.log(response.data);
            console.log('It worked!');
        });
    }

    return (
        <div>
            <div className='nav'>
            <p className='navTitle'>CS Team Lead</p>
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
                        <div className='chip'>{value.request_type === 'Admin' ? 'Administrative' : value.request_type}</div>
                    </div>
                    <p className='content'>{value.content}</p>
                    <div className='feedbackSection'>
                        <div className='responseLine'></div>
                        { value.request_type !== 'Admin' || responses.length === 0 ? 
                        // if there are no responses and the request is not administrative
                        <p className='contentLoading'>Feedback pending...</p> : 
                        // if there is a response related to the admin request
                        (responses.some(response => response.request_id === value.id)) ?
                        <div className='feedbackContent'>
                            <p className='creatorName'>Comment</p>
                            <p>{responses.find(({request_id}) => request_id === value.id).content}</p>
                        </div>
                         :
                        // if there are no responses related to a admin request
                        <div className='addResponseSection'>
                            <div>{responses.length}, {responses[0].request_id}, {key}</div>
                            {/* {console.log(responses[0])} */}
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form className='responseForm'>
                                    <div className='responseFormContent'>
                                        <label>Add comment...</label>
                                        <Field onClick={() => setRequestId(value.id)} id='inputResponse' name='content' component='textarea'></Field>
                                        <ErrorMessage name='content' component='div' id='errorMessage' />
                                    </div>
                                    <button type='submit'>Comment</button> 
                                </Form>
                            </Formik>
                        </div>                        
                        }
                        {/* <p className='contentLoading'>Feedback pending...</p> */}
                        {/* <div className='addResponseSection'>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form className='responseForm'>
                                    <div className='responseFormContent'>
                                        <label>Add comment...</label>
                                        <Field id='inputResponse' name='content' component='textarea'></Field>
                                        <ErrorMessage name='content' component='div' id='errorMessage' />
                                    </div>
                                    <button type='submit'>Comment</button> 
                                </Form>
                            </Formik>
                        </div> */}
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default Home