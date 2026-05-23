import {useEffect, useState} from "react";
import {baseUrl, periodMonth} from "../utils/constants.js";
import './Contact.css';


const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if(planets && (Date.now() - planets.timestamp < periodMonth)){
            return planets.payload;
        }
    })

    useEffect(() => {
        if(planets && planets.length > 0) return;

        fetch(`${baseUrl}/v1/planets`)
            .then(response => response.json())
            .then(data => {
                const planetsList = data.map(planet => planet.name).sort();
                setPlanets(planetsList);
                localStorage.setItem('planets', JSON.stringify({
                    payload: planetsList,
                    timestamp: Date.now()
                }))
            })
            .catch(err => console.log("Error fetching planets:", err));
    }, []);

    return (
        <>
            {!!planets && planets.length > 0 && (
                <div className="container">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Form submitted!");
                    }}>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" id="fname" name="firstname" placeholder="Your name.." />

                        <label htmlFor="lname">Last Name</label>
                        <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

                        <label htmlFor="planet">Planet</label>
                        <select id="planet" name="planet" className="btn-danger">
                            <option value="">Choose planet...</option>
                            {planets.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>

                        <label htmlFor="subject">Subject</label>
                        <textarea
                            id="subject"
                            name="subject"
                            placeholder="Write something.."
                            style={{ height: '200px' }}
                        ></textarea>

                        <input className="btn-danger" type="submit" value="Submit" />
                    </form>
                </div>
            )}
        </>
    );
};

export default Contact;