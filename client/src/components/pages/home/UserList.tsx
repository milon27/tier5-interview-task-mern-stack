import { IUser } from '../../../utils/models/User'
import { BsTrash } from 'react-icons/bs'
import AxiosHelper from '../../../utils/AxiosHelper'
import IResponse from '../../../utils/models/Response'
import { IHomeData } from './Home'
import { toast } from 'react-toastify'

interface UserListProps {
    userList: IUser[]
    setData: React.Dispatch<React.SetStateAction<IResponse<IHomeData>>>
}

export default function UserList({ setData, userList = [] }: UserListProps) {

    const deleteUser = async (id: string) => {
        const isDel = confirm("Are you sure?")
        if (isDel)
            await AxiosHelper.deleteData(`users/delete/${id}`, () => {
                // update ui
                setData(old => {
                    return {
                        ...old,
                        response: {
                            ...old.response!!,
                            top15Users: userList.filter(item => item.id !== id)
                        }
                    }
                })
                toast("deleted user")
            })
    }

    if (userList.length == 0) {
        return <p className='text-center'> No User Found!</p>
    }
    return (
        <div>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(userList[0]).map((item, idx) => {
                                if (item !== "createdAt" && item !== "id")
                                    return <th key={idx} className="py-3 px-6">
                                        {item}
                                    </th>
                                else
                                    return null;
                            })}
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((_item, idx) => {
                            return <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {Object.keys(_item).map((key, _idx) => {
                                    if (key == "lastActive") {
                                        return <td key={_idx} className={"py-4 px-6"}>
                                            {(_item[key as keyof IUser]).toString().slice(0, 10)}
                                        </td>
                                    }
                                    else if (key !== "createdAt" && key !== "id") {
                                        return <td key={_idx} className={"py-4 px-6"}>
                                            {(_item[key as keyof IUser]).toString()}
                                        </td>
                                    } else {
                                        return null;
                                    }
                                })}
                                <td><BsTrash className='cursor-pointer text-primary' onClick={() => {
                                    deleteUser(_item.id)
                                }} /></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
