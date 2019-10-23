import React from 'react';
import mouse from '../Images/realMouse.png';

// This component has the food (mouse image) along with its positioning
export default (props) => {

  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  }

  return (
    <img src={mouse} className="snake-food" style={style}/>
  )
}