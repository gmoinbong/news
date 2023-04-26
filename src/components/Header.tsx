import React, { useEffect, useState } from "react";


import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import styles from "../styles/Header.module.scss";
import { Link, } from "react-router-dom";
interface Isize {
    width: number;
    height: number;
}
const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState<Isize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {

        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };


    return (
        <header className={styles.header}>
            <div className={styles.header__content}>
                <Link to="/" className={styles.header__content__logo}>
                    Головна
                </Link>
                <nav
                    className={`${styles.header__content__nav} ${menuOpen && size.width < 768 ? styles.isMenu : ""
                        }`}
                >
                    <ul>
                        <li>
                            <Link to="/news" onClick={menuToggleHandler}>
                                Новини
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/page-two" onClick={menuToggleHandler}>
                                PageTwo
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/about" onClick={menuToggleHandler}>
                                Про нас
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
