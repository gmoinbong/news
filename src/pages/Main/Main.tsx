import React from "react";
import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpg'
import img4 from '../../images/img4.jpg'
import img5 from '../../images/img5.jpg'
import img6 from '../../images/img6.jpg'
import img7 from '../../images/img7.jpg'
import Slider, { SliderItem } from "../../components/Slider/Slider";
import style from './Main.module.scss';
import { useNoScroll } from "../../utility/useNoScroll";


const Main = () => {
    useNoScroll('/')

    return <div className={style.page}>
        <p className={style.mainInfo}>
            Welcome to our news page! We welcome you here and hope you find lots of interesting and useful information for you. Our team works hard to bring you the latest and most up-to-date news reflecting events around the world, as well as important developments in our country and region.
        </p>
        <Slider  >
            <SliderItem><img className={style.sliderImage} src={img1} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={img2} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={img3} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={img4} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={img5} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={img6} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={img7} alt='item 1' /></SliderItem>
        </Slider>
    </div>
};


export default Main;
