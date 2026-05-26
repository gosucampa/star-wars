import {useEffect, useState} from "react";
import {baseUrl, periodMonth} from "../utils/constants.js";

const AboutMe = () => {
    const [hero, setHero] = useState(() => {
        const hero = JSON.parse(localStorage.getItem('hero'));
        if (hero && Date.now() - hero.timestamp < periodMonth) {
            return hero.payload;
        }

    });

    useEffect(() => {
            fetch(`${baseUrl}/people/1/`)
                .then(response => response.json())
                .then(data => {
                    const info = {
                        name: data.name,
                        gender: data.gender,
                        birth_year: data.birth_year,
                        height: data.height,
                        mass: data.mass,
                        hair_color: data.hair_color,
                        skin_color: data.skin_color,
                        eye_color: data.eye_color
                    }
                    setHero(info)
                    localStorage.setItem('hero', JSON.stringify({
                        payload: info,
                        timestamp: Date.now()
                    }))
                })
                .catch(err => console.error("Error while requesting:", err));

    }, []);

    const formatKey = (key) => key.replace(/_/g, ' ');

    return (
        <>
            {(!!hero) &&
                <div className="clear-both pt-10 text-3xl leading-loose text-justify ml-12 text-main font-poller">
                    {Object.keys(hero).map(key => (
                        <p key={key}>
                            <span className="text-main/70 capitalize">{formatKey(key)}: </span>
                            {hero[key]}
                        </p>
                    ))}
                </div>
            }
        </>
    )

};

export default AboutMe;