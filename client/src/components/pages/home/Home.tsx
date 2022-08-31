import useMyQuery from '../../../utils/hooks/UseMyQuery'
import LineCard from '../../layout/common/LineCard'
import Loading from '../../layout/common/Loading'
import Spacer from '../../layout/Spacer'
import MyPageWrapper from '../MyPageWrapper'

export default function Home() {
    // const { data, loading } = useMyQuery<IHomeData>('track/get-album-fav-list', {} as any)

    return (
        <MyPageWrapper>
            home page...
        </MyPageWrapper>
    )
}
