import { createContext } from "react";
import User from "../objects/User"; 


interface Context { 
  token: string;
  user: User;
  loading: boolean;
};

export default createContext({
  userData: {
    token: "",
    user: new User(),
    loading: true,
  },
  setUserData: (userdata: Context) => {},
});