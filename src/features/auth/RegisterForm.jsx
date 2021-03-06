import React from 'react'
import { Form,Formik } from 'formik'
import * as Yup from 'yup'
import ModalWrapper from '../../app/common/modals/ModalWrapper'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button,Label,Divider } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../app/common/modals/modalReducer'
import { registerInFirebase } from '../../app/firestore/firebaseService'
import SocialLogin from './SocialLogin'

export default function RegisterForm() {

    const dispatch = useDispatch()
    return (
        <div>
            <ModalWrapper size='mini' header='Register to Re-events'>
                <Formik
                    initialValues={{displayName:'',email:'',password:''}}
                    validationSchema={Yup.object({
                        displayName:Yup.string().required(),
                        email:Yup.string().required().email(),
                        password:Yup.string().required()
                    })}
                    onSubmit={async(values,{setSubmitting,setErrors})=>{
                        try{
                            await registerInFirebase(values);
                            setSubmitting(false);
                            dispatch(closeModal());
                        } catch (error){
                            setErrors({auth:error.message})
                            setSubmitting(false);
                            
                        }
                        
                    }}
                >
                        {({isSubmitting,dirty,isValid,errors})=>(
                            <Form className='ui form'>
                                <MyTextInput name='displayName' placeholder='Diaplay Name '/>
                                <MyTextInput name='email' placeholder='Email Address '/>
                                <MyTextInput name='password' placeholder='Password' type='password'/>
                                {errors.auth && <Label basic color='red' style={{marginBottom:10}} content={errors.auth}/>}
                                <Button 
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type='submit'
                                fluid
                                size='large'
                                color='teal'
                                content='Register'
                                />
                                <Divider horizontal>Or</Divider>
                                <SocialLogin/>
                            </Form>
                        )}
                </Formik>
            </ModalWrapper>
        </div>
    )
}


