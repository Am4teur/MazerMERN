import React, { /*useState*/ } from 'react';
import CSS from 'csstype';
import iconBlue from '../imgs/icons/icon-blue.png';
import iconRed from '../imgs/icons/icon-red.png';
import iconGreen from '../imgs/icons/icon-green.png';


interface IconComponent {
  style: CSS.Properties;
}

interface IconComponentProps {
  size: number;
  iconName: string;
}


const IconComponent = ({size, iconName}: IconComponentProps) => {
  /* const [id, setId] = useState<string>(''); */
  const icon:  {[name:string] : any} = {"blue-simple-icon": iconBlue, "red-simple-icon": iconRed, "green-simple-icon": iconGreen};
  
  const iconComponentStyle = {
    width: size === 32 ? "32px" : "16px",
    height: size === 32 ? "32px" : "16px",
  }

  return (
    <div className="m-1">
      <img className="icon" src={icon[iconName]} alt="icon" style={iconComponentStyle}/>
    </div>
  )
}

export default IconComponent;