import './index.css'



function Navbar() {
    return (
        <nav >
            <ul>
                <li>
                    <a href="/">O nama</a>
                </li>
                <li>
                    <a href="/informacije">Obavijesti</a>
                </li>
                <li>
                    <a href="/popis">Popis</a>
                </li>
                <li>
                    <a href="/donacije">Donacije</a>
                </li>
                <li>
                    <a href="/unos">Unos</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;


