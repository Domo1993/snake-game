import React from 'react';

// This component is the snake's body along with adding extra body from eating mice (using mapping)
export default (props) => {
  return (
    <div>
      {/* Mapping the snakes body (adding new divs each time a mouse is eaten) */}
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        }
        return (
          <div className="snake-dot" key={i} style={style}></div>
        )
      })}
    </div>
  )
}