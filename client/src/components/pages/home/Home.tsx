import { CountryList, DeviceList } from '../../../utils/Data'
import useMyQuery from '../../../utils/hooks/UseMyQuery'
import IResponse from '../../../utils/models/Response'
import { IUser } from '../../../utils/models/User'
import LineCard from '../../layout/common/LineCard'
import Loading from '../../layout/common/Loading'
import MySelect from '../../layout/form/MySelect'
import Spacer from '../../layout/Spacer'
import MyPageWrapper from '../MyPageWrapper'
import UserList from './UserList'

interface IHomeData {
    countInfo: {
        "dau": number,
        "wau": number,
        "mau": number
    },
    top15Users: IUser[]
}

export default function Home() {
    const { data, loading } = useMyQuery<IResponse<IHomeData>>('users/get-info', {} as any)
    console.log(data);

    return (
        <MyPageWrapper>
            <div className="grid grid-cols-3 gap-4">
                <LineCard >
                    Daily Active User
                    <Spacer />
                    <h1 className='text-4xl'>{data?.response?.countInfo?.dau}</h1>
                </LineCard>
                <LineCard>
                    Weekly Active User
                    <Spacer />
                    <h1 className='text-4xl'>{data?.response?.countInfo?.wau}</h1>
                </LineCard>
                <LineCard>
                    Monthly Active User
                    <Spacer />
                    <h1 className='text-4xl'>{data?.response?.countInfo?.mau}</h1>
                </LineCard>
            </div>
            <Spacer px={20} />
            <div className='flex justify-between items-center gap-4'>
                <p className='pl-4 font-semibold'>Top 15 users by usage time</p>
                <div className='flex justify-between  gap-2'>
                    <p className='pl-4 font-semibold'>Filter</p>
                    <MySelect
                        label='By Gender?'
                        value=''
                        options={[
                            {
                                id: "1",
                                title: "MALE",
                                value: "MALE"
                            },
                            {
                                id: "2",
                                title: "FEMALE",
                                value: "FEMALE"
                            },
                            {
                                id: "3",
                                title: "OTHER",
                                value: "OTHER"
                            }
                        ]}
                        onSelect={(item) => {

                        }}
                    />
                </div>
                <div className='flex justify-between  gap-2'>
                    <p className='pl-4 font-semibold'>Filter</p>
                    <MySelect
                        label='By Device?'
                        value=''
                        options={DeviceList}
                        onSelect={(item) => {

                        }}
                    />
                </div>
                <div className='flex justify-between  gap-2'>
                    <p className='pl-4 font-semibold'>Filter</p>
                    <MySelect
                        label='By Country?'
                        value={""}
                        options={CountryList}
                        onSelect={(item) => {

                        }}
                    />
                </div>

            </div>
            <Spacer px={20} />
            <UserList userList={data?.response?.top15Users || []} />
        </MyPageWrapper>
    )
}
