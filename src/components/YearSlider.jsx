import "./YearSlider.css";
import { useRef, useCallback, useEffect } from "react";
import classnames from "classnames";

export const YearSlider = ({
  yearMin,
  yearMax,
  setMinVal,
  setMaxVal,
  minVal,
  maxVal,
}) => {
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => {
      return Math.round(((value - yearMin) / (yearMax - yearMin)) * 100);
    },
    [yearMin, yearMax]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className="container">
        <input
          type="range"
          min={yearMin}
          max={yearMax}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > yearMax - 100,
          })}
        ></input>
        <input
          type="range"
          min={yearMin}
          max={yearMax}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        ></input>
      <div className="slider">
        <div className="slider__track" />
      <div ref={range} className="slider__range" />
      <div className="slider__left-value">{minVal}</div>
      <div className="slider__right-value">{maxVal}</div>
        
      </div>
    </div>
  );
};
