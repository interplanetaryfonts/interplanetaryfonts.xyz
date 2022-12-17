import { useState } from "react";
import classes from "../../styles/CardHeader.module.css";

export default function CardHeaderButton(props) {
  // States
  const [hover, setHover] = useState(false);
  // Event handlers
  const handleHover = () => {
      if (!props.active) setHover(true);
    },
    handleOut = () => {
      setHover(false);
    },
    handleClick = (e) => {
      const pressed = e.target.textContent;
      props.handleSubprofile(pressed);
      props.handleActiveButtons(pressed);
    };
  // Component
  return (
    <button
      className={`${classes.button} ${
        !hover ? classes[props.color.normal] : classes[props.color.hover]
      } ${props.active && classes[props.color.active]} ${props.className}`}
      onMouseOver={handleHover}
      onMouseOut={handleOut}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
