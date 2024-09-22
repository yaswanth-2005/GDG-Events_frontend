import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [events, setEvents] = useState({
        upcomingEvents: [],
        liveEvents: [],
        pastEvents: []
    });
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState('upcoming'); // Default filter set to upcoming
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5000/getEvents')
            .then(response => {
                setEvents(response.data);
                setFilteredEvents(response.data.upcomingEvents); // Set default view to upcoming events
            })
            .catch(error => console.error(error));
    }, []);

    const handleFilterChange = (eventType) => {
        setFilter(eventType);
        switch (eventType) {
            case 'live':
                setFilteredEvents(events.liveEvents);
                break;
            case 'upcoming':
                setFilteredEvents(events.upcomingEvents);
                break;
            case 'past':
                setFilteredEvents(events.pastEvents);
                break;
            default:
                setFilteredEvents(events.upcomingEvents); // Default case
                break;
        }
    };

    return (
        <>
            <button onClick={() => navigate('/login')} style={{ marginLeft: "45%", marginTop: "10px" }}>Admin Login</button>
            <div className="container">
                <h1 className="title">Google Developer Student Club Events</h1>

                {/* Filter Buttons */}
                <div className="button-container">
                    <button className="button" onClick={() => handleFilterChange('live')}>Live Events</button>
                    <button className="button" onClick={() => handleFilterChange('upcoming')}>Upcoming Events</button>
                    <button className="button" onClick={() => handleFilterChange('past')}>Past Events</button>
                </div>

                {/* Display Filtered Events */}
                <h2 className="subtitle">{filter.charAt(0).toUpperCase() + filter.slice(1)} Events</h2>
                {filteredEvents.length > 0 ? filteredEvents.map(event => (
                    <div key={event._id} className="event-card">
                        <h3 className="event-name">{event.eventName}</h3>
                        <p className="event-description">{event.eventDescription}</p>
                        <p className="event-date">{new Date(event.eventDate).toLocaleString()}</p>
                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="registration-link">Register Here</a>
                    </div>
                )) : <p>No events found</p>}
            </div>
        </>
    );
};

export default Home;
