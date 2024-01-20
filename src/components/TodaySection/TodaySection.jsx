import dayjs from "dayjs";
import {useEffect, useState} from "react";
import style from './TodaySection.module.css'

export default function TodaySection() {
    const [pictureSrc, setPictureSrc] = useState('/temp.webp');
    // useEffect(() => {
    //     fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`)
    //         .then(response => response.json())
    //         .then(json => {
    //         console.log(json)
    //         setPictureSrc(json.hdurl)
    //     })
    // }, []);


    return (
        <section style={{backgroundImage: `url(${pictureSrc})`}} className={style.wrapper}>
            <h1>Astronomy Picture of the Day <br/>
                <span>[{dayjs().format('DD/MM/YYYY')}]</span>
            </h1>
        </section>
    )
}