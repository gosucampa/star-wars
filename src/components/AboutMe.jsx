import {useEffect, useState} from "react";
import {baseUrl, periodMonth} from "../utils/constants.js";

const AboutMe = () => {
    const [hero, setHero] = useState( () => {
        const hero = JSON.parse(localStorage.getItem('hero'));
        if(hero && Date.now() - hero.timestamp < periodMonth) {
            return hero.payload;
        }
    });

    useEffect(() => {
        fetch(`${baseUrl}/v1/people/1`)
            .then(response => response.json())
            .then(data => {
                const info = {
                    name: data.name,
                    gender: data.gender,
                    brith_year: data.brith_year,
                    height: data.height,
                    mass: data.mass,
                    hair_color: data.hair_color,
                    skin_color: data.skin_color,
                    eye_color: data.eye_color
                }
                setHero(info)
                localStorage.setItem('hero', JSON.stringify( {
                    payload: info,
                    timestamp: Date.now()
                }))
            })
    }, []);

    return (
        <>
            {(!!hero) &&
                <div className='fs-2 lh-lg text-justify ms-5'>
                    <p><span className='display-3'>name:</span> {hero.name}</p>
                    <p><span className='display-3'>gender:</span> {hero.gender}</p>
                    <p><span className='display-3'>brith year:</span> {hero.brith_year}</p>
                    <p><span className='display-3'>height:</span> {hero.height}</p>
                    <p><span className='display-3'>mass:</span> {hero.mass}</p>
                    <p><span className='display-3'>hair color:</span> {hero.hair_color}</p>
                    <p><span className='display-3'>skin color:</span> {hero.skin_color}</p>
                    <p><span className='display-3'>eye color</span> {hero.eye_color}</p>
                </div>
            }
        </>
    )

};

export default AboutMe;