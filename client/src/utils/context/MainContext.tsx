import React, { createContext, useState } from 'react'
import IAdmin from '../models/Admin'

interface iState {
    admin?: IAdmin | null
    setAdmin: React.Dispatch<React.SetStateAction<IAdmin | undefined | null>>
}

export const StateContext = createContext<iState>({} as iState)

const MainContext = (props: React.PropsWithChildren<any>) => {
    const [admin, setAdmin] = useState<IAdmin | undefined | null>(undefined) //undefined means loading | null means not logged in


    const global_state: iState = {
        admin, setAdmin
    }

    return (
        <StateContext.Provider value={global_state}>
            {props.children}
        </StateContext.Provider>
    )
}

export default MainContext
