import axios from 'axios';
import React, { useState } from 'react';
import './Admin.css'; // Import your CSS file
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [registrationLink, setRegistrationLink] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventData = {
            eventName,
            eventDescription,
            eventDate,
            registrationLink
        };

        axios.post('http://localhost:5000/addEvent', eventData)
            .then(response => {
                toast.success("Event Addedd successfully..");
                alert('Event added successfully!');
                // Clear the form
                setEventName('');
                setEventDescription('');
                setEventDate('');
                setRegistrationLink('');
            })
            .catch(error => {
                console.error('There was an error adding the event!', error);
            });
    };

    return (
        <div className="container">
            <button onClick={() => navigate('/')} className='gotoHome'>Goto Home</button>
            <h2>Admin - Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Event Description:</label>
                    <textarea
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label>Event Date and Time:</label>
                    <input
                        type="datetime-local"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Registration Link:</label>
                    <input
                        type="url"
                        value={registrationLink}
                        onChange={(e) => setRegistrationLink(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Add Event</button>
            </form>
        </div >
    );
};

export default Admin;
