import React from "react";
import max from '../assets/images/max.jpg'
import Slider, { SliderItem } from "../components/Slider/Slider";
import style from '../styles/Main.module.scss';
const Main = () => {
    return <>
        <p className={style.mainInfo}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eos laborum eveniet? Sequi atque voluptatum quibusdam illum cumque saepe quos exercitationem aut, nihil laborum, distinctio minima laboriosam amet, ipsam rerum.

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
