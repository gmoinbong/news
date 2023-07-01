import { useNoScroll } from '../../../utility/useNoScroll';
import style from './AboutPage.module.scss';

const AboutPage = () => {
    useNoScroll('/about')
    return (
        <main className={style.page}>
            <section className={style.topSection}>
                <h1 className={style.title}>Welcome to Our News Page!</h1>
                <p className={style.description}>
                    We welcome you here and hope you find lots of interesting and useful information for you. Our team works hard to bring you the latest and most up-to-date news reflecting events around the world, as well as important developments in our country and region.
                </p>
            </section>
            <section className={style.bottomSection}>
                <div className={style.contactSection}>
                    <h2>Contact Us</h2>
                    <p>Email: example@example.com</p>
                    <p>Phone: +1234567890</p>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
