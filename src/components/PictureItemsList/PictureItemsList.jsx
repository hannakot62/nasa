import style from './PictureItemsList.module.css'
import PictureItem from "../PictureItem/PictureItem";

export default function PictureItemsList({objects}) {
    if (!objects) return <></>
    const items = objects.map(o => <PictureItem object={o}/>)
    return (
        <div className={style.wrapper}>{items}</div>
    )
}