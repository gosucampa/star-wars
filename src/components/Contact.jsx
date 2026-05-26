import {useEffect, useState} from "react";
import {baseUrl, periodMonth} from "../utils/constants.js";


const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if (planets && (Date.now() - planets.timestamp < periodMonth)) {
            return planets.payload;
        } else {
            return ['wait...']
        }
    });

    useEffect(() => {
        const getPlanets = async () => {
            const res = await fetch(`${baseUrl}/planets/`)
            const data = await res.json()
            const planets = data.result.map(item => item.name).sort();
            setPlanets(planets);
            localStorage.setItem('planets', JSON.stringify({
                payload: planets,
                timestamp: Date.now()
            }));
        }

        if (planets.length === 1) {
            getPlanets().then(() => console.log('Planets were loaded'))
        }
        return () => console.log('Contact components unmounted');
    }, [])

    return (
        <form className="clear-both flex flex-col gap-4  p-5 rounded-md " onSubmit={(e) => {
            e.preventDefault();
        }}>
            <label className="flex flex-col text-main">First Name
                <input className="w-full p-3 border border-main rounded-md mt-1.5 mb-4 bg-gray-700/60 text-main/70"
                       type="text" name="firstname" placeholder="Your name.."/>
            </label>
            <label className="flex flex-col text-main">Last Name
                <input className="p-3 border border-main rounded-md mt-1.5 mb-4 bg-gray-700/60 text-main/70"
                       type="text" name="lastname" placeholder="Your last name.."/>
            </label>
            <label className="flex flex-col text-main">Planet
                <select
                    className="p-3 border border-main rounded-md mt-1.5 mb-4 bg-gray-700/60 text-main/70 cursor-pointer"
                    name="planet">
                    <option value="" className="text-black">Choose planet...</option>
                    {planets.map(item => <option value={item} key={item}>{item}</option>)}
                </select>
            </label>

            <label className="flex flex-col text-main ">Subject
                <textarea
                    className="p-3 border border-main rounded-md mt-1.5 mb-4 bg-gray-700/60 h-32"
                    name="subject" placeholder="Write something.."
                ></textarea>
            </label>
            <button className="self-start py-3 px-10 cursor-pointer
            bg-danger text-main border border-main rounded-md text-center hover:bg-red-500 hover:text-white"
                    type="submit">Submit
            </button>
        </form>
    )
}


export default Contact;