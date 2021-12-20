import React from 'react'
import { Form,Formik } from 'formik'
import * as Yup from 'yup'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../app/common/modals/modalReducer'
import { signInUser } from './authActions'

export default function LoginForm() {

    const dispatch = useDispatch()
    return (
        <div>
            <ModalWrapper size='mini' header='Sign in to Re-events'>
                <Formik
                    initialValues={{email:'',password:''}}
                    validationSchema={Yup.object({
                        email:Yup.string().required().email(),
                        password:Yup.string().required()
                    })}
                    onSubmit={(values,{setSubmitting})=>{
                        dispatch(signInUser(values));
                        setSubmitting(false);
                        dispatch(closeModal());
                    }}
                >
                        {({isSubmitting,dirty,isValid})=>(
                            <Form className='ui form'>
                                <MyTextInput name='email' placeholder='Email Address '/>
                                <MyTextInput name='password' placeholder='Password' type='password'/>
                                <Button 
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type='submit'
                                fluid
                                size='large'
                                color='teal'
                                content='Login'
                                />
                            </Form>
                        )}
                </Formik>
            </ModalWrapper>
        </div>
    )
}


