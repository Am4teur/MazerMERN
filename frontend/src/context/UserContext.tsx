import { createContext } from "react";
import User from "../objects/User"; 


interface Context { 
  token: string;
  user: User
};

export default createContext({
  userData: {
    token: "",
    user: new User("", "", 0, 0)
  },
  setUserData: (userdata: Context) => {},
});