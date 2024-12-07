import { createContext, useEffect, useState } from "react";

export const AuthContext  = createContext();


export const AuthContextProvider = ({children})=>{
    const [currUser,setCurrUser] = useState(



localStorage.getItem("email") || null
);

const updateUser = (data)=>{

    setCurrUser(data);
}

useEffect(()=>{
    localStorage.setItem("user" ,currUser )
})
return(
    <AuthContext.Provider value={{currUser,updateUser}}>


        {children}
    </AuthContext.Provider>
)

}