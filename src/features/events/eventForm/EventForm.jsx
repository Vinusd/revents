import React ,{useState} from 'react'
import {Segment,Header,Button,Confirm} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listenToSelectedEvent } from '../eventActions';
import { Formik , Form} from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput'
import MyDateInput from '../../../app/common/form/MyDateInput'
import {categoryData} from '../../../app/api/categoryOptions.js'
import { listenToEventFromFirestore,updateEventInFirestore,addEventToFirestore,cancelEventToggle} from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {toast} from 'react-toastify'

export default function EventForm({match,history}) {
    const dispatch = useDispatch();
    const [loadingCancel,setLoadingCancel]=useState(false);
    const [confirmOpen,setConfirmOpen]=useState(false);
    const {selectedEvent} = useSelector(state=>state.event);
    const {loading,error} = useSelector(state=>state.async);

const initialValues = selectedEvent ?? {
    title:'',
    category:'',
    description:'',
    city:'',
    venue:'',
    date:''
};

const validationSchema = Yup.object({
    title:Yup.string().required('You must provide a title'),
    category:Yup.string().required('You must provide a category'),
    description:Yup.string().required(),
    city:Yup.string().required('City is required'),
    venue:Yup.string().required('Venue is required'),
    date:Yup.string().required()
})


async function handleCancelToggle(event){
    setConfirmOpen(false);
    setLoadingCancel(true);
    try{
        await cancelEventToggle(event)
        setLoadingCancel(false)
    }catch(error){
        setLoadingCancel(true);
        toast.error(error.message)
    }
}

useFirestoreDoc({
    shouldExecute : !!match.params.id,
    query:()=>listenToEventFromFirestore(match.params.id),
    data:(event)=>dispatch(listenToSelectedEvent(event)),
    deps:[match.params.id, dispatch]
})

if (loading ) return <LoadingComponent content='Loading event...'/>

if (error) return <Redirect to='/error'/>

    return (
        <Segment clearing>
            
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values,{setSubmitting})=>{
                    try{
                        selectedEvent 
                    ? await updateEventInFirestore(values)
                    : await  addEventToFirestore(values);
                    setSubmitting(false);
                    history.push('/events'); 
                    }catch(error){
                        toast.error(error.message);
                        setSubmitting(false);
                    }   
                }}
            >
               {({isSubmitting,dirty,isValid})=>(
                    <Form className='ui form' >
                    <Header sub color='teal' content='Event Detail'/>
                      <MyTextInput name='title' placeholder='Event title' />
                      <MySelectInput 
                      name='category' 
                      placeholder='Event category'
                      options={categoryData} />
                      <MyTextArea 
                      name='description' 
                      placeholder='Description' 
                      rows={3} />
                    <Header sub color='teal' content='Event Location Detail'/>
                      <MyTextInput name='city' placeholder='City' />
                      <MyTextInput name='venue' placeholder='Venue' />
                      <MyDateInput
                      name='date' 
                      placeholderText='Event date' 
                      timeFormat='HH:mm'
                      showTimeSelect
                      timeCaption='time'
                      dateFormat='MMMM d,yyyy h:mm a'/>

                      {selectedEvent &&
                      <Button 
                      loading={loadingCancel}
                      type='button' 
                      floated='left' 
                      color={selectedEvent.isCancelled ? 'green' : 'red'}
                      content={selectedEvent.isCancelled ?'Reactivate Event':'Cancel Event'}
                      onClick={()=>setConfirmOpen(true)}/>}
                      <Button 
                      loading={isSubmitting}
                      disabled={!isValid || !dirty || isSubmitting} 
                      type='submit' 
                      floated='right' 
                      positive 
                      content='Submit'/>
                      <Button 
                      disabled={isSubmitting}
                      as={Link} 
                      to='/events' 
                      type='submit' 
                      floated='right'  
                      content='Cancel'/>
                  </Form>
                )
               }
            </Formik>
            <Confirm
                content={selectedEvent?.isCancelled ? 'This will reactivate the event-Are you sure?' :'This will cancel the event-Are you sure?'}
                open={confirmOpen}
                onCancel={()=>setConfirmOpen(false)}
                onConfirm={()=>handleCancelToggle(selectedEvent)}
            />
        </Segment>
    )
}


