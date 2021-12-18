import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage.jsx';
import Navbar from '../../features/nav/Navbar';

function App() {
  // const [formOpen,setFormOpen]=useState(false);
  // const [selectedEvent,setSelectedEvent]=useState(null);

//   function handleSelectEvent(event){
//     setSelectedEvent(event);
//     setFormOpen(true);
//  }
 
//  function handleCreateFormOpen(){
//    setSelectedEvent(null);
//    setFormOpen(true);
//  }


  return (
    <div >
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'} render={()=>(
        <div>
            <Navbar />
            <Container className='main'>
                
                <Route exact path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetailedPage} />
                <Route path="{[/createEvent,/manage/:id]}" component={EventForm} />
            </Container>
        </div>
       )}
      />
      {/* 
        <EventDashboard 
        formOpen={formOpen} 
        setFormOpen={setFormOpen} 
        selectEvent={handleSelectEvent}
        selectedEvent={selectedEvent}/>
       */}
    </div>
  );
}

export default App;
