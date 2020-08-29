import React, { /* useState */ } from 'react';
import CSS from 'csstype';
import IconComponent from './IconComponent';


interface SquareProps {
  style: CSS.Properties;
  icons: IconComponent[];
  isEnd: boolean;
}

const Square = ({style, icons, isEnd}: SquareProps) => {

  return (
    <div className="square" style={style}>
      {icons.length > 0 ? icons : (isEnd ? <span role="img" aria-label="Cup">🏆</span> : null)}
    </div>
  );
}


export default Square;