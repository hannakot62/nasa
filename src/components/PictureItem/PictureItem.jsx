import style from './PictureItem.module.css'

export default function PictureItem({object}) {
    console.log(object)
    return (
        <div style={{backgroundImage: `url(${object.url})`}} className={style.container}>
            <h3>{object.title}</h3>
            <h5>{object.date}</h5>
        </div>
    )
}