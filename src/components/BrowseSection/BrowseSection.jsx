import style from './BrowseSection.module.css'
import dayjs from "dayjs";
import { DatePicker } from 'antd';
import {useCallback, useState} from "react";
import PictureItemsList from "../PictureItemsList/PictureItemsList";
const { RangePicker } = DatePicker;


export default function BrowseSection() {
    const dateFormat = 'YYYY/MM/DD';
    const [dates, setDates] = useState(null);
    const [value, setValue] = useState(null);
    const [objects, setObjects] = useState(null)

    const disabledDate = (current) => {
        if (!dates) {
            return false;
        }
        if (current > dayjs()) return true
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 10;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 10;
        return !!tooEarly || !!tooLate;
    };


    const onOpenChange = (open) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    const handleBrowse = useCallback(
        () => {
            if (!value) return

            const start = dayjs(value[0]).format("YYYY-MM-DD")
            const end = dayjs(value[1]).format("YYYY-MM-DD")

            fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&start_date=${start}&end_date=${end}`)
                .then(response => response.json())
                .then(json => {
                    setObjects(json)
                }).catch(err => console.log(err))
        },
        [value]
    );


    return (
        <>
            <section className={style.wrapper}>
                <h1>Browse Astronomy Pictures of Any Day!</h1>
                <RangePicker
                    format={dateFormat}
                    value={dates || value}
                    disabledDate={disabledDate}
                    onCalendarChange={(val) => {
                        setDates(val);
                    }}
                    onChange={(val) => {
                        setValue(val);
                    }}
                    onOpenChange={onOpenChange}
                    changeOnBlur
                />
                <button onClick={() => handleBrowse()}>browse!</button>
            </section>
            <PictureItemsList objects={objects}/>
        </>
    )
}