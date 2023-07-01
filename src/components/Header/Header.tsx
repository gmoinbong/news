import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";


import { BiMenuAltRight, BiNews } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri"

import styles from "./Header.module.scss";

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
                    Main
                </Link>
                <nav
                    className={`${styles.header__content__nav} ${menuOpen && size.width < 768 ? styles.isMenu : ""
                        }`}
                >
                    <ul className={styles.page}>
                        <li >
                            <Link to="/news" onClick={menuToggleHandler} className={styles.info}>
                                <BiNews className={styles.icon} /> News
                            </Link>
                        </li>
                        <li >
                            <Link to="/about" onClick={menuToggleHandler} className={styles.info}>
                                <RiTeamLine className={styles.icon} />  About us
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
