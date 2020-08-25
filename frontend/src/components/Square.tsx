import React, { /* useState */ } from 'react';
import CSS from 'csstype';
import IconComponent from './IconComponent';


interface SquareProps {
  style: CSS.Properties;
  icons: IconComponent[];
}

const Square = ({style, icons}: SquareProps) => {

  return (
    <div className="square" style={style}>
      {icons.length > 0 ? icons : null}
    </div>
  );
}


export default Square;