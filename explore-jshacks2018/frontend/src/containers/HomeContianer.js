import React, { Component } from 'react';
import { EventsService } from "../data/Events";
import { UsersService } from "../data/Users";
import { AttendeesService } from "../data/Attendees";
import Event from "../components/Event";
import Search from "../components/Search";
import { Http } from "../data/Http";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    _renderEvent(event) {
        return <Event key={event.id} event={event}/>
    }

    async _onSearch(state) {
        console.log('MINE: ', state);
        const http = new Http();
        const data = await http.get('user/get_recommended_events', state);
        console.log(data);
    }

    async componentDidMount() {
        const eventsService = new EventsService();
        const usersService = new UsersService();
        const attendeesService = new AttendeesService();

        await eventsService.loadEvents();
        await usersService.loadUsers();
        await attendeesService.loadAttendees();

        console.log(eventsService.events);
        console.log(usersService.users);
        console.log(attendeesService.attendees);

        this.setState({ events: eventsService.getEventsFormatted().slice(0, 10) });
    }

    render() {
        const events = this.state.events.map(this._renderEvent.bind(this));

        return (
            <div className="HomeContainer">
                <Search onSearch={this._onSearch.bind(this)}/>
                {events}
            </div>
        );
    }
}

export default HomeContainer;
