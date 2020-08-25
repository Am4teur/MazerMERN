import React, { /*useState*/ } from 'react';
import CSS from 'csstype';
import icon1 from '../imgs/icons/pixel-icon-1.png';


interface IconComponent {
  style: CSS.Properties;
}

interface IconComponentProps {
  order: number;
  size: number;
}


const IconComponent = ({order, size}: IconComponentProps) => {
  /* const [id, setId] = useState<string>(''); */
  
  const iconComponentStyle = {
    width: size === 32 ? "32px" : "16px",
    height: size === 32 ? "32px" : "16px",
    order: order,
  }

  return (
    <img className="icon" src={icon1} alt="icon" style={iconComponentStyle}/>
  )
}

export default IconComponent;