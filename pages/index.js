import {useState} from 'react';
import Link from 'next/link';

function Header({title}) {
    return <h1>{title ? title : 'Default Title'}</h1>;
}

export default function HomePage() {
    const names = ['Charles Dickens', 'Eleanor Rigby', 'Kimberle Crenshaw'];
    const [likes, setLikes] = useState(0);

    function handleClick() {
        setLikes(likes + 1);
    }

    return(
        <div>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul>
                {names.map((name) => (<li key={name}>{name}</li>))}
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>
            <h2><Link href="/main-campus/map">View Map</Link></h2>
            </div>
    );
}