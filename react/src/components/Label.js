import React from 'react';

const Label = ({ color, text }) => {
  return (
    <div className={"inv-label " + color} >
      <p>{text}</p>
    </div>
  )
}

export default Label;
