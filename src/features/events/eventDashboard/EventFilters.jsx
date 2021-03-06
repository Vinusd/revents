import React from 'react'
import { Menu ,Header } from 'semantic-ui-react'
import Calender from 'react-calendar'
import {useSelector} from 'react-redux'

export default function EventFilters({predicate,setPredicate,loading}) {

    const {authenticated} = useSelector(state=>state.auth)
    return (
        <div>
            {authenticated && 
            <Menu vertical size='large' style={{width:'100%'}}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item 
                    content='All Events'
                    active={predicate.get('filter') === 'all'}
                    onClick={()=>setPredicate('filter','all')}
                    disabled={loading}
                />
                <Menu.Item  
                    content="I'm going" 
                    active={predicate.get('filter') === 'isGoing'}
                    onClick={()=>setPredicate('filter','isGoing')}
                    disabled={loading}
                />
                <Menu.Item 
                    content="I'm hosting" 
                    active={predicate.get('filter') === 'isHost'}
                    onClick={()=>setPredicate('filter','isHost')}
                    disabled={loading}
                />
            </Menu>
        }
            <Header icon='calendar' attached color='teal' content='Select Date'/>
            <Calender
                onChange={date => setPredicate('startDate',date)}
                value={predicate.get('startDate') || new Date()}
                titleDisabled={()=>loading}
            />
        </div>
    )
}


