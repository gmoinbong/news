import React from "react";
import max from '../assets/images/max.jpg'
import Slider, { SliderItem } from "../components/Slider/Slider";
import style from '../styles/Main.module.scss';
const Main = () => {
    return <>
        <p className={style.mainInfo}>
            Добро пожаловать на нашу страницу новостей! Мы рады приветствовать вас здесь и надеемся, что вы найдете много интересного и полезного для себя. Наша команда усердно работает над тем, чтобы предоставлять вам самые свежие и актуальные новости, отражающие события в мире, а также важные события, происходящие у нас в стране и регионе.
        </p>
        <Slider  >
            <SliderItem><img className={style.sliderImage} src={max} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={max} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={max} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={max} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={max} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={max} alt='item 1' /></SliderItem>
            <SliderItem><img className={style.sliderImage} src={max} alt='item 1' /></SliderItem>
        </Slider>
    </>
};


export default Main;
