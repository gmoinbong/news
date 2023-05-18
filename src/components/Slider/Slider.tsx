import React, { useEffect, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useSwipeable } from "react-swipeable";

import "./Slider.scss";
type Props = {
  children: React.ReactNode
  width?: number | string
}

export const SliderItem = ({ children, width }: Props) => {
  return (
    <div className="slider-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Slider = ({ children }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child: any, index) => {
          if (child) {
            return React.cloneElement(child, ({ width: "100%" }));
          }
        })}
      </div>
      <div className="indicators">
        <button
          className='button'
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <AiOutlineDoubleLeft />
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "button active" : "button"}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button className='button'
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <AiOutlineDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
