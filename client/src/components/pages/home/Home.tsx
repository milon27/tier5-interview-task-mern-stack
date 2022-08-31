import { useEffect, useState } from 'react'
import AxiosHelper from '../../../utils/AxiosHelper'
import { CountryList, DeviceList } from '../../../utils/Data'
import useMyQuery from '../../../utils/hooks/UseMyQuery'
import IResponse from '../../../utils/models/Response'
import { IUser } from '../../../utils/models/User'
import LineCard from '../../layout/common/LineCard'
import Loading from '../../layout/common/Loading'
import MyCard from '../../layout/common/MyCard'
import MySelectGender from '../../layout/common/MySelectGender'
import Button from '../../layout/form/Button'
import MySelect from '../../layout/form/MySelect'
import Spacer from '../../layout/Spacer'
import MyPageWrapper from '../MyPageWrapper'
import UserList from './UserList'

export interface IHomeData {
    countInfo: {
        "dau": number,
        "wau": number,
        "mau": number
    },
    top15Users: IUser[]
}

export default function Home() {
    const { data, setData } = useMyQuery<IResponse<IHomeData>>('users/get-info', {} as any)
    const [country, setCountry] = useState("")
    const [device, setDevice] = useState("")
    const [gender, setGender] = useState("")

    useEffect(() => {
        if (country == "" && device == "" && gender == "") {
            // console.log("no need to run");
        } else {
            doFilter()
        }
    }, [country, device, gender])

    const getTop15Again = async () => {
        setDevice("")
        setGender("")
        setCountry("")
        await AxiosHelper.getData<IUser[]>(`users/filter`, (users) => {
            console.log("here", users);
            setData(old => {
                return {
                    ...old,
                    response: {
                        ...old.response!!,
                        top15Users: users
                    }
                }
            })
        })
    }

    const doFilter = async () => {
        const queryString = `${country ? `country=${country}&` : ""}${device ? `device=${device}&` : ""}${gender ? `gender=${gender}&` : ""}`
        await AxiosHelper.getData<IUser[]>(`users/filter?${queryString}`, (users) => {
            // console.log(users);
            setData(old => {
                return {
                    ...old,
                    response: {
                        ...old.response!!,
                        top15Users: users
                    }
                }
            })
        })
    }

    return (
        <MyPageWrapper>
            <div className="grid grid-cols-3 gap-4">
                <MyCard >
                    Daily Active User
                    <Spacer />
                    <h1 className='text-4xl'>{data?.response?.countInfo?.dau}</h1>
                </MyCard>
                <MyCard>
                    Weekly Active User
                    <Spacer />
                    <h1 className='text-4xl'>{data?.response?.countInfo?.wau}</h1>
                </MyCard>
                <MyCard>
                    Monthly Active User
                    <Spacer />
                    <h1 className='text-4xl'>{data?.response?.countInfo?.mau}</h1>
                </MyCard>
            </div>
            <Spacer px={40} />
            <LineCard>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div className='flex justify-between items-center gap-2'>
                        <Button onClick={() => {
                            getTop15Again()
                        }}>Top 15 users by usage time</Button>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <MySelectGender gender={gender} onSelect={(value) => {
                            setGender(value)
                        }} />
                    </div>
                    <div className='flex justify-between  gap-2'>
                        <MySelect
                            label='Filter By Device?'
                            value={device}
                            options={DeviceList}
                            onSelect={(item) => {
                                setDevice(item.value)
                            }}
                        />
                    </div>
                    <div className='flex justify-between  gap-2'>
                        <MySelect
                            label='Filter By Country?'
                            value={country}
                            options={CountryList}
                            onSelect={(item) => {
                                setCountry(item.value)
                            }}
                        />
                    </div>
                </div>
                <Spacer px={20} />
                <UserList userList={data?.response?.top15Users || []} setData={setData} />

                <p className='text-center text-sm py-2 text-gray-400'>Note: I am always showing 15 result</p>
            </LineCard>
        </MyPageWrapper>
    )
}
