import Logo from "./Logo";

function Header() {
    return (
        <header>
            <nav>
                <Logo />
                <ul>
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>Categories</a>
                    </li>
                    <li>
                        <a>All products</a>
                    </li>
                    <li>
                        <a>
                            <i className="icon add"></i>Add product
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
