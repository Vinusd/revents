import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage.jsx';
import Navbar from '../../features/nav/Navbar';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import {ToastContainer} from 'react-toastify'
import ErrorComponent from '../common/errors/ErrorComponent';

function App() {

  const {key} = useLocation();

  return (
    <div >
      <ModalManager/>
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar/>
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'} render={()=>(
        <div>
            <Navbar />
            <Container className='main'>
                
                <Route exact path="/events" component={EventDashboard} />
                <Route exact path="/sandbox" component={Sandbox} />
                <Route path="/events/:id" component={EventDetailedPage} />
                <Route path={['/createEvent', '/manage/:id']}component={EventForm} key={key} />
                <Route path='/error' component={ErrorComponent} />
            </Container>
        </div>
       )}
      />
    </div>
  );
}

export default App;
