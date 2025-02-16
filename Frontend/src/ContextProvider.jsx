import { createContext, useState } from "react";

export const DataContext=createContext();

export const ContextProvider=({children})=>{
    const [verifyEmail,setVerifyEmail]=useState("")
    return(
        <DataContext.Provider value={{verifyEmail,setVerifyEmail}}>
            {children}
        </DataContext.Provider>
    )
}

