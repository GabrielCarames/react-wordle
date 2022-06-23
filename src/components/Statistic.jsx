export default function Statistic({number, text, index}) {
    return (
        <li className="statistics__item" key={index}>
            <p className="statistics__number">{number}</p>
            <p className="statistics__text">{text}</p>
        </li>
    )
}