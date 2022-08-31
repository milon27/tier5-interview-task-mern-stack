import useMyQuery from '../../../utils/hooks/UseMyQuery'
import LineCard from '../../layout/common/LineCard'
import Loading from '../../layout/common/Loading'
import Spacer from '../../layout/Spacer'
import MyPageWrapper from '../MyPageWrapper'
import UserList from './UserList'

export default function Home() {
    // const { data, loading } = useMyQuery<IHomeData>('track/get-album-fav-list', {} as any)

    return (
        <MyPageWrapper>
            <div className="grid grid-cols-3 gap-4">
                <LineCard >
                    Daily Active User
                    <Spacer />
                    <h1 className='text-4xl'>300</h1>
                </LineCard>
                <LineCard>
                    Weekly Active User
                    <Spacer />
                    <h1 className='text-4xl'>300</h1>
                </LineCard>
                <LineCard>
                    Monthly Active User
                    <Spacer />
                    <h1 className='text-4xl'>300</h1>
                </LineCard>
            </div>
            <Spacer px={20} />
            <p className='pl-4'>Top 15 users by usage time</p>
            <Spacer px={20} />
            <UserList userList={[]} />
        </MyPageWrapper>
    )
}
