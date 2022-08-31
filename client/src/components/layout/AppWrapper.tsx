import { PropsWithChildren, useContext, useEffect } from 'react'
import { StateContext } from '../../utils/context/MainContext';
import useMyQuery from '../../utils/hooks/UseMyQuery';
import IResponse from '../../utils/models/Response';
import IAdmin from '../../utils/models/Admin';
import MyLoadingSreen from './MyLoadingSreen';

export default function AppWrapper(props: PropsWithChildren<any>) {
    const { admin, setAdmin } = useContext(StateContext);
    const { loading, error, data } = useMyQuery<IResponse<IAdmin | undefined>>('auth/user', {} as IResponse<undefined>)

    useEffect(() => {
        //console.log("AppWrapper->", data.response)
        setAdmin(data.data)
    }, [data])

    // error
    if (error) {
        return <>{
            props.children
        }</>
    }
    // loading
    if (admin === undefined || loading === true) {
        return (<MyLoadingSreen />);
    }
    //done
    return <>{
        props.children
    }</>
}

