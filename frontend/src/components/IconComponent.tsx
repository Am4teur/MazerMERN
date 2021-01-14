import React, {  } from 'react';
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
  /*const [some, setsome] = useState<string>('blue-simple-icon');*/
  const icon: {[name:string] : any} = {"blue-simple-icon": iconBlue, "red-simple-icon": iconRed, "green-simple-icon": iconGreen};
  
  const iconComponentStyle = {
    width: size === 32 ? "32px" : "16px",
    height: size === 32 ? "32px" : "16px",
  }

  /*const toggleHover = () => {
    setsome("red-simple-icon");
  }*/

  return (
    <div style={{marginLeft: "1px"}}>
      <img className="icon" src={icon[iconName]} alt="icon" style={iconComponentStyle}/>
      {/*<img className="icon" src={icon[iconName]} alt="icon" onMouseEnter={toggleHover} style={iconComponentStyle}/>*/}
    </div>
  )
}

export default IconComponent;